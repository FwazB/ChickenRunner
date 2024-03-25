import Phaser from "phaser";

import Game from "./scenes/Game";
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "app",
  width: 1200,
  height: 1500,
  physics: {
    default: "matter",
    matter: {
      debug: true,
    },
  },
  scene: [Game],
};

export default new Phaser.Game(config);
