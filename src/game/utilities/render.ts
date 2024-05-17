import Coin from "../entities/coin"; // Импорт монеты
import Goomba from "../entities/goomba"; // Импорт Гумбы
import Koopa from "../entities/koopa"; // Импорт Купы
import Mushroom from "../entities/mushroom"; // Импорт гриба
import Sprite from "../entities/sprite"; // Импорт спрайта
import { Data } from "./types"; // Импорт типов данных

interface Entity {
  type: string; // Тип сущности
  sprite: Sprite; // Спрайт-изображение сущности
  xPos: number; // Позиция X
  yPos: number; // Позиция Y
  width: number; // Ширина
  height: number; // Высота
}

class Render {
  init(data: Data) {
    data.mapBuilder.create(data); // Создание карты
  }

  update(data: Data) {
    data.canvas.ctx.clearRect(0, 0, 760, 600); // Очистка холста
    data.canvas.ctx.fillStyle = "#63adff"; // Заливка цветом фона
    data.canvas.ctx.fillRect(0, 0, 760, 600); // Заливка прямоугольника

    data.mapBuilder.renderMap(data); // Рендер карты

    data.entities.coins.forEach((coin: Coin) => {
      // Рендер монет
      this.drawEntity(coin, data);
    });

    data.entities.mushrooms.forEach((mushroom: Mushroom) => {
      // Рендер грибов
      this.drawEntity(mushroom, data);
    });

    data.entities.goombas.forEach((goomba: Goomba) => {
      // Рендер Гумб
      this.drawEntity(goomba, data);
    });

    data.entities.koopas.forEach((koopa: Koopa) => {
      // Рендер Куп
      this.drawEntity(koopa, data);
    });

    this.drawText(data); // Рендер текста
    this.drawEntity(data.entities.mario, data); // Рендер Марио
  }

  drawEntity(entity: Entity, data: Data) {
    if (
      entity.xPos + entity.width >= data.viewport.vX &&
      entity.xPos + entity.width <= data.viewport.vX + data.viewport.width &&
      entity.yPos + entity.height >= data.viewport.vY &&
      entity.yPos + entity.height <= data.viewport.vY + data.viewport.height
    ) {
      // Проверка, находится ли сущность в видимой области
      data.canvas.ctx.drawImage(
        // Рендер изображения сущности
        entity.sprite.img,
        entity.sprite.srcX,
        entity.sprite.srcY,
        entity.sprite.srcW,
        entity.sprite.srcH,
        entity.xPos - data.viewport.vX,
        entity.yPos - data.viewport.vY,
        entity.width,
        entity.height
      );
    }
  }

  drawText(data: Data) {
    const text = data.entities.score; // Получение данных о тексте

    data.canvas.ctx.font = `${text.size} ${text.font}`; // Установка шрифта
    data.canvas.ctx.fillStyle = text.color; // Установка цвета текста
    data.canvas.ctx.fillText(`Счёт: ${text.value}`, text.xPos, text.yPos); // Рендер текста счёта
  }
}

export default new Render();
