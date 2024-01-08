export class SpriteSheet {
  public img: HTMLImageElement;
  public width: number;
  public height: number;
  public tiles: Map<string, HTMLCanvasElement>;

  constructor(img: HTMLImageElement, width: number, height: number) {
    this.img = img;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(type: string, x: number, y: number) {
    const buffer = document.createElement("canvas");
    buffer.width = this.width;
    buffer.height = this.height;

    const context = buffer.getContext("2d");

    if (!context) {
      throw new Error("2D rendering context not supported");
    }

    context.drawImage(
      this.img,
      x * this.width,
      y * this.height,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height
    );
    this.tiles.set(type, buffer);
  }

  draw(
    type: string,
    context: CanvasRenderingContext2D | null,
    x: number,
    y: number
  ) {
    if (!context) {
      throw new Error("Canvas rendering context not provided");
    }

    const buffer = this.tiles.get(type);

    if (!buffer) {
      console.error(`Sprite "${type}" not found in tiles`);
      return;
    }

    context.drawImage(buffer, x, y);
  }
}
