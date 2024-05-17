import Block from "../entities/block";
import Breakable from "../entities/breakable";
import Coin from "../entities/coin"; 
import Goomba from "../entities/goomba"; 
import Koopa from "../entities/koopa"; 
import Mario from "../entities/mario"; 
import Mushroom from "../entities/mushroom"; 
import {
  Brick,
  Castle,
  Flag,
  Flagpole,
  Ground,
  LargeCloud,
  MediumCloud,
  Mountain,
  Pipe,
  Shrub,
  SmallCloud,
} from "../entities/scenery";
import Score from "../entities/score"; 
import MapBuilder from "../map/builder"; 

export type Entity =
  | Block
  | Breakable
  | Coin
  | Goomba
  | Koopa
  | Mario
  | Mushroom;

export type Scenery =
  | Ground
  | Shrub
  | Mountain
  | Pipe
  | SmallCloud
  | MediumCloud
  | LargeCloud
  | Brick
  | Flag
  | Flagpole
  | Castle;

export type SceneryArray = Scenery[];

export type EntityArray = Entity[];

// Определение типа сущностей
export type Entities = {
  mario: Mario; // Марио
  score: Score; // Счёт
  coins: Coin[]; // Монеты
  mushrooms: Mushroom[]; // Грибы
  goombas: Goomba[]; // Гумбы
  koopas: Koopa[]; // Купы
  scenery: SceneryArray; // Декорации
};

// Определение общих данных игры
export type Data = {
  spriteSheet: HTMLImageElement; // Спрайт-изображение
  canvas: {
    // Холст
    canvas: HTMLCanvasElement; // Элемент холста
    ctx: CanvasRenderingContext2D; // Контекст отрисовки
  };
  viewport: {
    width: number; // Ширина
    height: number; // Высота
    vX: number; // Смещение по оси X
    vY: number; // Смещение по оси Y
  };
  animationFrame: number; // Номер кадра анимации
  mapBuilder: MapBuilder; // Строитель уровня
  sounds: {
    // Звуки
    backgroundMusic: HTMLAudioElement | null; // Фоновая музыка
    breakSound: HTMLAudioElement; // Звук разрушения
    levelFinish: HTMLAudioElement; // Звук завершения уровня
  };
  userControl: boolean; // Управление пользователем
  reset: () => void; // Функция сброса
  entities: Entities; // Сущности
};
