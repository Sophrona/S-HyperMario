export default class Sprite {
  img: HTMLImageElement; // Изображение спрайта
  srcX: number; // Исходная координата X спрайта на изображении
  srcY: number; // Исходная координата Y спрайта на изображении
  srcW: number; // Исходная ширина спрайта на изображении
  srcH: number; // Исходная высота спрайта на изображении

  constructor(
    img: HTMLImageElement, // Изображение спрайта
    srcX: number, // Исходная координата X спрайта на изображении
    srcY: number, // Исходная координата Y спрайта на изображении
    srcW: number, // Исходная ширина спрайта на изображении
    srcH: number // Исходная высота спрайта на изображении
  ) {
    this.img = img;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcW = srcW;
    this.srcH = srcH;
  }
}
