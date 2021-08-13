import { GameObjects } from 'phaser';
import Knight from '../objects/knight';

export default class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'level3' });
    }

    preload() {
        this.load.image('knight-hero', 'assets/knight/knight.png');
        this.load.spritesheet('knight-idle-sprite', 'assets/knight/idle.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('knight-walk-sprite', 'assets/knight/walk.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('knight-jump-sprite', 'assets/knight/jump.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('knight-double-jump-sprite', 'assets/knight/double-jump.png', { frameWidth: 171, frameHeight: 128 });
        this.load.spritesheet('knight-death-sprite', 'assets/knight/death.png', { frameWidth: 171, frameHeight: 128 });

        this.load.tilemapTiledJSON('level3-tilemap', 'assets/level3.json');
        this.load.spritesheet('tileset-bush', 'assets/tiles/level3-bush.png', {frameWidth:32, frameHeight:32});
        this.load.image('tileset-trees', 'assets/tiles/level3-trees.png');
        this.load.image('tileset-tiles', 'assets/tiles/level3-tiles.png');

        this.load.image('lvl1-background4', 'assets/wallpapers/snowy-forest/background4.png');
        this.load.image('lvl1-background3', 'assets/wallpapers/snowy-forest/background3.png');
        this.load.image('lvl1-background2', 'assets/wallpapers/snowy-forest/background2.png');
        this.load.image('lvl1-background1', 'assets/wallpapers/snowy-forest/background1.png');
    }
    create() {
        this.anims.create({
            key: 'knight-idle-anim',
            frames: [{ frame: 0, key: 'knight-hero', duration: 5000 }, ...this.anims.generateFrameNumbers('knight-idle-sprite', {})],
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
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'knight-double-jump-anim',
            frames: this.anims.generateFrameNumbers('knight-double-jump-sprite', {}),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: 'knight-death-anim',
            frames: this.anims.generateFrameNumbers('knight-death-sprite', {}),
            frameRate: 10,
            repeat: 0
        });

        let map = this.make.tilemap({ key: 'level3-tilemap' });

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

        let trees = map.addTilesetImage('trees', 'tileset-trees');
        let bush = map.addTilesetImage('bush', 'tileset-bush');
        let tiles = map.addTilesetImage('tiles', 'tileset-tiles');

        let backgroundLayer = map.createLayer('background', [trees, bush, tiles]);

        let hero = new Knight(this, 20, 849);
        let groundLayer = map.createLayer('ground', [trees, bush, tiles]);

        this.physics.add.collider(hero, groundLayer);
        groundLayer.setCollisionBetween(trees.firstgid, trees.firstgid + trees.total, true);
        groundLayer.setCollisionBetween(bush.firstgid, bush.firstgid + bush.total, true);
        groundLayer.setCollisionBetween(tiles.firstgid, tiles.firstgid + tiles.total, true);

        let objects = map.getObjectLayer('objects').objects;
        let spikeGroup=this.physics.add.group({immovable:true,allowGravity:false});
        for(let object of objects) {
            if(object.type=='spike'){
                let spike: Phaser.GameObjects.Sprite= spikeGroup.create(object.x, object.y, 'tileset-bush', (object.gid||0) - bush.firstgid);
                spike.setOrigin(0, 1);
                (spike.body as Phaser.Physics.Arcade.Body).setSize(22, 22);
                (spike.body as Phaser.Physics.Arcade.Body).setOffset(5, 10);

            }
        }   
        this.physics.add.overlap(hero,spikeGroup,hero.kill, undefined, hero)
        
        let foregroundLayer = map.createLayer('foreground', [trees, bush, tiles]);

        this.cameras.main.startFollow(hero);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, false, true);
    }

    update() {}
}
