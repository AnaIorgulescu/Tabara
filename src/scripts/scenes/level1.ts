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
    this.load.spritesheet('mage-double-jump-sprite', 'assets/mage/double-jump.png', { frameWidth: 171, frameHeight: 128 });

    this.load.tilemapTiledJSON('level1-tilemap', 'assets/level1.json');
    this.load.image('tileset-bush', 'assets/tiles/level1-bush.png');
    this.load.image('tileset-rocks', 'assets/tiles/level1-rocks.png');
    this.load.image('tileset-tiles', 'assets/tiles/level1-tiles.png');
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
    let map = this.make.tilemap({key: 'level1-tilemap'});
    let rocks = map.addTilesetImage('rocks', 'tileset-rocks');
    let bush = map.addTilesetImage('bush', 'tileset-bush');
    let tiles = map.addTilesetImage('tiles', 'tileset-tiles');

    let backgroundLayer = map.createLayer('background', [rocks, bush, tiles]);

    let hero = new Mage(this, 100, 100);
    let groundLayer = map.createLayer('ground', [rocks, bush, tiles]);

    this.physics.add.collider(hero, groundLayer);
    groundLayer.setCollisionBetween(rocks.firstgid, rocks.firstgid + rocks.total, true);
    groundLayer.setCollisionBetween(bush.firstgid, bush.firstgid + bush.total, true);
    groundLayer.setCollisionBetween(tiles.firstgid, tiles.firstgid + tiles.total, true);

    let foregroundLayer = map.createLayer('foreground', [rocks, bush, tiles]);
    
    this.cameras.main.startFollow(hero);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBoundsCollision(true, true, false, true);
  }

  update() {}
}
