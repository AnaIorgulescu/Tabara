import 'phaser'

export default class Knight extends Phaser.GameObjects.Sprite { 
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'knight');
        scene.add.existing(this);
        scene.physics.add.existing(this);
    
        (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
    
        (this.body as Phaser.Physics.Arcade.Body).setSize(30, 54);
        (this.body as Phaser.Physics.Arcade.Body).setOffset(70, 57);
    
        this.anims.play('knight-idle-anim');
      }
    
      preupdate() {}
}