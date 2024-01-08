import { Canvas } from "./Canvas";
import { SpriteSheet } from "./SpriteSheet";
import { loadImage } from "./helpers/loadImage";

const cvs = new Canvas("hyper-mario__cvs-screen");

if (cvs.canvas) {
  loadImage("../assets/hypermario/tiles.png").then((img) => {
    const sprites = new SpriteSheet(img, 16, 16)
    sprites.define("ground", 0, 0);
    sprites.draw("ground", cvs.context, 45, 62)

    cvs.drawImage(img, 0, 0);
  });
} else {
  console.error("Canvas element not found");
}