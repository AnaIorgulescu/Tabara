import Mage from '../objects/mage';

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'level1' });
    }

    preload() {
        this.load.image('mage-hero', 'assets/mage/mage.png');
        this.load.spritesheet('mage-idle-sprite', 'assets/mage/idle.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('mage-walk-sprite', 'assets/mage/walk.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('mage-jump-sprite', 'assets/mage/jump.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('mage-double-jump-sprite', 'assets/mage/double-jump.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('mage-death-sprite', 'assets/mage/death.png', { frameWidth: 171, frameHeight: 128 });

        this.load.tilemapTiledJSON('level1-tilemap', 'assets/level1.json');
        this.load.image('tileset-bush', 'assets/tiles/level1-bush.png');
        this.load.image('tileset-rocks', 'assets/tiles/level1-rocks.png');
        this.load.spritesheet('tileset-tiles', 'assets/tiles/level1-tiles.png', { frameWidth: 32, frameHeight: 32 });

        this.load.image('lvl1-background5', 'assets/wallpapers/magic-forest/background5.png');
        this.load.image('lvl1-background4', 'assets/wallpapers/magic-forest/background4.png');
        this.load.image('lvl1-background3', 'assets/wallpapers/magic-forest/background3.png');
        this.load.image('lvl1-background2', 'assets/wallpapers/magic-forest/background2.png');
        this.load.image('lvl1-background1', 'assets/wallpapers/magic-forest/background1.png');
    }
    create() {
        this.anims.create({
            key: 'mage-idle-anim',
            frames: [{ frame: 0, key: 'mage-hero', duration: 5000 }, ...this.anims.generateFrameNumbers('mage-idle-sprite', {})],
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'mage-walk-anim',
            frames: this.anims.generateFrameNumbers('mage-walk-sprite', {}),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'mage-jump-anim',
            frames: this.anims.generateFrameNumbers('mage-jump-sprite', {}),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'mage-double-jump-anim',
            frames: this.anims.generateFrameNumbers('mage-double-jump-sprite', {}),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: 'mage-death-anim',
            frames: this.anims.generateFrameNumbers('mage-death-sprite', {}),
            frameRate: 10,
            repeat: 0
        });
        let map = this.make.tilemap({ key: 'level1-tilemap' });

        let background5 = map.addTilesetImage('wallpaper5', 'lvl1-background5');
        let background4 = map.addTilesetImage('wallpaper4', 'lvl1-background4');
        let background3 = map.addTilesetImage('wallpaper3', 'lvl1-background3');
        let background2 = map.addTilesetImage('wallpaper2', 'lvl1-background2');
        let background1 = map.addTilesetImage('wallpaper1', 'lvl1-background1');

        let battlegroundLayer1 = map.createLayer('wallpaper1', background1);
        battlegroundLayer1.setScrollFactor(0.1, 1);
        let battlegroundLayer2 = map.createLayer('wallpaper2', background2);
        battlegroundLayer2.setScrollFactor(0.3, 1);
        let battlegroundLayer3 = map.createLayer('wallpaper3', background3);
        battlegroundLayer3.setScrollFactor(0.5, 1);
        let battlegroundLayer4 = map.createLayer('wallpaper4', background4);
        battlegroundLayer4.setScrollFactor(0.7, 1);
        let battlegroundLayer5 = map.createLayer('wallpaper5', background5);
        battlegroundLayer5.setScrollFactor(0.9, 1);

        let rocks = map.addTilesetImage('rocks', 'tileset-rocks');
        let bush = map.addTilesetImage('bush', 'tileset-bush');
        let tiles = map.addTilesetImage('tiles', 'tileset-tiles');

        let backgroundLayer = map.createLayer('background', [rocks, bush, tiles]);

        let hero = new Mage(this, 411, 913);
        let groundLayer = map.createLayer('ground', [rocks, bush, tiles]);

        this.physics.add.collider(hero, groundLayer);
        groundLayer.setCollisionBetween(rocks.firstgid, rocks.firstgid + rocks.total, true);
        groundLayer.setCollisionBetween(bush.firstgid, bush.firstgid + bush.total, true);
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
        let foregroundLayer = map.createLayer('foreground', [rocks, bush, tiles]);

        this.cameras.main.startFollow(hero);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, false, true);
    }

    update() {}
}
