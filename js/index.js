// const PIXI = require('pixi.js');
// import SpaceShip from './spaceship.js';

const app = new PIXI.Application({
    width: 640,
    height: 360,
    resizeTo: window,
    transparent: true,
});

document.body.appendChild(app.view);

// load flame imgs
// app.loader.add("tileset", "./spritesheet.json")

function shipMovement(e) {
    // movement
    if (keys["d"]) {
        player1.movement("right")
    }
    if (keys["a"]) {
        player1.movement("left")
    }
    if (keys["w"]) {
        player1.movement("forward")
    }
    // player2 change keys to arrow
    if (keys["ArrowRight"]) {
        player2.movement("right")
    }
    if (keys["ArrowLeft"]) {
        player2.movement("left")
    }
    if (keys["ArrowUp"]) {
        player2.movement("forward")
    }
}

function shipShoot(lastTime) {
    // add interval between firing
    if (keys[" "] && lastTime > timebulletFired + fireInterval) {
        // console.log("player1 fire")
        player1.shoot()
        timebulletFired = lastTime
    }
    if(keys["k"] && lastTime > timebulletFired + fireInterval) {
        player2.shoot()
        // console.log("player2 fire")
        timebulletFired = lastTime
    }
}


// keyboard arrows
let keys = []
const speed = 4;
const bulletSpeed = 9;
const fireInterval = 200
let timebulletFired = 0
// this time tracks the game throughout
let lastTime = 0


function gameLoop(currentTime) {

    if(player1.isDestroyed) {
        gameOver(player2.name)
        return
    }
    if(player2.isDestroyed) {
        gameOver(player1.name)
        return
    }
    // in case i need to use diff in time
    let deltaTime = currentTime - lastTime
    lastTime = currentTime
    // console.log(deltaTime)
    shipMovement()
    shipShoot(lastTime)
    bulletManager.update([player1,player2])
    player1.update(lastTime)
    player2.update(lastTime)
    // adds key code to array on press, allowing for multiple keys being pressed at once
    document.addEventListener("keydown", function(e) {
        keys[e.key] = true
    })
    document.addEventListener("keyup", function(e) {
        keys[e.key] = false
    })
    // console.log(keys)

    // instead of ticker loop this is better for performance
    // func given to us by browser api
    requestAnimationFrame(gameLoop);
}

const TINTS = [
	0x00FF00,
	0x66FFAA,
	0x00FFFF,
	0xFF00FF,
	0xFFAAFF,
	0xFFFF00,
	0xFF6600
];

function gameOver(player) {
    const textContainer = new PIXI.Container()
    textContainer.x = 50;
    textContainer.y = 100;

    let containerGraphic = new PIXI.Graphics();
    containerGraphic.beginFill(0x00, 0.9);
    containerGraphic.lineStyle(4, 0xFF8000)
    containerGraphic.drawPolygon([100,0,400,0,320,300, 0, 300]);

    const styleWinMessage = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 40,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#ff8000'],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 300,
        lineJoin: 'round',
        textTransform: 'uppercase'
    });

    const stylePlayAgain = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#ff8000'],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
    })

    const winMessage = new PIXI.Text(`${player} WINS THE GAME!`, styleWinMessage);
    winMessage.x = 100;
    winMessage.y = 50;

    const playAgain = new PIXI.Text('PLAY AGAIN?', stylePlayAgain);
    playAgain.x = 100;
    playAgain.y = 200;
    playAgain.interactive = true;
    // Shows hand cursor
    playAgain.buttonMode = true;

    
    textContainer.addChild(containerGraphic)
    textContainer.addChild(winMessage)
    textContainer.addChild(playAgain)
    
    app.stage.addChild(textContainer);
    
    // Pointers normalize touch and mouse
    playAgain.on('pointerdown', replayGame);
    playAgain.on('mouseover', hoverActive);
    playAgain.on('mouseout', hoverNotActive);
    
    function hoverActive(e) {
        this.style.fill = ['#ffffff', '#ff0000']
    }
    function hoverNotActive(e) {
        this.style.fill = ['#ffffff', '#ff8000']
    }
}


function replayGame() {
    app.stage.removeChildren()
    bulletManager = new Bullets(app, bulletSpeed);
    player1 = new Spaceship(app, 200, 200, "Player1", 0x00FF00, bulletManager),
    player2 = new Spaceship(app, app.renderer.width - 200, app.renderer.height - 200, "Player2", 0xFFAAFF, bulletManager)

    lastTime = 0
    gameLoop(lastTime)
}

let bulletManager = new Bullets(app, bulletSpeed);

let player1 = new Spaceship(app, 200, 200, "Player1", 0x00FF00, bulletManager)
let player2 = new Spaceship(app, app.renderer.width - 200, app.renderer.height - 200, "Player2", 0xFFAAFF, bulletManager)

gameLoop(lastTime)
// gameOver(player1.name)


// to do
// health bar, name, ammo etc
// player menu
// obstacles which move
// change to classes