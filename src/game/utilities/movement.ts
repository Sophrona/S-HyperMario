import Goomba from "../entities/goomba";
import Koopa from "../entities/koopa";
import Mushroom from "../entities/mushroom";
import { Data } from "./types";

class Movement {
  update(data: Data) {
    // Обновляем движение Марио в соответствии с текущим состоянием
    data.entities.mario.currentState.movement(data);

    // Обновляем движение для каждого гриба
    data.entities.mushrooms.forEach((mushroom: Mushroom) => {
      mushroom.currentState.movement(data);
    });

    // Обновляем движение для каждого гумбы
    data.entities.goombas.forEach((goomba: Goomba) => {
      goomba.currentState.movement(data);
    });

    // Обновляем движение для каждой купы
    data.entities.koopas.forEach((koopa: Koopa) => {
      koopa.currentState.movement(data);
    });
  }
}

export default new Movement();
