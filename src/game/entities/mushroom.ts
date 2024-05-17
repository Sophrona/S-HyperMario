import Entity from "./entity";
import Sprite from "./sprite";

// Тип для состояний гриба
type MushroomStates = {
  moving: {
    movement: (data: { animationFrame: number }) => void; 
    animation: (data: { animationFrame: number }) => void; 
  };
}

// Класс гриба
export default class Mushroom extends Entity {
  spriteAnimations: {
    // Анимации спрайтов
    moving: Sprite; // Движение
  };
  states: MushroomStates; // Состояния гриба
  currentState: MushroomStates[keyof MushroomStates]; // Текущее состояние
  direction: "left" | "right"; // Направление (влево или вправо)
  velY: number; // Скорость по Y
  velX: number; // Скорость по X

  constructor(
    img: HTMLImageElement, // Изображение
    xPos: number, // Позиция по X
    yPos: number, // Позиция по Y
    width: number, // Ширина
    height: number // Высота
  ) {
    if (!img) {
      // Проверка наличия изображения
      throw new Error("Image element is required."); // Выбросить ошибку, если изображение отсутствует
    }

    // Создание спрайта для гриба
    const sprite = new Sprite(img, 625, 5, 16, 16);

    // Вызов конструктора класса-родителя
    super({ type: "mushroom", sprite, xPos, yPos, width, height });

    // Настройка анимаций спрайтов
    this.spriteAnimations = {
      moving: new Sprite(img, 625, 5, 16, 16), // Анимация движения
    };

    // Определение различных состояний для гриба
    this.states = {
      moving: {
        // Функция для обработки логики движения
        movement: () => {
          if (this.direction === "left") {
            // Если направление влево
            this.xPos -= this.velX; // Изменить позицию по X влево
          } else {
            // Иначе
            this.xPos += this.velX; // Изменить позицию по X вправо
          }
        },
        // Функция для обработки логики анимации
        animation: () => {
          this.sprite = this.spriteAnimations.moving; // Установить спрайт для анимации движения
        },
      },
    };

    // Установка начального состояния
    this.currentState = this.states.moving;

    // Установка начальных свойств
    this.direction = "right"; // Направление по умолчанию - вправо
    this.velY = 0; // Установка начальной скорости по Y
    this.velX = 1.3; // Установка начальной скорости по X
    this.xPos = xPos; // Установка начальной позиции по X
    this.yPos = yPos; // Установка начальной позиции по Y
    this.width = width; // Установка ширины
    this.height = height; // Установка высоты
  }
}
