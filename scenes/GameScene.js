export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("platform", "public/assets/platform.png");
    this.load.spritesheet("player", "public/assets/pixil-frame-0.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("caer", "public/assets/caer.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("background", "public/assets/fondo.png");
    this.load.spritesheet("digits", "public/assets/nums.png", {
      frameWidth: 40,
      frameHeight: 50,
    });
    this.load.image("letterM", "public/assets/m.png");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "background")
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.gameOptions = {
      platformStartSpeed: 350,
      platformSizeRange: [50, 100],
      playerGravity: 900,
      jumpForce: 400,
      playerStartPosition: 200,
      jumps: 2,
      spawnRange: [100, 150]
    };

    this.platformGroup = this.add.group({
      removeCallback: (platform) => {
        platform.scene.platformPool.add(platform);
      }
    });

    this.platformPool = this.add.group({
      removeCallback: (platform) => {
        platform.scene.platformGroup.add(platform);
      }
    });

    this.playerJumps = 0;
    this.platformSpawnDistance = 0;

    this.addPlatform(this.scale.width, this.scale.width / 2);

    this.anims.create({
      key: "fallFast",
      frames: this.anims.generateFrameNumbers("caer", { start: 0, end: 3 }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.player = this.physics.add.sprite(
      this.gameOptions.playerStartPosition,
      this.scale.height / 2,
      "player"
    ).setScale(2);

    this.player.setGravityY(this.gameOptions.playerGravity);
    this.player.play("walk");

    this.physics.add.collider(this.player, this.platformGroup);

    this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.on("pointerdown", this.jump, this);

    this.metros = 0;
    this.digitSprites = this.add.group();

    this.isGameOver = false;
  }

  drawMetersCounter(distancia) {
    this.digitSprites.clear(true, true);
    const distanciaStr = Math.floor(distancia).toString();
    const digitWidth = 40;
    const spacing = 2;
    const scale = 0.7;
    const startX = 16;
    const startY = 16;

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
      this.digitSprites.add(digitSprite);
    }

    const mSprite = this.add.image(
      startX + distanciaStr.length * (digitWidth * scale + spacing),
      startY + 0,
      "letterM"
    );
    mSprite.setScale(scale);
    mSprite.setOrigin(0, 0);
    this.digitSprites.add(mSprite);
  }

  addPlatform(platformWidth, posX) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, this.scale.height * 0.8, "platform");
      platform.setImmovable(true);
      platform.setVelocityX(this.gameOptions.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    platform.refreshBody();
  }

  jump() {
    const onGround = this.player.body.blocked.down || this.player.body.touching.down;

    if (onGround || (this.playerJumps > 0 && this.playerJumps < this.gameOptions.jumps)) {
      if (onGround) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(this.gameOptions.jumpForce * -1);
      this.playerJumps++;
    }
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.pauseKey) && !this.isGameOver) {
      this.scene.pause();
    }

    this.background.tilePositionX += 1;

    if (this.player.y > this.scale.height) {
      this.registry.set("score", Math.floor(this.metros));
      this.isGameOver = true;
      this.physics.pause();
      this.player.setTint(0xff0000);

      this.time.delayedCall(500, () => {
        this.scene.start("GameOverScene", { score: this.metros });
      });

      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.jump();
    }

    if (this.keyC.isDown && !this.isGameOver) {
      this.player.setVelocityY(600);
      if (this.player.anims.currentAnim?.key !== "fallFast") {
        this.player.play("fallFast", true);
      }
    } else {
      const onGround = this.player.body.blocked.down || this.player.body.touching.down;
      if (onGround && this.player.anims.currentAnim?.key !== "walk") {
        this.player.play("walk", true);
      }
    }

    this.player.x = this.gameOptions.playerStartPosition;

    this.platformGroup.getChildren().forEach((platform) => {
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    });

    this.platformSpawnDistance += this.gameOptions.platformStartSpeed * this.game.loop.delta / 1000;

    const nextDistance = Phaser.Math.Between(
      this.gameOptions.spawnRange[0],
      this.gameOptions.spawnRange[1]
    );

    if (this.platformSpawnDistance >= nextDistance) {
      const nextWidth = Phaser.Math.Between(
        this.gameOptions.platformSizeRange[0],
        this.gameOptions.platformSizeRange[1]
      );
      this.addPlatform(nextWidth, this.scale.width + nextWidth / 2);
      this.platformSpawnDistance = 0;
    }

    this.metros += this.gameOptions.platformStartSpeed * this.game.loop.delta / 1000 / 100;
    this.drawMetersCounter(this.metros);
  }
}
