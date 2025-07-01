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
    // Fondo de pantalla de Game Over
    this.add.image(0, 0, "gameover").setOrigin(0, 0).setDisplaySize(800, 400);

    // Convertir metros a string
    const distancia = Math.floor(data.score);
    const distanciaStr = distancia.toString();

    // Configuración de tamaño y posición
    const digitWidth = 40;
    const digitHeight = 50;
    const scale = 1; // ← Tamaño aumentado
    const spacing = 2; // Espacio entre números

    // Posición ajustada para que estén donde corresponde en tu imagen
    const startX = 520; // Ajustalo si querés mover horizontalmente
    const startY = 190; // Ajustalo si querés mover verticalmente

    // Dibujar cada dígito escalado y en posición
    for (let i = 0; i < distanciaStr.length; i++) {
      const digit = parseInt(distanciaStr[i]);
      const digitSprite = this.add.image(
        startX + i * (digitWidth * scale + spacing),
        startY,
        "digits",
        digit
      );
      digitSprite.setScale(scale); // Escalar los números
      digitSprite.setOrigin(0, 0); // Para posicionarlos correctamente
    }

    // Tecla para reiniciar
    this.input.keyboard.on("keydown-R", () => {
      this.scene.start("GameScene");
    });
  }
}
