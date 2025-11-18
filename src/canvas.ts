import chalk from "chalk";

export type Pixel = { x: number; y: number; value: string };

export class Canvas {
  width: number;
  height: number;
  grid: string[][] = [];

  private cursorIcon = "▁▁";
  private cursor: Pixel = { x: 0, y: 0, value: this.cursorIcon };
  private footer: string;

  constructor(width: number, height: number, footer: string) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => "██")
    );
    this.footer = footer;
  }

  setPixel(x: number, y: number, value: string) {
    if (y < 0 || y >= this.height || x < 0 || x >= this.width) return;
    this.grid[y][x] = value;
    this.render();
  }

  getPixel(x: number, y: number): string {
    return this.grid[y][x];
  }

  render() {
    console.clear();

    let output;

    for (let row = 0; row < this.height; row++) {
      output = "";
      for (let col = 0; col < this.width; col++) {
        if (col === this.cursor.x && row === this.cursor.y) {
          output += this.cursorIcon;
        } else {
          output += this.grid[row][col];
        }
      }

      if (row === this.height - 1) {
        output += `\n\n${this.footer}`;
      }

      console.log(output);
    }
  }

  move(dx: number, dy: number) {
    const newX = this.cursor.x + dx;
    const newY = this.cursor.y + dy;

    if (newX < 0 || newX >= this.width) return;
    if (newY < 0 || newY >= this.height) return;

    this.cursor.x = newX;
    this.cursor.y = newY;

    this.render();
  }

  delete(): void {
    this.setPixel(this.cursor.x, this.cursor.y, "██");
    this.render();
  }
}
