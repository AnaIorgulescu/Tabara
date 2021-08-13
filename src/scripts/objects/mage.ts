import 'phaser';

export default class Mage extends Phaser.GameObjects.Sprite {
    rightKey: Phaser.Input.Keyboard.Key;
    leftKey: Phaser.Input.Keyboard.Key;
    upKey: Phaser.Input.Keyboard.Key;

    heroState: String;
    animState: String;

    initialX: number;
    initialY: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'mage');
        this.initialX = x;
        this.initialY = y;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

        (this.body as Phaser.Physics.Arcade.Body).setSize(30, 54);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(70, 57);
        (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(200, 400);

        this.anims.play('mage-idle-anim');
        this.heroState = 'idle';
        this.animState = 'idle';
        this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        (this.body as Phaser.Physics.Arcade.Body).setDragX(2000);
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        if (this.heroState == 'dead') {
            return;
        }

        //dreapta
        if (this.rightKey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(200, 400);
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(500);
            if ((this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0) {
                this.heroState = 'walk';
            }
            this.setFlipX(false);
        }
        //stanga
        if (this.leftKey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(200, 400);
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(-500);
            if ((this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0) {
                this.heroState = 'walk';
            }
            this.setFlipX(true);
        }
        //idle
        if (this.leftKey.isUp && this.rightKey.isUp && (this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0) {
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(0);
            this.heroState = 'idle';
        }
        //jump
        if ((this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0 && Phaser.Input.Keyboard.JustDown(this.upKey)) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-300);
            this.heroState = 'jump';
        }
        //double-jump
        if (this.heroState == 'jump' && Phaser.Input.Keyboard.JustDown(this.upKey)) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-400);
            this.heroState = 'double-jump';
        }
        if ((this.heroState == 'jump' || this.heroState == 'double-jump') && this.leftKey.isUp && this.rightKey.isUp) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
        }

        if (this.heroState == 'idle' && this.animState != 'idle') {
            this.anims.play('mage-idle-anim');
            this.animState = 'idle';
        }
        if (this.heroState == 'walk' && this.animState != 'walk') {
            this.anims.play('mage-walk-anim');
            this.animState = 'walk';
        }
        if (this.heroState == 'jump' && this.animState != 'jump') {
            this.anims.play('mage-jump-anim');
            this.animState = 'jump';
        }
        if (this.heroState == 'double-jump' && this.animState != 'double-jump') {
            this.anims.play('mage-double-jump-anim');
            this.animState = 'double-jump';
        }
    }

    kill() {
        if (this.heroState != 'dead') {
            this.animState = 'dead';
            this.heroState = 'dead';
            this.anims.play('mage-death-anim');
            (this.body as Phaser.Physics.Arcade.Body).stop();
            this.once(
                Phaser.Animations.Events.ANIMATION_COMPLETE,
                () => {
                    this.setX(this.initialX);
                    this.setY(this.initialY);
                    (this.body as Phaser.Physics.Arcade.Body).updateFromGameObject();
                    this.heroState = 'idle';
                },
                this
            );
        }
    }
}
