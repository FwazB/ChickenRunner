import Phaser from "phaser";

import Game from "./scenes/Game";
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 1900,
  height: 1900,
  physics: {
    default: "matter",
    matter: {
      debug: true,
    },
  },
  scene: [Game],
};

export default new Phaser.Game(config);
