export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
  }

  preload() {
    this.load.image("menu", "public/assets/menu.png"); // Asegurate de colocarla ahí
  }

  create() {
    // Mostrar el menú
    this.add.image(this.scale.width / 2, this.scale.height / 2, "menu").setOrigin(0.5);

    // Botón PLAY (cuadro superior del centro)
    const playButton = this.add.zone(400, 130, 80, 80)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("GameScene");
      });

    // Botón CONTROLES (cuadro del medio)
    const controlsButton = this.add.zone(400, 230, 70, 70)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.scene.start("ControlesScene")
      });

    // Botón SONIDO (cuadro inferior)
    const soundButton = this.add.zone(400, 340, 64, 64)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        console.log("Sonido activado/desactivado");
      });

    // Opcional: añadir bordes visibles para depurar
    // this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(playButton.getBounds());
  }
}
