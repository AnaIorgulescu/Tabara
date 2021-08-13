import 'phaser';

export default class Rogue extends Phaser.GameObjects.Sprite {
    rightKey: Phaser.Input.Keyboard.Key;
    leftkey: Phaser.Input.Keyboard.Key;
    upkey: Phaser.Input.Keyboard.Key;

    herostate: String;
    animstate: String;

    initialX: number;
    initialY: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'rogue');

        this.initialX = x;
        this.initialY = y;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

        (this.body as Phaser.Physics.Arcade.Body).setSize(30, 54);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(70, 57);
        (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(200, 400);
        (this.body as Phaser.Physics.Arcade.Body).setDragX(25000);

        this.anims.play('rogue-idle-anim');
        this.herostate = 'idle';
        this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.leftkey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.upkey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        if (this.herostate == 'dead') {
            return;
        }

        if (this.rightKey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(300, 500);
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(300);
            if ((this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0) {
                this.herostate = 'walk';
            }
            this.setFlipX(false);
        }
        if (this.leftkey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(300, 500);
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(-300);
            this.setFlipX(true);
            if ((this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0) {
                this.herostate = 'walk';
            }
        }
        if ((this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0 && Phaser.Input.Keyboard.JustDown(this.upkey)) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-300);
            this.herostate = 'jump';
        }
        if (this.leftkey.isUp && this.rightKey.isUp && (this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0) {
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(0);
            this.herostate = 'idle';
        }
        if (this.herostate == 'jump' && Phaser.Input.Keyboard.JustDown(this.upkey)) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-500);
            this.herostate = 'double-jump';
        }
        if ((this.herostate == 'jump' || this.herostate == 'double-jump') && this.leftkey.isUp && this.rightKey.isUp) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
        }

        if (this.herostate == 'walk' && this.animstate != 'walk') {
            this.anims.play('rogue-walk-anim');
            this.animstate = 'walk';
        }
        if (this.herostate == 'idle' && this.animstate != 'idle') {
            this.anims.play('rogue-idle-anim');
            this.animstate = 'idle';
        }
        if (this.herostate == 'jump' && this.animstate != 'jump') {
            this.anims.play('rogue-jump-anim');
            this.animstate = 'jump';
        }
        if (this.herostate == 'double-jump' && this.animstate != 'double-jump') {
            this.anims.play('rogue-double-jump-anim');
            this.animstate = 'double-jump';
        }
    }

    kill() {
        if (this.herostate != 'dead') {
            this.animstate = 'dead';
            this.herostate = 'dead';
            this.anims.play('rogue-death-anim');
            (this.body as Phaser.Physics.Arcade.Body).stop();
            this.once(
                Phaser.Animations.Events.ANIMATION_COMPLETE,
                () => {
                    this.setX(this.initialX);
                    this.setY(this.initialY);
                    (this.body as Phaser.Physics.Arcade.Body).updateFromGameObject();
                    this.herostate = 'idle';
                },
                this
            );
        }
    }
}
