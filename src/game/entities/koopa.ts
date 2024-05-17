import Entity from "./entity";
import Sprite from "./sprite";

// Тип для состояний Купы
type KoopaStates = {
  walking: {
    // Ходьба
    movement: (data: { animationFrame: number }) => void; 
    animation: (data: { animationFrame: number }) => void; 
  };
  hiding: {
    // Прячется
    movement: (data: { animationFrame: number }) => void; 
    animation: (data: { animationFrame: number }) => void; 
  };
  sliding: {
    // Скольжение
    movement: (data: { animationFrame: number }) => void; 
    animation: (data: { animationFrame: number }) => void; 
  };
}

// Класс Купы
export default class Koopa extends Entity {
  spriteAnimations: {
    // Анимации спрайтов
    walkRight: { frames: Sprite[]; currentFrame: number }; // Ходьба вправо: массив кадров и текущий кадр
    walkLeft: { frames: Sprite[]; currentFrame: number }; // Ходьба влево: массив кадров и текущий кадр
    hiding: Sprite; 
  };
  squishSound: HTMLAudioElement; 
  states: KoopaStates; // Состояния Купы
  currentState: KoopaStates[keyof KoopaStates]; // Текущее состояние
  direction: string; // Направление
  velY: number; // Скорость по Y
  velX: number; // Скорость по X

  constructor(
    img: HTMLImageElement, // Изображение
    xPos: number, // Позиция по X
    yPos: number, // Позиция по Y
    width: number, // Ширина
    height: number // Высота
  ) {
    const sprite = new Sprite(img, 253, 29, 16, 24); // Создание спрайта
    super({ type: "koopa", sprite: sprite, xPos, yPos, width, height }); // Вызов конструктора класса-родителя

    this.squishSound = new Audio("./assets/audio/fx/stomp.wav"); // Звук при убийстве

    this.spriteAnimations = {
      // Инициализация анимаций спрайтов
      walkRight: {
        // Ходьба вправо
        frames: [
          // Массив кадров
          new Sprite(img, 253, 29, 16, 24), 
          new Sprite(img, 237, 29, 16, 24), 
        ],
        currentFrame: 0, // Текущий кадр
      },

      walkLeft: {
        // Ходьба влево
        frames: [
          // Массив кадров
          new Sprite(img, 173, 5, 16, 24), 
          new Sprite(img, 189, 5, 16, 24), 
        ],
        currentFrame: 0, // Текущий кадр
      },
      hiding: new Sprite(img, 237.5, 14, 16, 15), 
    };

    this.states = {
      // Инициализация состояний Купы
      walking: {
        // Ходьба
        movement: () => {
          // Функция движения
          if (this.direction === "right") {
            // Если двигаемся вправо
            this.xPos += this.velX; // Двигаемся вправо
          } else {
            // Иначе
            this.xPos -= this.velX; // Двигаемся влево
          }
        },

        animation: (data) => {
          // Функция анимации
          if (this.direction === "right") {
            // Если движемся вправо
            if (data.animationFrame % 10 === 0) {
              // Каждый 10 кадр
              this.sprite = // Установка спрайта
                this.spriteAnimations.walkRight.frames[ // Выбор текущего кадра из анимации ходьбы вправо
                  this.spriteAnimations.walkRight.currentFrame
                ];

              this.spriteAnimations.walkRight.currentFrame += 1; // Переход к следующему кадру

              if (this.spriteAnimations.walkRight.currentFrame > 1) {
                // Если достигнут последний кадр
                this.spriteAnimations.walkRight.currentFrame = 0; // Возвращаемся к первому кадру
              }
            }
          } else {
            // Иначе (движение влево)
            if (data.animationFrame % 10 === 0) {
              // Каждый 10 кадр
              this.sprite = // Установка спрайта
                this.spriteAnimations.walkLeft.frames[ // Выбор текущего кадра из анимации ходьбы влево
                  this.spriteAnimations.walkLeft.currentFrame
                ];
              this.spriteAnimations.walkLeft.currentFrame += 1; // Переход к следующему кадру

              if (this.spriteAnimations.walkLeft.currentFrame > 1) {
                // Если достигнут последний кадр
                this.spriteAnimations.walkLeft.currentFrame = 0; // Возвращаемся к первому кадру
              }
            }
          }
        },
      },

      hiding: {
        // Скрытие
        movement: () => {
          // Функция движения
          this.width = 16; // Установка ширины
          this.height = 17; // Установка высоты
          this.velX = 0; // Остановка движения по X
        },
        animation: () => {
          // Функция анимации
          this.sprite = this.spriteAnimations.hiding; 
        },
      },

      sliding: {
        // Скольжение
        movement: () => {
          // Функция движения
          this.velX = 3; // Установка скорости по X
          if (this.direction === "right") {
            // Если двигаемся вправо
            this.xPos += this.velX; // Двигаемся вправо
          } else {
            // Иначе
            this.xPos -= this.velX; // Двигаемся влево
          }
        },

        animation: () => {
          // Функция анимации
          this.sprite = this.spriteAnimations.hiding; 
        },
      },
    };

    this.currentState = this.states.walking; // Установка начального состояния (ходьба)
    this.direction = "right"; // Изначальное направление - вправо
    this.velY = 0; // Изначальная скорость по Y
    this.velX = 0.5; // Изначальная скорость по X
    this.xPos = xPos; // Установка позиции по X
    this.yPos = yPos; // Установка позиции по Y
    this.width = width; // Установка ширины
    this.height = height; // Установка высоты
  }
}
