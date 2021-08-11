import 'phaser'

export default class Knight extends Phaser.GameObjects.Sprite { 

    rightKey:Phaser.Input.Keyboard.Key;
   leftKey:Phaser.Input.Keyboard.Key;
   heroState: String;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'knight');
        scene.add.existing(this);
        scene.physics.add.existing(this);
    
        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
    
        (this.body as Phaser.Physics.Arcade.Body).setSize(30, 54);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(70, 57);

        (this.body as Phaser.Physics.Arcade.Body).setDragX(2000);
    
        this.anims.play('knight-idle-anim');
        this.heroState = 'idle';
        this.rightKey= scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
      this.leftKey= scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

      }
    
      preUpdate(time:number , delta:number) {
        super.preUpdate(time, delta);
         if(this.rightKey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(400,400);
             (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(1000);
             this.heroState = 'walk';
         }
         if(this.leftKey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(400,400);
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(-1000);
            this.heroState = 'walk';
        }
        if(this.rightKey.isUp && this.leftKey.isUp ) {
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(0);
            this.heroState = 'idle';
        }
      }
}