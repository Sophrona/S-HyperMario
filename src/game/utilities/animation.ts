import Coin from "../entities/coin";
import Goomba from "../entities/goomba";
import Koopa from "../entities/koopa";
import Mushroom from "../entities/mushroom";
import { Data } from "./types";

class Animation {
  // Обновление анимации
  update(data: Data) {
    // Обновление анимации Марио
    data.entities.mario.currentState.animation(data);

    // Обновление анимации монет
    data.entities.coins.forEach((coin: Coin) => {
      coin.currentState.animation(data);
    });

    // Обновление анимации грибов
    data.entities.mushrooms.forEach((mushroom: Mushroom) => {
      mushroom.currentState.animation(data);
    });

    // Обновление анимации гумбы
    data.entities.goombas.forEach((goomba: Goomba) => {
      goomba.currentState.animation(data);
    });

    // Обновление анимации купы
    data.entities.koopas.forEach((koopa: Koopa) => {
      koopa.currentState.animation(data);
    });
  }
}

export default Animation;
