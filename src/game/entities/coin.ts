import Entity from "./entity";
import Sprite from "./sprite";

// Тип для состояний монеты
type CoinStates = {
  spinning: { // Вращение
    animation: (data: { animationFrame: number }) => void; // Функция анимации вращения
  };
  blockCoin: { // Монета в блоке
    animation: () => void; // Функция анимации для монеты в блоке
  };
}

// Класс монеты
export default class Coin extends Entity {
  coinSound: HTMLAudioElement; // Звук монеты
  tileset: HTMLImageElement; // Спрайт-изображение
  spriteAnimations: { // Анимации спрайтов
    spin: { frames: Sprite[]; currentFrame: number }; // Вращение: массив кадров и текущий кадр
    blockCoin: Sprite; 
  };
  states: { // Состояния монеты
    spinning: { animation: (data: { animationFrame: number }) => void }; 
    blockCoin: { animation: () => void }; 
  };
  currentState: CoinStates[keyof CoinStates]; // Текущее состояние монеты

  constructor(
    spriteSheet: HTMLImageElement, // Спрайт
    xPos: number, // Позиция по X
    yPos: number, // Позиция по Y
    width: number, // Ширина
    height: number // Высота
  ) {
    const sprite = new Sprite(spriteSheet, 5, 5, 10, 14); // Создание спрайта
    super({ type: "coin", sprite: sprite, xPos, yPos, width, height }); // Вызов конструктора класса-родителя

    this.type = "coin"; // Тип монеты
    this.coinSound = new Audio("./assets/audio/fx/coin.wav"); // Звук монеты

    this.tileset = new Image(); 
    this.tileset.src = "./assets/sprites/tileset_gutter.png"; // Установка источника изображения

    this.spriteAnimations = { // Инициализация анимаций спрайтов
      spin: { // Вращение
        frames: [ // Массив кадров
          new Sprite(spriteSheet, 5, 5, 10, 14), 
          new Sprite(spriteSheet, 21, 5, 10, 14), 
          new Sprite(spriteSheet, 37, 5, 10, 14), 
          new Sprite(spriteSheet, 53, 5, 10, 14), 
        ],
        currentFrame: 0, // Текущий кадр
      },
      blockCoin: new Sprite(this.tileset, 486, 18, 18, 18), // Монета в блоке
    };

    this.states = { // Инициализация состояний монеты
      spinning: { // Вращение
        animation: (data) => { // Функция анимации
          if (data.animationFrame % 13 === 0) { // Каждый 13 кадр
            this.sprite = // Установка спрайта
              this.spriteAnimations.spin.frames[ // Выбор текущего кадра из анимации вращения
                this.spriteAnimations.spin.currentFrame
              ];
            this.spriteAnimations.spin.currentFrame += 1; // Переход к следующему кадру

            if (this.spriteAnimations.spin.currentFrame > 3) { // Если достигнут последний кадр
              this.spriteAnimations.spin.currentFrame = 0; // Возвращаемся к первому кадру
            }
          }
        },
      },

      blockCoin: { // Монета в блоке
        animation: () => { // Функция анимации
          this.sprite = this.spriteAnimations.blockCoin; // Установка спрайта монеты в блоке
        },
      },
    };
    this.currentState = this.states.spinning; // Установка начального состояния (вращение)
    this.xPos = xPos; // Установка позиции по X
    this.yPos = yPos; // Установка позиции по Y
    this.width = width; // Установка ширины
    this.height = height; // Установка высоты
  }
}
