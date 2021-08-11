import 'phaser'

export default class Mage extends Phaser.GameObjects.Sprite {

    rightKey: Phaser.Input.Keyboard.Key;
    leftKey: Phaser.Input.Keyboard.Key;
    
    heroState:String;
    animState:String;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'mage');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    (this.body as Phaser.Physics.Arcade.Body).setSize(30, 54);
    (this.body as Phaser.Physics.Arcade.Body).setOffset(70, 57);

    this.anims.play('mage-idle-anim');
    this.heroState = 'idle';
    this.animState = 'idle';
    this.rightKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);      
    this.leftKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);                                
                
    (this.body as Phaser.Physics.Arcade.Body).setDragX(2000);
  }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);
        if (this.rightKey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(200,400);
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(500);
            this.heroState = 'walk';
            this.setFlipX(false);
        } 
      
        if (this.leftKey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(200,400);
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(-500);
            this.heroState = 'walk';
            this.setFlipX(true);
        }
        if (this.leftKey.isUp && this.rightKey.isUp){
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(0);
            this.heroState = 'idle';
        }

        if(this.heroState == 'idle' && this.animState != 'idle'){
            this.anims.play('knight-idle-anim');
            this.animState = 'idle';
        }
        if(this.heroState == 'walk' && this.animState != 'walk'){
            this.anims.play('knight-walk-anim');
            this.animState = 'walk';
        }
    }
}
