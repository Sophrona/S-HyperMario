export default class Score {
  value: number; // Значение счета
  coinCount: number; // Количество собранных монет
  xPos: number; // Позиция по оси X для отображения счета
  yPos: number; // Позиция по оси Y для отображения счета
  size: string; // Размер текста счета
  font: string; // Шрифт текста счета
  color: string; // Цвет текста счета

  // Конструктор класса Score
  constructor(xPos: number, yPos: number) {
    // Начальное значение счета
    this.value = 0;

    // Начальное количество собранных монет
    this.coinCount = 0;

    // Позиция отображения счета
    this.xPos = xPos;
    this.yPos = yPos;

    // Размер и цвет текста счета по умолчанию
    this.size = "10px";
    this.color = "white";

    // Шрифт текста счета
    this.font = "PressStart";
  }
}
