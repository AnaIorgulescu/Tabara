import 'phaser'

export default class Rogue extends Phaser.GameObjects.Sprite { 

    rightKey:Phaser.Input.Keyboard.Key
    leftkey:Phaser.Input.Keyboard.Key
    herostate: String
    animstate: String

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'rogue');
        scene.add.existing(this);
        scene.physics.add.existing(this);
    
        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
    
        (this.body as Phaser.Physics.Arcade.Body).setSize(30, 54);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(70, 57);
        (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(200,400);
        (this.body as Phaser.Physics.Arcade.Body).setDragX(2000);
    
        this.anims.play('rogue-idle-anim');
        this.herostate= 'idle'
        this.rightKey= scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D) 
        this.leftkey= scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
            
        }
    
      preUpdate(time:number, delta:number) {
          super.preUpdate(time, delta);
        if(this.rightKey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(300);
            this. herostate = 'walk'
            this.setFlipX(false)
        }
        if(this.leftkey.isDown) {
            (this.body as Phaser.Physics.Arcade.Body).setMaxVelocity(300,500);
            (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(-300);
            this.setFlipX(true)
            this.herostate = 'walk'
        }
        if(this.leftkey.isUp && this.rightKey.isUp){
          (this.body as Phaser.Physics.Arcade.Body).setAccelerationX(0)
          this.herostate = 'idle';
        }
        if(this.herostate == 'walk' && this.animstate != 'walk'){
            this.anims.play('rogue-walk-anim');
            this.animstate = 'walk';
        }
        if(this.herostate == 'idle' && this.animstate != 'idle'){
            this.anims.play('rogue-idle-anim');
            this.animstate = 'idle';
        }
      }
}