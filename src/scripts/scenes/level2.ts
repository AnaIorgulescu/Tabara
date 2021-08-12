import Rogue from '../objects/rogue'

export default class Level2 extends Phaser.Scene {

  constructor() {
    super({ key: 'level2' })
  }

  preload() {
    this.load.image('rogue-hero', 'assets/rogue/rogue.png')
    this.load.spritesheet('rogue-idle-sprite', 'assets/rogue/idle.png', { frameWidth: 171, frameHeight: 128 })
    this.load.spritesheet('rogue-walk-sprite', 'assets/rogue/walk.png', { frameWidth: 171, frameHeight: 128 })
    this.load.spritesheet('rogue-jump-sprite', 'assets/rogue/jump.png', { frameWidth: 171, frameHeight: 128 })
    this.load.spritesheet('rogue-double-jump-sprite', 'assets/rogue/double-jump.png', { frameWidth: 171, frameHeight: 128 })
    this.load.tilemapTiledJSON('level2-tilemap', 'assets/level2.json');
    this.load.image('tileset-details', 'assets/tiles/level2-details.png');
    this.load.image('tileset-tiles', 'assets/tiles/level2-tiles.png');
  }
    
  create() {
    
    this.anims.create({
      key: 'rogue-idle-anim',
      frames: [{ frame: 0, key: 'rogue-hero', duration: 5000 }, 
      ...this.anims.generateFrameNumbers('rogue-idle-sprite', {})],
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'rogue-walk-anim',
      frames: this.anims.generateFrameNumbers('rogue-walk-sprite', {}),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'rogue-jump-anim',
      frames: this.anims.generateFrameNumbers('rogue-jump-sprite', {}),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: 'rogue-double-jump-anim',
      frames: this.anims.generateFrameNumbers('rogue-double-jump-sprite', {}),
      frameRate: 20,
      repeat: 0
    });
    let map = this.make.tilemap({key: 'level1-tilemap'});
    let details = map.addTilesetImage('details', 'tileset-details');
    let tiles = map.addTilesetImage('tiles', 'tileset-tiles');

    let backgroundLayer = map.createLayer('background', [details, tiles]);

    let hero = new Rogue(this, 100, 100);
    let groundLayer = map.createLayer('ground', [ details, tiles]);

    this.physics.add.collider(hero, groundLayer);
    groundLayer.setCollisionBetween(details.firstgid, details.firstgid + details.total, true);
    groundLayer.setCollisionBetween(tiles.firstgid, tiles.firstgid + tiles.total, true);

    let foregroundLayer = map.createLayer('foreground', [details, tiles]);
    
    this.cameras.main.startFollow(hero);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBoundsCollision(true, true, false, true);
    
  }

  update() {}
}
