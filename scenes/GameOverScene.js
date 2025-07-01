export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  preload() {
    this.load.image("gameover", "public/assets/gameover.png");
    this.load.spritesheet("digits", "public/assets/nums.png", {
      frameWidth: 40,
      frameHeight: 50,
    });
  }

  create(data) {
    
    this.add.image(0, 0, "gameover").setOrigin(0, 0).setDisplaySize(800, 400);

    const distancia = Math.floor(data.score);
    const distanciaStr = distancia.toString();

    const digitWidth = 40;
    const digitHeight = 50;
    const scale = 1; 
    const spacing = 2; 

    const startX = 520; 
    const startY = 190; 

    for (let i = 0; i < distanciaStr.length; i++) {
      const digit = parseInt(distanciaStr[i]);
      const digitSprite = this.add.image(
        startX + i * (digitWidth * scale + spacing),
        startY,
        "digits",
        digit
      );
      digitSprite.setScale(scale); 
      digitSprite.setOrigin(0, 0); 
    }

    // Tecla para reiniciar
    this.input.keyboard.on("keydown-R", () => {
      this.scene.start("GameScene");
    });
  }
}
