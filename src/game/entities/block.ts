import Entity from "./entity"; 
import Sprite from "./sprite";
import Coin from "./coin"; 
import Mushroom from "./mushroom"; 
import { Data } from "../utilities/types";

export default class Block extends Entity {
  contents: string; 
  coinSound: HTMLAudioElement; // Звук монеты
  powerupSpawnSound: HTMLAudioElement; // Звук появления бонуса
  used: Sprite; // Использованный спрайт блока
  tileset: HTMLImageElement; // Спрайт-изображение

  // Конструктор блока
  constructor(
    contents: string, 
    tileset: HTMLImageElement, 
    xPos: number, // Позиция по оси X
    yPos: number, // Позиция по оси Y
    width: number, // Ширина блока
    height: number // Высота блока
  ) {
    // Вызов конструктора базового класса Entity
    super({
      type: "block", // Установка типа блока
      sprite: new Sprite(tileset, 433, 1, 17, 17), // Создание спрайта блока
      xPos, // Позиция по оси X
      yPos, // Позиция по оси Y
      width, // Ширина блока
      height, // Высота блока
    });

    // Инициализация свойств блока
    this.contents = contents; // Установка содержимого блока
    this.coinSound = new Audio("./assets/audio/fx/coin.wav"); // Звук монеты
    this.powerupSpawnSound = new Audio("./assets/audio/fx/powerup_spawn.wav"); // Звук появления бонуса
    this.used = new Sprite(tileset, 486, 0, 18, 18); // Установка использованного спрайта блока
    this.tileset = tileset; 
  }

  // Метод создания гриба
  createMushroom(data: Data) {
    // Создание нового экземпляра гриба
    const mushroom = new Mushroom(
      data.spriteSheet, // Набор спрайтов
      this.xPos, // Позиция по оси X
      this.yPos - 18, // Позиция по оси Y (с учетом высоты гриба)
      16, // Ширина гриба
      16 // Высота гриба
    );

    // Добавление гриба в массив сущностей
    data.entities.mushrooms.push(mushroom);

    // Воспроизведение звука появления бонуса
    this.powerupSpawnSound.play();

    // Обновление содержимого блока
    this.contents = "empty";
  }

  // Метод сбора монеты
  collectCoin(data: Data) {
    // Создание нового экземпляра монеты
    const coin = new Coin(
      this.tileset, // Набор тайлов
      this.xPos - 2, // Позиция по оси X (с учетом смещения)
      this.yPos - 18, // Позиция по оси Y (с учетом высоты монеты)
      18, // Ширина монеты
      18 // Высота монеты
    );

    // Увеличение значения счета и количества собранных монет
    data.entities.score.value += 50;
    data.entities.score.coinCount += 1;

    // Обновление содержимого блока
    this.contents = "empty";

    // Воспроизведение звука монеты
    this.coinSound.play();

    // Установка состояния монеты и добавление ее в массив сущностей
    coin.currentState = coin.states.blockCoin;
    data.entities.coins.push(coin);

    // Удаление монеты из массива сущностей через некоторое время
    setTimeout(() => {
      const index = data.entities.coins.indexOf(coin);
      delete data.entities.coins[index];
    }, 50);
  }
}
