import chalk from "chalk";
import { Canvas } from "./canvas";
import { Controller } from "./controller";

console.log(chalk.blue("louiewuzhere"));

let menu = 'Move: ↑ ↓ ← → | Paint: Space | Delete: del | Exit: Esc'

const canvas = new Canvas(32, 32, menu);

/* Handle user controls */
const controller = new Controller()
  .on("up", () => canvas.move(0, -1))
  .on("down", () => canvas.move(0, 1))
  .on("left", () => canvas.move(-1, 0))
  .on("right", () => canvas.move(1, 0))
  .on("delete", () => canvas.delete())
  .on("space", () => canvas.setPixel(canvas['cursor'].x, canvas['cursor'].y, "  "))
  .on("escape", () => process.exit(0));

controller.build();

/* Start App */
canvas.setPixel(2, 2, chalk.red("██"));
canvas.setPixel(3, 2, chalk.green("██"));
canvas.setPixel(4, 2, chalk.blue("██"));
canvas.render();
