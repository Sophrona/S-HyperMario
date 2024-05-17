import Entity from "./entity";
import Sprite from "./sprite";

// Тип состояний Марио
type MarioStates = {
  jumping: {
    movement: (data: { animationFrame: number }) => void;
    animation: (data: { animationFrame: number }) => void;
  };
  bigJumping: {
    movement: (data: { animationFrame: number }) => void;
    animation: (data: { animationFrame: number }) => void;
  };
  standing: {
    movement: (data: { animationFrame: number }) => void;
    animation: (data: { animationFrame: number }) => void;
  };
  bigStanding: {
    movement: (data: { animationFrame: number }) => void;
    animation: (data: { animationFrame: number }) => void;
  };
  walking: {
    movement: (data: { animationFrame: number }) => void;
    animation: (data: { animationFrame: number }) => void;
  };
  bigWalking: {
    movement: (data: { animationFrame: number }) => void;
    animation: (data: { animationFrame: number }) => void;
  };
  resizing: {
    movement: (data: { animationFrame: number }) => void;
    animation: (data: { animationFrame: number }) => void;
  };
  dead: {
    movement: (data: { animationFrame: number }) => void;
    animation: (data: { animationFrame: number }) => void;
  };
};

// Класс Марио
export default class Mario extends Entity {
  spriteAnimations: {
    walkRight: { frames: Sprite[]; currentFrame: number }; // Анимация ходьбы вправо
    walkLeft: { frames: Sprite[]; currentFrame: number }; // Анимация ходьбы влево
    bigWalkRight: { frames: Sprite[]; currentFrame: number }; // Анимация большой ходьбы вправо
    bigWalkLeft: { frames: Sprite[]; currentFrame: number }; // Анимация большой ходьбы влево
    resizeRight: { frames: Sprite[]; currentFrame: number }; // Анимация изменения размера вправо
    resizeLeft: { frames: Sprite[]; currentFrame: number }; // Анимация изменения размера влево
    standRight: Sprite; // Анимация стояния вправо
    standLeft: Sprite; // Анимация стояния влево
    jumpRight: Sprite; // Анимация прыжка вправо
    jumpLeft: Sprite; // Анимация прыжка влево
    bigStandRight: Sprite; // Анимация большого стояния вправо
    bigStandLeft: Sprite; // Анимация большого стояния влево
    bigJumpRight: Sprite; // Анимация большого прыжка вправо
    bigJumpLeft: Sprite; // Анимация большого прыжка влево
    dead: Sprite; // Анимация смерти
  };
  jumpSound: HTMLAudioElement; // Звук прыжка
  deathSound: HTMLAudioElement; // Звук смерти
  bumpSound: HTMLAudioElement; // Звук удара
  powerupSound: HTMLAudioElement; // Звук увеличения силы
  powerdownSound: HTMLAudioElement; // Звук уменьшения силы
  states: MarioStates; // Состояния Марио
  currentState: MarioStates[keyof MarioStates]; // Текущее состояние Марио
  direction: "left" | "right"; // Направление Марио (влево или вправо)
  bigMario: boolean; // Если Марио большой
  velY: number; // Вертикальная скорость Марио
  velX: number; // Горизонтальная скорость Марио

  // Конструктор класса Марио
  constructor(
    img: HTMLImageElement, // Изображение Марио
    xPos: number, // Положение Марио по горизонтали
    yPos: number, // Положение Марио по вертикали
    width: number, // Ширина Марио
    height: number // Высота Марио
  ) {
    const sprite = new Sprite(img, 651, 5, 16, 16); // Создание спрайта Марио
    super({ type: "mario", sprite: sprite, xPos, yPos, width, height }); // Вызов конструктора класса-родителя

    // Звуковые эффекты
    this.jumpSound = new Audio("./assets/audio/fx/jump.wav");
    this.deathSound = new Audio("./assets/audio/fx/mario_death.wav");
    this.bumpSound = new Audio("./assets/audio/fx/bump.wav");
    this.powerupSound = new Audio("./assets/audio/fx/powerup.wav");
    this.powerdownSound = new Audio("./assets/audio/fx/powerdown.wav");

    this.spriteAnimations = {
      walkRight: {
        frames: [
          new Sprite(img, 667, 5, 16, 16),
          new Sprite(img, 683, 5, 16, 16),
          new Sprite(img, 699, 5, 16, 16),
        ],
        currentFrame: 0,
      },
      walkLeft: {
        frames: [
          new Sprite(img, 844, 21, 16, 16),
          new Sprite(img, 828, 21, 16, 16),
          new Sprite(img, 812, 21, 16, 16),
        ],
        currentFrame: 0,
      },
      bigWalkRight: {
        frames: [
          new Sprite(img, 295, 5, 16, 32),
          new Sprite(img, 311, 5, 16, 32),
          new Sprite(img, 327, 5, 16, 32),
        ],
        currentFrame: 0,
      },
      bigWalkLeft: {
        frames: [
          new Sprite(img, 583, 37, 16, 32),
          new Sprite(img, 567, 37, 16, 32),
          new Sprite(img, 551, 37, 16, 32),
        ],
        currentFrame: 0,
      },
      resizeRight: {
        frames: [
          new Sprite(img, 519, 5, 16, 32),
          new Sprite(img, 279, 5, 16, 32),
          new Sprite(img, 519, 5, 16, 32),
          new Sprite(img, 279, 5, 16, 32),
        ],
        currentFrame: 0,
      },
      resizeLeft: {
        frames: [
          new Sprite(img, 519, 5, 16, 32),
          new Sprite(img, 279, 5, 16, 32),
          new Sprite(img, 519, 5, 16, 32),
          new Sprite(img, 279, 5, 16, 32),
        ],
        currentFrame: 0,
      },
      standRight: new Sprite(img, 651, 5, 16, 16),
      standLeft: new Sprite(img, 860, 21, 16, 16),
      jumpRight: new Sprite(img, 731, 5, 16, 16),
      jumpLeft: new Sprite(img, 778, 22, 16, 16),

      bigStandRight: new Sprite(img, 278.7, 5, 16, 32),
      bigStandLeft: new Sprite(img, 599.5, 37, 16, 32),
      bigJumpRight: new Sprite(img, 359, 5, 16, 32),
      bigJumpLeft: new Sprite(img, 519, 37, 16, 32),
      dead: new Sprite(img, 748, 5, 16, 16),
    };

    this.states = {
      jumping: {
        // Действие при прыжке: воспроизведение звука прыжка и изменение вертикальной скорости
        movement: () => {
          if (this.velY === 1.2) {
            const jumpSound = this.jumpSound.cloneNode() as HTMLAudioElement; // Клонирование звука прыжка
            jumpSound.play(); // Воспроизведение звука
            this.velY -= 14; // Изменение вертикальной скорости для прыжка
          }
        },
        // Анимация при прыжке: установка соответствующего спрайта в зависимости от направления
        animation: () => {
          if (this.direction === "right") {
            this.sprite = this.spriteAnimations.jumpRight; 
          } else {
            this.sprite = this.spriteAnimations.jumpLeft;
          }
        },
      },

      bigJumping: {
        // Действие при большом прыжке: воспроизведение звука прыжка и изменение вертикальной скорости
        movement: () => {
          if (this.velY === 1.2) {
            (this.jumpSound.cloneNode() as HTMLAudioElement).play();
            this.velY -= 14;
          }
        },

        animation: () => {
          if (this.direction === "right") {
            this.sprite = this.spriteAnimations.bigJumpRight;
          } else {
            this.sprite = this.spriteAnimations.bigJumpLeft;
          }
        },
      },

      standing: {
        // Марио просто стоит
        movement: () => {
          return;
        },
        animation: () => {
          if (this.direction === "right") {
            this.sprite = this.spriteAnimations.standRight; 
          } else {
            this.sprite = this.spriteAnimations.standLeft; 
          }
        },
      },

      bigStanding: {
        // Действие при большом стоянии: ничего не делать
        movement: () => {
          return;
        },
        // Анимация при большом стоянии: установка соответствующего спрайта в зависимости от направления
        animation: () => {
          if (this.direction === "right") {
            this.sprite = this.spriteAnimations.bigStandRight;
          } else {
            this.sprite = this.spriteAnimations.bigStandLeft; 
          }
        },
      },

      walking: {
        // Действие при ходьбе: изменение горизонтальной позиции в зависимости от направления
        movement: () => {
          if (this.direction === "right") {
            this.xPos += this.velX; 
          } else {
            this.xPos -= this.velX; 
          }
        },

        // Анимация при ходьбе: изменение текущего кадра спрайта
        animation: (data) => {
          if (this.direction === "right") {
            if (data.animationFrame % 5 === 0) {
              // Каждый пятый кадр анимации
              this.sprite =
                this.spriteAnimations.walkRight.frames[
                  this.spriteAnimations.walkRight.currentFrame
                ]; // Установка текущего кадра спрайта при движении вправо
              this.spriteAnimations.walkRight.currentFrame =
                (this.spriteAnimations.walkRight.currentFrame + 1) % 3; // Переключение на следующий кадр анимации, с учетом цикличности
            }
          } else {
            if (data.animationFrame % 5 === 0) {
              // Каждый пятый кадр анимации
              this.sprite =
                this.spriteAnimations.walkLeft.frames[
                  this.spriteAnimations.walkLeft.currentFrame
                ]; // Установка текущего кадра спрайта при движении влево
              this.spriteAnimations.walkLeft.currentFrame =
                (this.spriteAnimations.walkLeft.currentFrame + 1) % 3; // Переключение на следующий кадр анимации, с учетом цикличности
            }
          }
        },
      },

      bigWalking: {
        // Действие при ходьбе, когда Марио большой: изменение горизонтальной позиции в зависимости от направления
        movement: () => {
          if (this.direction === "right") {
            this.xPos += this.velX; 
          } else {
            this.xPos -= this.velX; 
          }
        },

        animation: (data) => {
          if (this.direction === "right") {
            if (data.animationFrame % 5 === 0) {
              // Каждый пятый кадр анимации
              this.sprite =
                this.spriteAnimations.bigWalkRight.frames[
                  this.spriteAnimations.bigWalkRight.currentFrame
                ]; // Установка текущего кадра спрайта при движении вправо
              this.spriteAnimations.bigWalkRight.currentFrame =
                (this.spriteAnimations.bigWalkRight.currentFrame + 1) % 3; // Переключение на следующий кадр анимации, с учетом цикличности
            }
          } else {
            if (data.animationFrame % 5 === 0) {
              // Каждый пятый кадр анимации
              this.sprite =
                this.spriteAnimations.bigWalkLeft.frames[
                  this.spriteAnimations.bigWalkLeft.currentFrame
                ]; // Установка текущего кадра спрайта при движении влево
              this.spriteAnimations.bigWalkLeft.currentFrame =
                (this.spriteAnimations.bigWalkLeft.currentFrame + 1) % 3; // Переключение на следующий кадр анимации, с учетом цикличности
            }
          }
        },
      },

      resizing: {
        // Действие при изменении размера: ничего не делать
        movement: () => {
          return;
        },
        // Анимация при изменении размера: изменение текущего кадра спрайта
        animation: (data) => {
          if (this.direction === "right") {
            if (data.animationFrame % 5 === 0) {
              // Каждый пятый кадр анимации
              this.sprite =
                this.spriteAnimations.resizeRight.frames[
                  this.spriteAnimations.resizeRight.currentFrame
                ]; // Установка текущего кадра спрайта при изменении размера вправо
              this.spriteAnimations.resizeRight.currentFrame =
                (this.spriteAnimations.resizeRight.currentFrame + 1) % 4; // Переключение на следующий кадр анимации, с учетом цикличности
            }
          } else {
            if (data.animationFrame % 5 === 0) {
              // Каждый пятый кадр анимации
              this.sprite =
                this.spriteAnimations.resizeLeft.frames[
                  this.spriteAnimations.resizeLeft.currentFrame
                ]; // Установка текущего кадра спрайта при изменении размера влево
              this.spriteAnimations.resizeLeft.currentFrame =
                (this.spriteAnimations.resizeLeft.currentFrame + 1) % 4; // Переключение на следующий кадр анимации, с учетом цикличности
            }
          }
        },
      },
      dead: {
        // Действие при смерти: остановка горизонтальной скорости
        movement: () => {
          this.velX = 0; // Остановка горизонтальной скорости при смерти
        },
        // Анимация при смерти: установка спрайта смерти
        animation: () => {
          this.sprite = this.spriteAnimations.dead; // Установка спрайта смерти
        },
      },
    };

    // Установка начального состояния
    this.currentState = this.states.standing;
    this.direction = "right"; // Установка начального направления вправо
    this.bigMario = false; // Установка начального размера Марио (без увеличения)
    this.velY = 0; // Установка начальной вертикальной скорости
    this.velX = 3; // Установка начальной горизонтальной скорости
    this.xPos = xPos; // Установка начальной горизонтальной позиции
    this.yPos = yPos; // Установка начальной вертикальной позиции
    this.width = width; // Установка ширины
    this.height = height; // Установка высоты
  }
}
