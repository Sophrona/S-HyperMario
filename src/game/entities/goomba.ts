import Entity from "./entity";
import Sprite from "./sprite";

// Тип для состояний Гумбы
type GoombaStates = {
  walking: {
    // Ходьба
    movement: (data: { animationFrame: number }) => void; // Функция движения
    animation: (data: { animationFrame: number }) => void; // Функция анимации
  };
  dead: {
    // Мертвый
    movement: (data: { animationFrame: number }) => void; 
    animation: (data: { animationFrame: number }) => void; 
  };
}

// Класс Гумбы
export default class Goomba extends Entity {
  spriteAnimations: {
    // Анимации спрайтов
    walking: { frames: Sprite[]; currentFrame: number }; // Ходьба: массив кадров и текущий кадр
    dead: Sprite; 
  };
  squishSound: HTMLAudioElement; 
  states: GoombaStates; // Состояния Гумбы
  currentState: GoombaStates[keyof GoombaStates]; // Текущее состояние
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
    const sprite = new Sprite(img, 115, 5, 16, 16); // Создание спрайта
    super({ type: "goomba", sprite: sprite, xPos, yPos, width, height }); // Вызов конструктора класса-родителя

    this.squishSound = new Audio("./assets/audio/fx/stomp.wav"); 

    this.spriteAnimations = {
      // Инициализация анимаций спрайтов
      walking: {
        // Ходьба
        frames: [
          // Массив кадров
          new Sprite(img, 115, 5, 16, 16), 
          new Sprite(img, 131, 5, 16, 16), 
        ],
        currentFrame: 0, // Текущий кадр
      },
      dead: new Sprite(img, 147.5, 5, 16, 16), 
    };

    this.states = {
      // Инициализация состояний Гумбы
      walking: {
        // Ходьба
        movement: () => {
          // Функция движения
          if (this.direction === "left") {
            // Если двигаемся влево
            this.xPos -= this.velX; // Двигаемся влево
          } else {
            // Иначе
            this.xPos += this.velX; // Двигаемся вправо
          }
        },
        animation: (data) => {
          // Функция анимации
          if (data.animationFrame % 10 === 0) {
            // Каждый 10 кадр
            this.sprite = // Установка спрайта
              this.spriteAnimations.walking.frames[ // Выбор текущего кадра из анимации ходьбы
                this.spriteAnimations.walking.currentFrame
              ];

            this.spriteAnimations.walking.currentFrame += 1; // Переход к следующему кадру

            if (this.spriteAnimations.walking.currentFrame > 1) {
              // Если достигнут последний кадр
              this.spriteAnimations.walking.currentFrame = 0; // Возвращаемся к первому кадру
            }
          }
        },
      },
      dead: {
        // Гумба умер
        movement: () => {
          this.velX = 0; 
        },
        animation: () => {
          this.sprite = this.spriteAnimations.dead; 
        },
      },
    };

    this.currentState = this.states.walking; // Установка начального состояния (ходьба)
    this.direction = "right"; // Изначальное направление - вправо
    this.velY = 0; // Изначальная скорость по Y
    this.velX = 0.7; // Изначальная скорость по X
    this.xPos = xPos; // Установка позиции по X
    this.yPos = yPos; // Установка позиции по Y
    this.width = width; // Установка ширины
    this.height = height; // Установка высоты
  }
}
