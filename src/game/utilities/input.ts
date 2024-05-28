import { Data } from "./types";

class Input {
  down: { [key: string]: boolean }; // Состояние нажатия клавиш
  pressed: { [key: string]: boolean }; // Состояние нажатия клавиш (однократное)

  constructor() {
    this.down = {}; // Инициализация состояния нажатия клавиш
    this.pressed = {}; // Инициализация состояния однократного нажатия клавиш
    this.init(); // Инициализация системы ввода
  }

  // Инициализация системы ввода
  init() {
    // Обработчики событий клавиатуры для отслеживания нажатия клавиш
    window.addEventListener("keydown", (event) => {
      this.down[event.key] = true; // Установка состояния нажатия клавиши
    });

    window.addEventListener("keyup", (event) => {
      // При отпускании клавиши удаляем ее из объектов удерживаемых и нажатых клавиш
      delete this.down[event.key];
      delete this.pressed[event.key];
    });
  }

  // Обновление системы ввода
  update(data: Data) {
    const mario = data.entities.mario; // Получаем объект Mario из данных

    // Если пользователь может управлять персонажем
    if (data.userControl) {
      // Движение влево. Стрелка влево или клавиша A
      if (this.isDown("ArrowLeft") || this.isDown("a")) {
        // Если Mario прыгает, устанавливаем анимацию ходьбы
        if (mario.velY === 1.2) {
          mario.currentState = mario.bigMario
            ? mario.states.bigWalking
            : mario.states.walking;
        } else {
          mario.xPos -= mario.velX; // Двигаем Mario влево
        }
        mario.direction = "left"; // Устанавливаем направление влево
      }
      // Движение вправо. Стрелка вправо или клавиша D
      if (this.isDown("ArrowRight") || this.isDown("d")) {
        // Если Mario прыгает, устанавливаем анимацию ходьбы
        if (mario.velY === 1.2) {
          mario.currentState = mario.bigMario
            ? mario.states.bigWalking
            : mario.states.walking;
        } else {
          mario.xPos += mario.velX; // Двигаем Mario вправо
        }
        mario.direction = "right"; // Устанавливаем направление вправо
      }

      // Прыжок. Стрелка вверх, W или пробел
      if (
        this.isPressed("ArrowUp") ||
        this.isPressed(" ") ||
        this.isPressed("w")
      ) {
        // Если Mario большой, устанавливаем анимацию большого прыжка
        mario.currentState = mario.bigMario
          ? mario.states.bigJumping
          : mario.states.jumping;
      }
    } else {
      mario.currentState = mario.states.dead; // Устанавливаем состояние "мертв"
    }
  }

  // Проверка, зажата ли клавиша
  isDown(key: string) {
    return this.down[key];
  }

  // Проверка, была ли клавиша нажата
  isPressed(key: string) {
    if (this.pressed[key]) {
      return false;
    } else if (this.down[key]) {
      this.pressed[key] = true;
      return this.pressed[key];
    }
  }
}

export default Input;
