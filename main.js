import GameScene from "./scenes/GameScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import MainMenuScene from "./scenes/MainMenuScene.js";
import ControlesScene from "./scenes/ControlesScene.Js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    },
  },
  scene: [MainMenuScene, ControlesScene, GameScene, GameOverScene],
};

window.game = new Phaser.Game(config);
