import 'phaser';
import Level1 from './level1';

export default class StartScreen extends Phaser.Scene {
    preload() {
        this.load.image('title', 'assets/startscreen/title.png');
        this.load.image('title1', 'assets/startscreen/level1.png');
        this.load.image('title10', 'assets/startscreen/level1-glow.png');
        this.load.image('title2', 'assets/startscreen/level2.png');
        this.load.image('title20', 'assets/startscreen/level2-glow.png');
        this.load.image('title3', 'assets/startscreen/level3.png');
        this.load.image('title30', 'assets/startscreen/level3-glow.png');
        this.load.image('bg', 'assets/bg.png');
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        let bg = this.add.image(screenCenterX, screenCenterY, 'bg');
        bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#ba5e18');
        let title = this.add.image(screenCenterX, 150, 'title');
        // title.setOrigin(0, 0);
        let level1 = this.add.sprite(screenCenterX, 300, 'title1').setInteractive();
        // level1.setOrigin(0, 0);
        let level2 = this.add.sprite(screenCenterX, 400, 'title2').setInteractive();
        // level2.setOrigin(0, 0);
        let level3 = this.add.sprite(screenCenterX, 500, 'title3').setInteractive();
        // level3.setOrigin(0, 0);

        level1.on(Phaser.Input.Events.POINTER_OVER, () => {
            level1.setTexture('title10');
        });
        level1.on(Phaser.Input.Events.POINTER_OUT, () => {
            level1.setTexture('title1');
        });
        level1.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start('level1');
        });

        level2.on(Phaser.Input.Events.POINTER_OVER, () => {
            level2.setTexture('title20');
        });
        level2.on(Phaser.Input.Events.POINTER_OUT, () => {
            level2.setTexture('title2');
        });
        level2.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start('level2');
        });

        level3.on(Phaser.Input.Events.POINTER_OVER, () => {
            level3.setTexture('title30');
        });
        level3.on(Phaser.Input.Events.POINTER_OUT, () => {
            level3.setTexture('title3');
        });
        level3.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start('level3');
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
