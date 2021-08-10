import 'phaser'
export default class StartScreen extends Phaser.Scene {
    preload(){
        this.load.image('title', 'assets/startscreen/title.png');
        this.load.image('title1', 'assets/startscreen/level1.png');
        this.load.image('title10', 'assets/startscreen/level1-glow.png');
        this.load.image('title2', 'assets/startscreen/level2.png');
        this.load.image('title20', 'assets/startscreen/level2-glow.png');
        this.load.image('title3', 'assets/startscreen/level3.png');
        this.load.image('title30', 'assets/startscreen/level3-glow.png');
    }

    create(){
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#ba5e18');
       let title =  this.add.image (1280/2-758/2, 50, 'title');
       title.setOrigin(0,0);
       let level1 = this.add.sprite(1280/2 - 805/2,200, 'title1').setInteractive();
       level1.setOrigin(0,0);
       let level2 = this.add.sprite(1280/2-495/2,300, 'title2').setInteractive();
       level2.setOrigin(0,0);
       let level3 = this.add.sprite(1280/2-469/2,400, 'title3').setInteractive();
       level3.setOrigin(0,0);

       level1.on(Phaser.Input.Events.POINTER_OVER, () => {
           level1.setTexture('title10');
       });
       level1.on(Phaser.Input.Events.POINTER_OUT, () => {
        level1.setTexture('title1');
    });
    level1.on(Phaser.Input.Events.POINTER_DOWN, () => {
        console.log('start lvl 1');
    });

    level2.on(Phaser.Input.Events.POINTER_OVER, () => {
        level2.setTexture('title20');
    });
    level2.on(Phaser.Input.Events.POINTER_OUT, () => {
     level2.setTexture('title2');
 });
 level2.on(Phaser.Input.Events.POINTER_DOWN, () => {
     console.log('start lvl 2');
 });
 level3.on(Phaser.Input.Events.POINTER_OVER, () => {
    level3.setTexture('title30');
});
level3.on(Phaser.Input.Events.POINTER_OUT, () => {
 level3.setTexture('title3');
});
level3.on(Phaser.Input.Events.POINTER_DOWN, () => {
 console.log('start lvl 3');
});
         // remove the loading screen
        let loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
        loadingScreen.classList.add('transparent');
        this.time.addEvent({
            delay: 1000,
            callback: () => {
            // @ts-ignore
            loadingScreen.remove();
            }
        });
        }
    }

} 