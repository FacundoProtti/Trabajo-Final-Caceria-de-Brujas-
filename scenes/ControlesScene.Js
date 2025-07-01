export default class ControlesScene extends Phaser.Scene {
  constructor() {
    super("ControlesScene");
  }

  preload() {
    this.load.image("controles", "public/assets/controles.png");
  }

  create() {
    // Mostrar la imagen de controles centrada
    this.add.image(this.scale.width / 2, this.scale.height / 2, "controles").setOrigin(0.5);

    // Zona interactiva sobre la flecha
    const flecha = this.add.zone(550, 155, 60, 60)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("MainMenuScene");
      });

    // Para depurar (opcional)
    // this.add.graphics().lineStyle(2, 0x00ff00).strokeRectShape(flecha.getBounds());
  }
}


