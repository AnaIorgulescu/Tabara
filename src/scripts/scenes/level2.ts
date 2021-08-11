import Rogue from '../objects/rogue'

export default class Level2 extends Phaser.Scene {

  constructor() {
    super({ key: 'level2' })
  }

  preload() {
    this.load.image('rogue-hero', 'assets/rogue/rogue.png')
    this.load.spritesheet('rogue-idle-sprite', 'assets/rogue/idle.png', { frameWidth: 171, frameHeight: 128 })
    this.load.spritesheet('rogue-walk-sprite', 'assets/rogue/walk.png', { frameWidth: 171, frameHeight: 128 })
  }
  create() {
    this.anims.create({
      key: 'rogue-idle-anim',
      frames: [{ frame: 0, key: 'rogue-hero', duration: 5000 }, 
      ...this.anims.generateFrameNumbers('rogue-idle-sprite', {})],
      frameRate: 6,
      repeat: -1
    })
    this.anims.create({
      key: 'rogue-walk-anim',
      frames: this.anims.generateFrameNumbers('rogue-walk-sprite', {}),
      frameRate: 6,
      repeat: -1
    })

    let hero = new Rogue(this, 10, 10)
    this.cameras.main.fadeIn()
  }

  update() {}
}
