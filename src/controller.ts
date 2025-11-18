import { emitKeypressEvents } from "node:readline";

export class Controller {
  private commands: { key: string; command: () => void }[] = [];

  on(key: string, command: () => void) {
    this.commands.push({ key, command });
    return this;
  }

  build() {
    emitKeypressEvents(process.stdin);

    process.stdin.setRawMode(true);

    process.stdin.on("keypress", (chunk, key) => {
      this.commands.forEach((command) => {
        if (command.key == key.name) {
          command.command();
        }
      });
    });
  }
}
