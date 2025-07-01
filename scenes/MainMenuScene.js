export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
  }

  preload() {
    this.load.image("menu", "public/assets/menu.png"); 
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2, "menu").setOrigin(0.5);

    const playButton = this.add.zone(400, 130, 80, 80)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("GameScene");
      });

    const controlsButton = this.add.zone(400, 230, 70, 70)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("ControlesScene")
      });
  }
}
