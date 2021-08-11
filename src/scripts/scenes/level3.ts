export default class Level3 extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    this.load.image('hero', 'assets/hero/mage.png')
    this.load.spritesheet('idle-sprite', 'assets/hero/idle.png', { frameWidth: 171, frameHeight: 121 })
  }

  create() {
    this.anims.create({
      key: 'idle-anim',
      frames: [{ frame: 0, key: 'hero', duration: 5000 }, ...this.anims.generateFrameNumbers('idle-sprite', {})],
      frameRate: 6,
      repeat: -1
    })

    let hero = this.physics.add.sprite(171, 128, 'hero')
    hero.body.setCollideWorldBounds(true)

    hero.body.setSize(30, 54)
    hero.body.setOffset(70, 57)

    hero.anims.play('idle-anim')

    this.cameras.main.fadeIn()
  }

  update() {}
}
