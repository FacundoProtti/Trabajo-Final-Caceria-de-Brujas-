export default class ControlesScene extends Phaser.Scene {
  constructor() {
    super("ControlesScene");
  }

  preload() {
    this.load.image("controles", "public/assets/controles.png");
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2, "controles").setOrigin(0.5);

    const flecha = this.add.zone(550, 155, 60, 60)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("MainMenuScene");
      });
  }
}


