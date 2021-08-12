import Knight from '../objects/knight'

export default class Level1 extends Phaser.Scene {

  constructor() {
    super({ key: 'level3' })
  }

  preload() {
    this.load.image('knight-hero', 'assets/knight/knight.png')
    this.load.spritesheet('knight-idle-sprite', 'assets/knight/idle.png', { frameWidth: 171, frameHeight: 128 })
    this.load.spritesheet('knight-walk-sprite', 'assets/knight/walk.png', { frameWidth: 171, frameHeight: 128 })
    this.load.spritesheet('knight-jump-sprite', 'assets/knight/jump.png', { frameWidth: 171, frameHeight: 128 })
    this.load.spritesheet('knight-double-jump-sprite', 'assets/knight/double-jump.png', { frameWidth: 171, frameHeight: 128 })
    
    this.load.tilemapTiledJSON('level3-tilemap', 'assets/level3.json');
    this.load.image('tileset-bush', 'assets/tiles/level3-bush.png');
    this.load.image('tileset-trees', 'assets/tiles/level3-trees.png');
    this.load.image('tileset-tiles', 'assets/tiles/level3-tiles.png');
  }
  create() {
    this.anims.create({
      key: 'knight-idle-anim',
      frames: [{ frame: 0, key: 'knight-hero', duration: 5000 }, 
      ...this.anims.generateFrameNumbers('knight-idle-sprite', {})],
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'knight-walk-anim',
      frames: this.anims.generateFrameNumbers('knight-walk-sprite', {}),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'knight-jump-anim',
      frames: this.anims.generateFrameNumbers('knight-jump-sprite', {}),
      frameRate: 20 ,
      repeat: 0
    });


    this.anims.create({
      key: 'knight-double-jump-anim',
      frames: this.anims.generateFrameNumbers('knight-double-jump-sprite', {}),
      frameRate: 20 ,
      repeat: 0
    });


    let map = this.make.tilemap({key: 'level3-tilemap'});
    let trees = map.addTilesetImage('trees', 'tileset-trees');
    let bush = map.addTilesetImage('bush', 'tileset-bush');
    let tiles = map.addTilesetImage('tiles', 'tileset-tiles');

    let backgroundLayer = map.createLayer('background', [trees, bush, tiles]);

    let hero = new Knight(this, 100, 100);
    let groundLayer = map.createLayer('ground', [trees, bush, tiles]);

    this.physics.add.collider(hero, groundLayer);
    groundLayer.setCollisionBetween(trees.firstgid, trees.firstgid + trees.total, true);
    groundLayer.setCollisionBetween(bush.firstgid, bush.firstgid + bush.total, true);
    groundLayer.setCollisionBetween(tiles.firstgid, tiles.firstgid + tiles.total, true);

    let foregroundLayer = map.createLayer('foreground', [trees, bush, tiles]);
    
    this.cameras.main.startFollow(hero);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBoundsCollision(true, true, false, true);
  }

  update() {}
}
