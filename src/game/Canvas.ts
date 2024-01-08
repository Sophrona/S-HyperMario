export class Canvas {
  public canvas: HTMLCanvasElement | null;
  public context: CanvasRenderingContext2D | null;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    this.context = this.canvas ? this.canvas.getContext("2d") : null;
  }

  drawImage(img: HTMLImageElement, x: number, y: number): void {
    if (this.context) {
      this.context.drawImage(img, x, y);
    } else {
      console.error("2D rendering context not supported");
    }
  }
}
