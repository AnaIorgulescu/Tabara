import Mage from '../objects/mage'

export default class Level1 extends Phaser.Scene {

  constructor() {
    super({ key: 'level1' })
  }

  preload() {
    this.load.image('mage-hero', 'assets/mage/mage.png')
    this.load.spritesheet('mage-idle-sprite', 'assets/mage/idle.png', { frameWidth: 171, frameHeight: 121 })
  }
  create() {
    this.anims.create({
      key: 'mage-idle-anim',
      frames: [{ frame: 0, key: 'mage-hero', duration: 5000 }, 
      ...this.anims.generateFrameNumbers('mage-idle-sprite', {})],
      frameRate: 6,
      repeat: -1
    })

    let hero = new Mage(this, 10, 10)
    this.cameras.main.fadeIn()
  }

  update() {}
}
