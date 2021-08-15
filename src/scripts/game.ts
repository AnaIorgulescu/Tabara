import 'phaser';
import Level1 from './scenes/level1';
import Level2 from './scenes/level2';
import Level3 from './scenes/level3';
import StartScreen from './scenes/startScreen';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#03fcdb',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    render: {
        pixelArt: true
    },
    scene: [StartScreen, Level1, Level2, Level3],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false,
            debugShowVelocity: true,
            debugShowBody: true,
            debugShowStaticBody: true
        }
    }
};

window.addEventListener('load', () => {
    const game = new Phaser.Game(config);
});
