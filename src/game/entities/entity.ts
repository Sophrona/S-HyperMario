import Sprite from "./sprite";

// Тип данных сущности
type EntityOptions = {
  type: string; // Тип сущности
  sprite: Sprite; // Спрайт сущности
  xPos: number; // Позиция по X
  yPos: number; // Позиция по Y
  width: number; // Ширина
  height: number; // Высота
}

// Базовый класс сущности
export default class Entity {
  type: string; // Тип сущности
  sprite: Sprite; // Спрайт сущности
  xPos: number; // Позиция по X
  yPos: number; // Позиция по Y
  width: number; // Ширина
  height: number; // Высота

  constructor(options: EntityOptions) {
    this.type = options.type; // Инициализация типа
    this.sprite = options.sprite; // Инициализация спрайта
    this.xPos = options.xPos; // Инициализация позиции по X
    this.yPos = options.yPos; // Инициализация позиции по Y
    this.width = options.width; // Инициализация ширины
    this.height = options.height; // Инициализация высоты
  }
}
