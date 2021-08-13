import Rogue from '../objects/rogue';

export default class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level2' });
    }

    preload() {
        this.load.image('rogue-hero', 'assets/rogue/rogue.png');
        this.load.spritesheet('rogue-idle-sprite', 'assets/rogue/idle.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('rogue-walk-sprite', 'assets/rogue/walk.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('rogue-jump-sprite', 'assets/rogue/jump.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('rogue-double-jump-sprite', 'assets/rogue/double-jump.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('rogue-death-sprite', 'assets/rogue/death.png', { frameWidth: 171, frameHeight: 128 });

        this.load.tilemapTiledJSON('level2-tilemap', 'assets/level2.json');
        this.load.image('tileset-details', 'assets/tiles/level2-details.png');
        this.load.spritesheet('tileset-tiles', 'assets/tiles/level2-tiles.png', { frameWidth: 32, frameHeight: 32 });

        this.load.image('lvl1-background4', 'assets/wallpapers/dark-forest/background4.png');
        this.load.image('lvl1-background3', 'assets/wallpapers/dark-forest/background3.png');
        this.load.image('lvl1-background2', 'assets/wallpapers/dark-forest/background2.png');
        this.load.image('lvl1-background1', 'assets/wallpapers/dark-forest/background1.png');
    }

    create() {
        this.anims.create({
            key: 'rogue-idle-anim',
            frames: [{ frame: 0, key: 'rogue-hero', duration: 5000 }, ...this.anims.generateFrameNumbers('rogue-idle-sprite', {})],
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
        this.anims.create({
            key: 'rogue-death-anim',
            frames: this.anims.generateFrameNumbers('rogue-death-sprite', {}),
            frameRate: 10,
            repeat: 0
        });
        let map = this.make.tilemap({ key: 'level2-tilemap' });

        let background4 = map.addTilesetImage('wallpaper4', 'lvl1-background4');
        let background3 = map.addTilesetImage('wallpaper3', 'lvl1-background3');
        let background2 = map.addTilesetImage('wallpaper2', 'lvl1-background2');
        let background1 = map.addTilesetImage('wallpaper1', 'lvl1-background1');

        let battlegroundLayer1 = map.createLayer('wallpaper1', background1);
        battlegroundLayer1.setScrollFactor(0.0, 1);
        let battlegroundLayer2 = map.createLayer('wallpaper2', background2);
        battlegroundLayer2.setScrollFactor(0.2, 1);
        let battlegroundLayer3 = map.createLayer('wallpaper3', background3);
        battlegroundLayer3.setScrollFactor(0.4, 1);
        let battlegroundLayer4 = map.createLayer('wallpaper4', background4);
        battlegroundLayer4.setScrollFactor(0.6, 1);

        let details = map.addTilesetImage('details', 'tileset-details');
        let tiles = map.addTilesetImage('tiles', 'tileset-tiles');

        let backgroundLayer = map.createLayer('background', [details, tiles]);

        let hero = new Rogue(this, 153, 913);
        let groundLayer = map.createLayer('ground', [details, tiles]);

        this.physics.add.collider(hero, groundLayer);
        groundLayer.setCollisionBetween(details.firstgid, details.firstgid + details.total, true);
        groundLayer.setCollisionBetween(tiles.firstgid, tiles.firstgid + tiles.total, true);

        let objects = map.getObjectLayer('objects').objects;
        let spikeGroup = this.physics.add.group({ immovable: true, allowGravity: false });
        for (let object of objects) {
            if (object.type == 'spike') {
                let spike: Phaser.GameObjects.Sprite = spikeGroup.create(object.x, object.y, 'tileset-tiles', (object.gid || 0) - tiles.firstgid);
                spike.setOrigin(0, 1);
                (spike.body as Phaser.Physics.Arcade.Body).setSize(22, 22);
                (spike.body as Phaser.Physics.Arcade.Body).setOffset(5, 10);
            }
        }
        this.physics.add.overlap(hero, spikeGroup, hero.kill, undefined, hero);

        let foregroundLayer = map.createLayer('foreground', [details, tiles]);

        this.cameras.main.startFollow(hero);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, false, true);
    }

    update() {}
}
