import Entity from "./entity";
import Sprite from "./sprite";

// Тип параметром конструктора для создания сущностей
type EntityConstructorParams = {
  tileset: HTMLImageElement; // Изображение
  xPos: number; // Позиция по X
  yPos: number; // Позиция по Y
  width: number; // Ширина
  height: number; // Высота
}

// Класс Земли
class Ground extends Entity {
  constructor({ tileset, xPos, yPos, width, height }: EntityConstructorParams) {
    const sprite = new Sprite(tileset, 0, 0, 16, 16); 
    super({ type: "ground", sprite, xPos, yPos, width, height }); 
  }
}

// Класс Трубы
class Pipe extends Entity {
  constructor({ tileset, xPos, yPos, width, height }: EntityConstructorParams) {
    const sprite = new Sprite(tileset, 0, 180, 35, 35); 
    super({ type: "pipe", sprite, xPos, yPos, width, height }); 
  }
}

// Класс Кирпича
class Brick extends Entity {
  constructor({ tileset, xPos, yPos, width, height }: EntityConstructorParams) {
    const sprite = new Sprite(tileset, 0, 18, 18, 18); 
    super({ type: "brick", sprite, xPos, yPos, width, height }); 
  }
}

// Класс Куста
class Shrub extends Entity {
  constructor({ tileset, xPos, yPos, width, height }: EntityConstructorParams) {
    const sprite = new Sprite(tileset, 198.5, 162.5, 53, 17); 
    super({ type: "shrub", sprite, xPos, yPos, width, height }); 
  }
}

// Класс Горы
class Mountain extends Entity {
  constructor({ tileset, xPos, yPos, width, height }: EntityConstructorParams) {
    const sprite = new Sprite(tileset, 0, 0, 90, 39); 
    super({ type: "mountain", sprite, xPos, yPos, width, height }); 
  }
}

// Класс Маленького Облака
class SmallCloud extends Entity {
  constructor({ tileset, xPos, yPos, width, height }: EntityConstructorParams) {
    const sprite = new Sprite(tileset, 64.5, 0, 33, 24); 
    super({ type: "cloud", sprite, xPos, yPos, width, height }); 
  }
}

// Класс Среднего Облака
class MediumCloud extends Entity {
  constructor({ tileset, xPos, yPos, width, height }: EntityConstructorParams) {
    const sprite = new Sprite(tileset, 0, 24.5, 48, 24);
    super({ type: "cloud", sprite, xPos, yPos, width, height }); 
  }
}

// Класс Большого Облака
class LargeCloud extends Entity {
  constructor({ tileset, xPos, yPos, width, height }: EntityConstructorParams) {
    const sprite = new Sprite(tileset, 0, 0, 64, 24); 
    super({ type: "cloud", sprite, xPos, yPos, width, height }); 
  }
}

// Класс Флага
class Flag extends Entity {
  constructor({ tileset, xPos, yPos, width, height }: EntityConstructorParams) {
    const sprite = new Sprite(tileset, 289, 153, 16, 27); 
    super({ type: "flag", sprite, xPos, yPos, width, height }); 
  }
}

// Класс Шеста с флагом
class Flagpole extends Entity {
  constructor({ tileset, xPos, yPos, width, height }: EntityConstructorParams) {
    const sprite = new Sprite(tileset, 289, 163, 16, 18); 
    super({ type: "flag", sprite, xPos, yPos, width, height }); 
  }
}

// Класс Замка
class Castle extends Entity {
  constructor({ tileset, xPos, yPos, width, height }: EntityConstructorParams) {
    const sprite = new Sprite(tileset, 0, 0, 80, 80); 
    super({ type: "flag", sprite, xPos, yPos, width, height }); 
  }
}

export {
  Ground,
  Pipe,
  Brick,
  Shrub,
  Mountain,
  SmallCloud,
  MediumCloud,
  LargeCloud,
  Flag,
  Flagpole,
  Castle,
};
