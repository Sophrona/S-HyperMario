import Entity from "./entity";
import Sprite from "./sprite";

export default class Breakable extends Entity {
  constructor(
    tileset: HTMLImageElement, // Спрайт-изображение
    xPos: number, // Позиция по оси X
    yPos: number, // Позиция по оси Y
    width: number, // Ширина
    height: number // Высота
  ) {
    // Создание спрайта для разрушаемого блока
    const sprite = new Sprite(tileset, 18, 0, 18, 18);
    
    // Вызов конструктора родительского класса с передачей нужных параметров
    super({ type: "breakable", sprite: sprite, xPos, yPos, width, height });
  }
}
