import * as Scenery from "../entities/scenery"; // Импорт сценариев (декораций)
import Block from "../entities/block"; // Импорт блока
import Breakable from "../entities/breakable"; // Импорт разрушаемого объекта
import { Data } from "../utilities/types"; // Импорт типа данных

// Тип данных уровня (местность, декорации)
type LevelData = {
  ground: number[][];
  shrubs: number[][];
  mountains: number[][];
  pipes: number[][];
  smallClouds: number[][];
  mediumClouds: number[][];
  largeClouds: number[][];
  blocks: number[][];
  mushrooms: number[][];
  breakables: number[][];
  bricks: number[][];
  flag: number[];
  flagpole: number[];
  castle: number[];
}

export default class MapBuilder {
  level: LevelData; // Данные уровня
  tileset: HTMLImageElement; // Спрайт-изображение местности
  spriteSheet: HTMLImageElement; // Спрайт-изображение декораций
  mountainSheet: HTMLImageElement; // Спрайт-изображение горы
  cloudsSheet: HTMLImageElement; // Спрайт-изображение облака
  castleSheet: HTMLImageElement; // Спрайт-изображение для замка
  sceneryEntities: (
    | Scenery.Ground
    | Scenery.Shrub
    | Scenery.Mountain
    | Scenery.Pipe
    | Scenery.SmallCloud
    | Scenery.MediumCloud
    | Scenery.LargeCloud
    | Scenery.Brick
    | Scenery.Flag
    | Scenery.Flagpole
    | Scenery.Castle
  )[]; // Список декораций
  blockEntities: Block[]; // Список блоков
  breakableEntities: Breakable[]; // Список разрушаемых объектов

  constructor(
    level: LevelData,
    tileset: HTMLImageElement,
    spriteSheet: HTMLImageElement
  ) {
    this.level = level; // Устанавливаем данные уровня
    this.tileset = tileset; // Устанавливаем набор изображений местности
    this.spriteSheet = spriteSheet; // Устанавливаем спрайт-изображение

    // Создание изображений для различных декораций (горы, облака, замки)
    this.mountainSheet = new Image();
    this.mountainSheet.src = "./assets/sprites/mountain.png";
    this.cloudsSheet = new Image();
    this.cloudsSheet.src = "./assets/sprites/clouds.png";
    this.castleSheet = new Image();
    this.castleSheet.src = "./assets/sprites/castle.png";

    this.sceneryEntities = []; // Инициализация списка декораций
    this.blockEntities = []; // Инициализация списка блоков
    this.breakableEntities = []; // Инициализация списка разрушаемых объектов

    // Создание всех декораций на карте
    level.ground.forEach((ground) => {
      this.sceneryEntities.push(
        new Scenery.Ground({
          tileset: this.tileset,
          xPos: ground[0],
          yPos: ground[1],
          width: ground[2],
          height: ground[3],
        })
      );
    });

    level.shrubs.forEach((shrub) => {
      this.sceneryEntities.push(
        new Scenery.Shrub({
          tileset: this.tileset,
          xPos: shrub[0],
          yPos: shrub[1],
          width: shrub[2],
          height: shrub[3],
        })
      );
    });

    level.mountains.forEach((mountain) => {
      this.sceneryEntities.push(
        new Scenery.Mountain({
          tileset: this.mountainSheet,
          xPos: mountain[0],
          yPos: mountain[1],
          width: mountain[2],
          height: mountain[3],
        })
      );
    });

    level.pipes.forEach((pipe) => {
      this.sceneryEntities.push(
        new Scenery.Pipe({
          tileset: this.tileset,
          xPos: pipe[0],
          yPos: pipe[1],
          width: pipe[2],
          height: pipe[3],
        })
      );
    });

    level.smallClouds.forEach((smallCloud) => {
      this.sceneryEntities.push(
        new Scenery.SmallCloud({
          tileset: this.cloudsSheet,
          xPos: smallCloud[0],
          yPos: smallCloud[1],
          width: smallCloud[2],
          height: smallCloud[3],
        })
      );
    });

    level.mediumClouds.forEach((mediumCloud) => {
      this.sceneryEntities.push(
        new Scenery.MediumCloud({
          tileset: this.cloudsSheet,
          xPos: mediumCloud[0],
          yPos: mediumCloud[1],
          width: mediumCloud[2],
          height: mediumCloud[3],
        })
      );
    });

    level.largeClouds.forEach((largeCloud) => {
      this.sceneryEntities.push(
        new Scenery.LargeCloud({
          tileset: this.cloudsSheet,
          xPos: largeCloud[0],
          yPos: largeCloud[1],
          width: largeCloud[2],
          height: largeCloud[3],
        })
      );
    });

    level.blocks.forEach((block) => {
      this.blockEntities.push(
        new Block("coin", this.tileset, block[0], block[1], block[2], block[3])
      );
    });

    level.mushrooms.forEach((block) => {
      this.blockEntities.push(
        new Block(
          "mushroom",
          this.tileset,
          block[0],
          block[1],
          block[2],
          block[3]
        )
      );
    });

    level.breakables.forEach((breakable) => {
      this.breakableEntities.push(
        new Breakable(
          this.tileset,
          breakable[0],
          breakable[1],
          breakable[2],
          breakable[3]
        )
      );
    });

    level.bricks.forEach((brick) => {
      this.sceneryEntities.push(
        new Scenery.Brick({
          tileset: this.tileset,
          xPos: brick[0],
          yPos: brick[1],
          width: brick[2],
          height: brick[3],
        })
      );
    });

    this.sceneryEntities.push(
      new Scenery.Flag({
        tileset: this.tileset,
        xPos: level.flag[0],
        yPos: level.flag[1],
        width: level.flag[2],
        height: level.flag[3],
      })
    );

    this.sceneryEntities.push(
      new Scenery.Flagpole({
        tileset: this.tileset,
        xPos: level.flagpole[0],
        yPos: level.flagpole[1],
        width: level.flagpole[2],
        height: level.flagpole[3],
      })
    );

    this.sceneryEntities.push(
      new Scenery.Castle({
        tileset: this.castleSheet,
        xPos: level.castle[0],
        yPos: level.castle[1],
        width: level.castle[2],
        height: level.castle[3],
      })
    );
  }

  // Создание данных уровня
  create(data: Data) {
    // Добавить декорации в данные
    this.sceneryEntities.forEach((scene) => {
      data.entities.scenery.push(scene);
    });

    // Добавить разрушаемые объекты в данные
    this.breakableEntities.forEach((breakable) => {
      data.entities.scenery.push(breakable);
    });

    // Добавить блоки в данные
    this.blockEntities.forEach((block) => {
      data.entities.scenery.push(block);
    });
  }

  // Рендер уровня
  renderMap(data: Data) {
    // Рендер декораций
    this.sceneryEntities.forEach((scene) => {
      this.drawEntity(scene, data);
    });

    // Рендер блоков
    this.blockEntities.forEach((brick) => {
      this.drawEntity(brick, data);
    });

    // Рендер разрушаемых объектов
    this.breakableEntities.forEach((breakable) => {
      this.drawEntity(breakable, data);
    });
  }

  // Рендер сущности, если она в область видимости
  drawEntity(
    entity:
      | Scenery.Ground
      | Scenery.Shrub
      | Scenery.Mountain
      | Scenery.Pipe
      | Scenery.SmallCloud
      | Scenery.MediumCloud
      | Scenery.LargeCloud
      | Scenery.Brick
      | Scenery.Flag
      | Scenery.Flagpole
      | Scenery.Castle,
    data: Data
  ) {
    const ctx = data.canvas.ctx; // Контекст холста
    const viewport = data.viewport; // Область видимости

    // Проверка, находится ли сущность в области видимости
    if (
      entity.xPos + entity.width >= viewport.vX &&
      entity.xPos + entity.width <= viewport.vX + viewport.width &&
      entity.yPos + entity.height >= viewport.vY &&
      entity.yPos + entity.height <= viewport.vY + viewport.height
    ) {
      // Рендер сущности
      ctx.drawImage(
        entity.sprite.img,
        entity.sprite.srcX,
        entity.sprite.srcY,
        entity.sprite.srcW,
        entity.sprite.srcH,
        entity.xPos - viewport.vX,
        entity.yPos - viewport.vY,
        entity.width,
        entity.height
      );
    }
  }
}
