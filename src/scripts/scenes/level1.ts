import Mage from '../objects/mage'

export default class Level1 extends Phaser.Scene {

  constructor() {
    super({ key: 'level1' })
  }

  preload() {
    this.load.image('mage-hero', 'assets/mage/mage.png')
    this.load.spritesheet('mage-idle-sprite', 'assets/mage/idle.png', { frameWidth: 171, frameHeight: 128 })
    this.load.spritesheet('mage-walk-sprite', 'assets/mage/walk.png', { frameWidth: 171, frameHeight: 128 })
    this.load.spritesheet('mage-jump-sprite', 'assets/mage/jump.png', { frameWidth: 171, frameHeight: 128 })
    this.load.spritesheet('mage-double-jump-sprite', 'assets/mage/double-jump.png', { frameWidth: 171, frameHeight: 128 })

  }
  create() {
    this.anims.create({
      key: 'mage-idle-anim',
      frames: [{ frame: 0, key: 'mage-hero', duration: 5000 }, 
      ...this.anims.generateFrameNumbers('mage-idle-sprite', {})],
      frameRate: 6,
      repeat: -1
    })
    this.anims.create({
      key: 'mage-walk-anim',
      frames: this.anims.generateFrameNumbers('mage-walk-sprite', {}),
      frameRate: 6,
      repeat: -1
    })
    this.anims.create({
      key: 'mage-jump-anim',
      frames: this.anims.generateFrameNumbers('mage-jump-sprite', {}),
      frameRate: 10,
      repeat: 0
    })
    this.anims.create({
      key: 'mage-double-jump-anim',
      frames: this.anims.generateFrameNumbers('mage-double-jump-sprite', {}),
      frameRate: 20,
      repeat: 0
    })

    let hero = new Mage(this, 100, 100)
    this.cameras.main.fadeIn()
  }

  update() {}
}
