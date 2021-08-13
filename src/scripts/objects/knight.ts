import 'phaser';

export default class Knight extends Phaser.GameObjects.Sprite {
    rightKey: Phaser.Input.Keyboard.Key;
    leftKey: Phaser.Input.Keyboard.Key;
    upKey: Phaser.Input.Keyboard.Key;
    heroState: String;
    animState: String;
    initialX: number;
    initialY: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'knight');
        this.initialX = x;
        this.initialY = y;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

        (this.body as Phaser.Physics.Arcade.Body).setSize(30, 54);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(70, 57);
        (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(200, 400);

        (this.body as Phaser.Physics.Arcade.Body).setDragX(2000);

        this.anims.play('knight-idle-anim');
        this.heroState = 'idle';
        this.heroState = 'idle';
        this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        if (this.heroState == 'dead') {
            return;
        }

        if (this.rightKey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(200, 400);
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(500);
            if ((this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0) {
                this.heroState = 'walk';
            }
            this.setFlipX(false);
        }

        if (this.leftKey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(200, 400);
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(-500);
            if ((this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0) {
                this.heroState = 'walk';
            }
            this.setFlipX(true);
        }
        if (this.leftKey.isUp && this.rightKey.isUp && (this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0) {
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(0);
            this.heroState = 'idle';
        }
        if ((this.body as Phaser.Physics.Arcade.Body).onFloor() && (this.body as Phaser.Physics.Arcade.Body).velocity.y == 0 && Phaser.Input.Keyboard.JustDown(this.upKey)) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-300);
            this.heroState = 'jump';
        }
        if (this.heroState == 'jump' && Phaser.Input.Keyboard.JustDown(this.upKey)) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-500);
            this.heroState = 'double-jump';
        }
        if ((this.heroState == 'jump' || this.heroState == 'double-jump') && this.leftKey.isUp && this.rightKey.isUp) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
        }

        if (this.heroState == 'idle' && this.animState != 'idle') {
            this.anims.play('knight-idle-anim');
            this.animState = 'idle';
        }
        if (this.heroState == 'walk' && this.animState != 'walk') {
            this.anims.play('knight-walk-anim');
            this.animState = 'walk';
        }
        if (this.heroState == 'jump' && this.animState != 'jump') {
            this.anims.play('knight-jump-anim');
            this.animState = 'jump';
        }
        if (this.heroState == 'double-jump' && this.animState != 'double-jump') {
            this.anims.play('knight-double-jump-anim');
            this.animState = 'double-jump';
        }
    }

    kill() {
        if (this.heroState != 'dead') {
            this.animState = 'dead';
            this.heroState = 'dead';
            this.anims.play('knight-death-anim');
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
