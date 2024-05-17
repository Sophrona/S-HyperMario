import Goomba from "../entities/goomba";
import Koopa from "../entities/koopa";
import Mario from "../entities/mario";
import Mushroom from "../entities/mushroom";
import { Data, Entity, EntityArray, Scenery, SceneryArray } from "./types";

// Класс для физики игры
class Physics {
  // Игра окончена, изначально false
  gameOver = false;

  // Обновление состояния игры на основе данных
  update(data: Data) {
    // Обнаружение столкновений сущностей
    this.collisionDetection(data); // Обнаружение столкновений с персонажем
    this.sceneryCollisionDetection(data); // Обнаружение столкновений с окружающим миром
    this.marioFallingCheck(data); // Проверка падения Марио

    // Применение гравитации ко всем сущностям
    this.gravity(data.entities.mario); // Применение гравитации к Марио

    data.entities.mushrooms.forEach((mushroom: Mushroom) => {
      this.gravity(mushroom); // Применение гравитации к грибам
    });

    data.entities.goombas.forEach((goomba: Goomba) => {
      this.gravity(goomba); // Применение гравитации к гумбам
    });

    data.entities.koopas.forEach((koopa: Koopa) => {
      this.gravity(koopa); // Применение гравитации к купам
    });
  }

  // Обнаружение столкновений
  collisionDetection(data: Data) {
    // Список объектов, с которыми возможны столкновения
    const collidables = [
      data.entities.coins, // Монеты
      data.entities.mushrooms, // Грибки
      data.entities.goombas, // Гумбы
      data.entities.koopas, // Купы
    ];

    // Проверка столкновений с персонажем
    const entityCollisionCheck = (entity: Entity) => {
      if (
        // Проверка столкновения по горизонтали
        data.entities.mario.xPos < entity.xPos + entity.width &&
        data.entities.mario.xPos + data.entities.mario.width > entity.xPos &&
        // Проверка столкновения по вертикали
        data.entities.mario.yPos < entity.yPos + entity.height &&
        data.entities.mario.height + data.entities.mario.yPos > entity.yPos
      ) {
        // Столкновение произошло
        this.handleCollision(data, entity);
      }
    };

    // Проверка столкновений для всех объектов
    collidables.forEach((entities) =>
      entities.forEach((entity: Entity) => {
        entityCollisionCheck(entity);
      })
    );
  }

  // Обработка столкновения
  handleCollision(data: Data, entity: any) {
    // Проверка, завершена ли игра
    if (this.gameOver) return;

    const mario = data.entities.mario;

    // Если столкнулись с гумбой или купой и Марио не является неуязвимым
    if (
      (entity.type === "goomba" || entity.type === "koopa") &&
      mario.type !== "invincible"
    ) {
      // Если Марио справа от сущности
      if (mario.xPos < entity.xPos && mario.velY <= entity.velY) {
        mario.xPos = entity.xPos - mario.width;
        // Если купа спрятан, Марио скользит по ней, иначе Марио умирает
        if (
          entity.type === "koopa" &&
          entity.currentState === entity.states.hiding
        ) {
          entity.direction = "right";
          entity.xPos += 5;

          setTimeout(() => {
            entity.currentState = entity.states.sliding;
          }, 50);
        } else {
          // Если Марио большой, он уменьшается, иначе игра заканчивается
          if (mario.bigMario) {
            this.marioShrink(mario);
          } else {
            this.gameOver = true;
            mario.currentState = mario.states.dead;
            this.marioDeath(data);
          }
        }
      }
      // Если Марио слева от сущности
      if (mario.xPos > entity.xPos && mario.velY <= entity.velY) {
        mario.xPos = entity.xPos + mario.width;
        // Если купа спрятан, Марио скользит по ней, иначе Марио умирает
        if (
          entity.type === "koopa" &&
          entity.currentState === entity.states.hiding
        ) {
          entity.direction = "left";
          entity.xPos -= 5;

          setTimeout(() => {
            entity.currentState = entity.states.sliding;
          }, 50);
        } else {
          // Если Марио большой, он уменьшается, иначе игра заканчивается
          if (mario.bigMario) {
            this.marioShrink(mario);
          } else {
            this.gameOver = true;
            mario.currentState = mario.states.dead;
            this.marioDeath(data);
          }
        }
      }
      // Если Марио снизу
      if (
        mario.yPos < entity.yPos &&
        mario.xPos + mario.width > entity.xPos &&
        mario.xPos < entity.xPos + entity.width &&
        mario.velY >= entity.velY
      ) {
        mario.currentState = mario.states.standing;
        mario.yPos = entity.yPos - mario.height;
        mario.velY = 0;
        // Убийство гумбы или действия с купой в зависимости от состояния
        if (entity.type === "goomba") {
          this.goombaDeath(entity, data);
        } else if (entity.type === "koopa") {
          if (entity.currentState === entity.states.hiding) {
            this.koopaSlide(entity);
          } else if (entity.currentState === entity.states.sliding) {
            this.koopaDeath(entity, data);
          } else {
            this.koopaHide(entity);
          }
        }
        // Если Марио перепрыгнул сущность
        if (
          mario.yPos > entity.yPos &&
          mario.xPos + mario.width >= entity.xPos &&
          mario.xPos < entity.xPos + entity.width
        ) {
          mario.velY = 1.2;
          mario.xPos = entity.xPos;
          // Если Марио большой, он уменьшается, иначе игра заканчивается
          if (mario.bigMario) {
            this.marioShrink(mario);
          } else {
            this.gameOver = true;
            mario.currentState = mario.states.dead;
            this.marioDeath(data);
          }
        }
      }
    }

    // Если столкнулись с грибом, Марио становится большим
    if (entity.type === "mushroom") {
      mario.bigMario = true;
      mario.height = 32;
      mario.powerupSound.play();
      // Удаление гриба из массива
      const index = data.entities.mushrooms.indexOf(entity);
      delete data.entities.mushrooms[index];
    }

    // Если столкнулись с монетой, увеличивается счётчик монет и счёт
    if (entity.type === "coin") {
      data.entities.score.value += 50;
      data.entities.score.coinCount += 1;
      entity.coinSound.play();
      // Удаление монеты из массива
      const index = data.entities.coins.indexOf(entity);
      delete data.entities.coins[index];
    }
  }

  // Проверка падения Марио
  marioFallingCheck(data: Data) {
    // Если игра завершена, выход из функции
    if (this.gameOver) return;

    // Если Марио достиг нижней границы экрана
    if (data.entities.mario.yPos >= 210) {
      // Воспроизведение звука смерти Марио
      data.entities.mario.deathSound.play();
      // Отключение управления Марио
      data.userControl = false;
      // Установка флага завершения игры
      this.gameOver = true;

      // После задержки сброс игры
      setTimeout(() => {
        data.reset();
      }, 3000);
    }
  }

  // Обработка смерти Марио
  marioDeath(data: Data) {

    // Отключение управления Марио
    data.userControl = false;

    // Пауза фоновой музыки, если она проигрывается
    if (data.sounds.backgroundMusic) {
      data.sounds.backgroundMusic.pause();
    }

    // Воспроизведение звука смерти Марио
    data.entities.mario.deathSound.play();

    // После небольшой задержки
    setTimeout(() => {
      // Установка размера Марио и его состояния
      data.entities.mario.height = 16;
      data.entities.mario.type = "dead";
      // Придание Марио вертикальной скорости для эффекта отскока
      data.entities.mario.velY -= 13;
    }, 500);

    // После длительной задержки сброс игры
    setTimeout(() => {
      data.reset();
    }, 3000);
  }

  // Уменьшение Марио
  marioShrink(mario: Mario) {
    // Установка флага большого Марио в false
    mario.bigMario = false;
    // Воспроизведение звука уменьшения
    mario.powerdownSound.play();
    // Установка состояния Марио как неуязвимого и анимации уменьшения
    mario.type = "invincible";
    mario.currentState = mario.states.resizing;

    // После небольшой задержки возврат Марио к обычному состоянию
    setTimeout(() => {
      mario.currentState = mario.states.standing;
      mario.height = 16;
    }, 1000);

    // После дополнительной задержки возврат типа Марио к обычному
    setTimeout(() => {
      mario.type = "mario";
    }, 1500);
  }

  // Прячется купа
  koopaHide(entity: Koopa) {
    // Купа неуязвим и прячется
    entity.type = "invulnerable";
    entity.currentState = entity.states.hiding;

    // После небольшой задержки возврат состояния купы к обычному
    setTimeout(() => {
      entity.type = "koopa";
    }, 200);
  }

  // Скольжение купы
  koopaSlide(entity: Koopa) {
    // Купа неуязвим и скользит
    entity.type = "invulnerable";
    entity.currentState = entity.states.sliding;

    // После небольшой задержки возврат типа купы к обычному
    setTimeout(() => {
      entity.type = "koopa";
    }, 200);
  }

  // Смерть гумбы
  goombaDeath(entity: Goomba, data: Data) {
    // Увеличение счёта при убийстве гумбы
    data.entities.score.value += 100;

    entity.currentState = entity.states.dead;
    entity.type = "dying";
    // Воспроизведение звука при убийстве гумбы
    entity.squishSound.play();

    // После задержки удаление гумбы из массива
    setTimeout(() => {
      const index = data.entities.goombas.indexOf(entity);
      delete data.entities.goombas[index];
    }, 800);
  }

  // Смерть купы
  koopaDeath(entity: Koopa, data: Data) {
    // Увеличение счёта при убийстве купы
    data.entities.score.value += 100;
    // Уменьшение вертикальной скорости для анимации падения купы
    entity.velY -= 10;

    // После задержки удаление купы из массива
    setTimeout(() => {
      const index = data.entities.koopas.indexOf(entity);
      delete data.entities.koopas[index];
    }, 400);
  }

  // Завершение уровня
  levelFinish(data: Data) {
    // Остановка движения Марио
    data.entities.mario.velX = 0;
    data.entities.mario.velY = 0;
    // Смещение Марио вправо для завершения уровня
    data.entities.mario.xPos += 3;

    // Пауза фоновой музыки, если она проигрывается
    if (data.sounds.backgroundMusic) {
      data.sounds.backgroundMusic.pause();
    }

    // Воспроизведение звука завершения уровня
    data.sounds.levelFinish.play();

    // После длительной задержки сброс игры
    setTimeout(() => {
      data.reset();
    }, 6000);
  }

  // Обнаружение столкновений с местностью
  sceneryCollisionDetection(data: Data) {
    // Проверка столкновений Марио с различными объектами местности
    this.sceneryCollisionCheck(
      data,
      [data.entities.mario],
      data.entities.scenery
    );
    this.sceneryCollisionCheck(
      data,
      data.entities.mushrooms,
      data.entities.scenery
    );
    // Проверка столкновений гумб с объектами сцены
    this.sceneryCollisionCheck(
      data,
      data.entities.goombas,
      data.entities.scenery
    );
    // Проверка столкновений куп с объектами сцены
    this.sceneryCollisionCheck(
      data,
      data.entities.koopas,
      data.entities.scenery
    );
  }

  // Проверка столкновений с местностью
  sceneryCollisionCheck(
    data: Data,
    entities: EntityArray,
    scenery: SceneryArray
  ) {
    // Перебор всех объектов сцены
    entities.forEach((entity: Entity) => {
      scenery.forEach((scene: Scenery) => {
        // Проверка столкновений Марио с объектами сцены
        if (
          entity.xPos < scene.xPos + scene.width &&
          entity.xPos + entity.width > scene.xPos &&
          entity.yPos < scene.yPos + scene.height &&
          entity.height + entity.yPos > scene.yPos
        ) {
          // Столкновение произошло
          if (scene.type === "flag") {
            // Если столкнулись с флагом, завершение уровня
            this.levelFinish(data);
          } else if (
            // Если столкнулись не с кустом, облаком или горой
            scene.type !== "shrub" &&
            scene.type !== "cloud" &&
            scene.type !== "mountain"
          ) {
            this.sceneryCollision(data, entity, scene);
          }
        }
      });
    });
  }

  sceneryCollision(data: Data, entity: any, scene: any) {
    // Левая сторона
    if (entity.xPos < scene.xPos && entity.yPos >= scene.yPos) {
      // Обработка столкновений с трубами и кирпичами
      if (scene.type === "pipe" || scene.type === "brick") {
        entity.xPos = scene.xPos - entity.width - 1;
      } else {
        entity.xPos = scene.xPos - entity.width;
      }
      // Изменение направления движения для гумбы, купы и гриба
      if (
        entity.type === "goomba" ||
        entity.type === "koopa" ||
        entity.type === "mushroom"
      ) {
        entity.direction = entity.direction === "left" ? "right" : "left";
      }
    }
    // Правая сторона
    if (entity.xPos > scene.xPos && entity.yPos >= scene.yPos) {
      entity.xPos = scene.xPos + scene.width;
      // Изменение направления движения для гумбы, купы и гриба
      if (
        entity.type === "goomba" ||
        entity.type === "koopa" ||
        entity.type === "mushroom"
      ) {
        entity.direction = entity.direction === "left" ? "right" : "left";
      }
    }
    // Верхняя сторона
    if (
      entity.yPos < scene.yPos &&
      entity.xPos + entity.width > scene.xPos &&
      entity.xPos < scene.xPos + scene.width &&
      entity.velY >= 0
    ) {
      // Обработка падения Марио сквозь землю в случае смерти
      if (entity.type !== "dead") {
        if (entity.type === "mario") {
          if (entity.bigMario) {
            entity.currentState = entity.states.bigStanding;
          } else {
            entity.currentState = entity.states.standing;
          }
        }
        entity.yPos = scene.yPos - entity.height - 1;
        entity.velY = 0;
      }
    }
    // Нижняя сторона
    if (
      entity.yPos >= scene.yPos &&
      entity.xPos + entity.width >= scene.xPos &&
      entity.xPos < scene.xPos + scene.width &&
      entity.velY < 0
    ) {
      // Обработка столкновения с блоками и разрушаемыми объектами
      if (scene.type === "block") {
        // Обработка сбора монеты или появления гриба при столкновении
        if (scene.contents === "coin") {
          scene.collectCoin(data);
        } else if (scene.contents === "mushroom") {
          scene.createMushroom(data);
        }
        scene.sprite = scene.used;
      } else if (scene.type === "breakable") {
        // Обработка разрушения объекта при столкновении
        if (entity.bigMario) {
          data.sounds.breakSound.play();
          scene.type = "shrub";
          const index = data.mapBuilder.breakableEntities.indexOf(scene);
          delete data.mapBuilder.breakableEntities[index];
        } else {
          entity.bumpSound.play();
        }
      }
      // Установка позиции и скорости после столкновения
      entity.yPos = entity.yPos + entity.height;
      entity.xPos = scene.xPos;
      entity.velY = 1.2;
    }
  }

  // Гравитация
  gravity(entity: any) {
    // Увеличение вертикальной скорости
    entity.velY += 1.2;
    // Применение вертикальной скорости к позиции
    entity.yPos += entity.velY;
  }
}

export default new Physics();
