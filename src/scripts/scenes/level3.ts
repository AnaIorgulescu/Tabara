import Knight from '../objects/knight'

export default class Level1 extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'level1' })
  }

  preload() {
    this.load.image('knight-hero', 'assets/knight/knight.png')
    this.load.spritesheet('knight-idle-sprite', 'assets/knight/idle.png', { frameWidth: 171, frameHeight: 121 })
  }
  create() {
    this.anims.create({
      key: 'knight-idle-anim',
      frames: [{ frame: 0, key: 'knight-hero', duration: 5000 }, 
      ...this.anims.generateFrameNumbers('knight-idle-sprite', {})],
      frameRate: 6,
      repeat: -1
    })

    let hero = new Knight(this, 10, 10)
    this.cameras.main.fadeIn()
  }

  update() {}
}
