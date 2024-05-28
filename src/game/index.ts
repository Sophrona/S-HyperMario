import Render from "./utilities/render";
import Input from "./utilities/input";
import Animation from "./utilities/animation";
import Movement from "./utilities/movement";
import Physics from "./utilities/physics";
import MapBuilder from "./map/builder";
import Mario from "./entities/mario";
import Goomba from "./entities/goomba";
import Koopa from "./entities/koopa";
import Score from "./entities/score";
import { Data } from "./utilities/types";
import { levelOne } from "./map/lvl_1-1";

// Определение типа функции обновления счета
type endGameFunction = (newScore: number) => void;

class Game {
  scoreInstance: Score = new Score(5, 15); // Очки игры, изначально null
  inputInstance: Input = new Input();
  animationInstance: Animation = new Animation();
  movementInstance: Movement = new Movement();
  physicsInstance: Physics = new Physics();
  renderInstance: Render = new Render();
  resetRequested = false; // Флаг запроса сброса игры, изначально false
  animationFrameId: number | null = null; // Идентификатор текущего кадра анимации, изначально null
  endGame: endGameFunction | null = null; // Функция окончания игры, изначально null

  // Загрузка всех ассетов игры
  async loadAssets(): Promise<[HTMLImageElement, HTMLImageElement]> {
    const spriteSheetPromise = this.loadImage(
      "./assets/sprites/spritesheet.png"
    );
    const tilesetPromise = this.loadImage(
      "./assets/sprites/tileset_gutter.png"
    );

    return Promise.all([spriteSheetPromise, tilesetPromise]);
  }

  // Загрузка изображения
  loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  }

  // Инициализация игры
  async init(
    canvasElement: HTMLCanvasElement | null, // HTML-элемент canvas для отображения игры
    width: number, // Ширина canvas
    height: number, // Высота canvas
    bgMusic: HTMLAudioElement | null,
    onEndGame: endGameFunction // Функция окончания игры и обновления счета
  ) {
    if (!canvasElement) return;

    this.endGame = onEndGame;
    const ctx = canvasElement.getContext("2d") as CanvasRenderingContext2D; // Получение контекста отображения 2D
    ctx.scale(3, 3); // Установка масштаба отображения

    const canvas = { canvas: canvasElement, ctx }; // Объект canvas с контекстом
    const viewport = { width, height, vX: 0, vY: 0 }; // Объект видимой области

    try {
      const [spriteSheet, tileset] = await this.loadAssets(); // Загрузка всех ассетов
      const data = this.createGameData(
        canvas,
        viewport,
        spriteSheet,
        tileset,
        bgMusic
      ); // Создание игровых данных
      this.setupEntities(data); // Настройка игровых объектов
      this.renderInstance.init(data); // Инициализация рендера
      this.run(data); // Запуск игры
    } catch (error) {
      console.error("Failed to load assets:", error);
    }
  }

  // Создание игровых данных
  createGameData(
    canvas: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D }, // Объект canvas
    viewport: { width: number; height: number; vX: number; vY: number }, // Объект видимой области
    spriteSheet: HTMLImageElement, // Изображение спрайтов
    tileset: HTMLImageElement, // Изображение декораций
    backgroundMusic: HTMLAudioElement | null // Фоновая музыка
  ): Data {

    return {
      spriteSheet,
      canvas,
      viewport,
      animationFrame: 0,
      mapBuilder: new MapBuilder(levelOne, tileset, spriteSheet), // Создание уровня
      sounds: {
        backgroundMusic,
        breakSound: new Audio("./assets/audio/fx/break_block.wav"),
        levelFinish: new Audio("./assets/audio/music/level_complete.mp3"),
      },
      userControl: true,
      reset: () => this.reset(),
      entities: {
        mario: new Mario(spriteSheet, 175, 0, 16, 16),
        score: this.scoreInstance,
        coins: [],
        mushrooms: [],
        goombas: [],
        koopas: [],
        scenery: [],
      }, // Объекты игровых сущностей
    };
  }

  // Настройка игровых объектов
  setupEntities(data: Data) {
    levelOne.koopas.forEach((koopa) => {
      // Для каждого объекта Купа в уровне
      data.entities.koopas.push(
        // Добавить в массив Купа
        new Koopa(data.spriteSheet, koopa[0], koopa[1], koopa[2], koopa[3]) // Создание объекта Купа
      );
    });

    levelOne.goombas.forEach((goomba) => {
      // Для каждого объекта Гумба в уровне
      data.entities.goombas.push(
        // Добавить в массив Гумба
        new Goomba(data.spriteSheet, goomba[0], goomba[1], goomba[2], goomba[3]) // Создание объекта Гумба
      );
    });
  }

  // Запуск игры
  run(data: Data) {
    if (data.sounds.backgroundMusic) {
      // Если есть фоновая музыка
      data.sounds.backgroundMusic.play(); // Воспроизвести музыку
    }

    let lastFrameTime = 0; // Время последнего кадра
    const targetFPS = 60; // Целевое количество кадров в секунду
    const frameInterval = 1000 / targetFPS; // Интервал между кадрами

    const loop = (currentTime: number) => {
      // Основной игровой цикл

      if (this.resetRequested && this.animationFrameId) {
        // Если запрошен сброс и есть текущий кадр анимации
        cancelAnimationFrame(this.animationFrameId); // Отменить анимацию
        this.animationFrameId = null; // Сбросить идентификатор анимации
        this.resetRequested = false; // Сбросить флаг запроса сброса

        return;
      }

      const elapsedTime = currentTime - lastFrameTime; // Время, прошедшее с предыдущего кадра

      if (elapsedTime > frameInterval) {
        // Если прошло достаточно времени для следующего кадра
        lastFrameTime = currentTime - (elapsedTime % frameInterval); // Установить время последнего кадра

        // Покадровое обновление элементов игры, таких как рендер, физика
        this.inputInstance.update(data);
        this.animationInstance.update(data);
        this.movementInstance.update(data);
        this.physicsInstance.update(data);
        this.updateView(data);
        this.renderInstance.update(data);

        data.animationFrame += 1; // Увеличить номер кадра анимации
      }

      this.animationFrameId = window.requestAnimationFrame(loop); // Запросить следующий кадр анимации
    };

    this.animationFrameId = window.requestAnimationFrame(loop); // Запуск игрового цикла
  }

  // Обновление вида
  updateView(data: Data) {
    const viewport = data.viewport;
    const margin = viewport.width / 6;
    const center = {
      x: data.entities.mario.xPos + data.entities.mario.width * 0.5,
      y: data.entities.mario.yPos + data.entities.mario.height * 0.5,
    };

    if (center.x < viewport.vX + margin * 2) {
      viewport.vX = Math.max(center.x - margin, 0);
    } else if (center.x > viewport.vX + viewport.width - margin * 2) {
      viewport.vX = Math.min(
        center.x + margin - viewport.width,
        3400 - viewport.width
      );
    }
  }

  // Сброс игры
  reset() {
    this.resetRequested = true; // Установить флаг запроса сброса

    if (this.endGame && this.scoreInstance) {
      // Если есть функция сохранения счета и объект счета
      this.endGame(this.scoreInstance.value); // Вызвать функцию сохранения счета
    }
  }
}

export default Game;
