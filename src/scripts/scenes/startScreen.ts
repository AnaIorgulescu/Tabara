import 'phaser';
import Level1 from './level1';

export default class StartScreen extends Phaser.Scene {
    preload() {
        this.load.image('title', 'assets/startscreen/Title.png');
        this.load.image('title', 'assets/startscreen/Title-glow.png');
        this.load.image('title1', 'assets/startscreen/level1.png');
        this.load.image('title10', 'assets/startscreen/level1-glow.png');
        this.load.image('startscreen-forest', 'assets/startscreen-forest.jpg');
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        let startscreen = this.add.image(screenCenterX, screenCenterY, 'startscreen-forest');
        startscreen.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#ba5e18');
        let title = this.add.image(screenCenterX, 150, 'title');
        // title.setOrigin(0, 0);
        let level1 = this.add.sprite(screenCenterX, 300, 'title1').setInteractive();
        // level1.setOrigin(0, 0);


        level1.on(Phaser.Input.Events.POINTER_OVER, () => {
            level1.setTexture('title10');
        });
        level1.on(Phaser.Input.Events.POINTER_OUT, () => {
            level1.setTexture('title1');
        });
        level1.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start('level1');
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
        this.cameras.main.fadeIn();
    }
}
