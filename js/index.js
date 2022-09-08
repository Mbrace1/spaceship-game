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
const bulletSpeed = 8;
const fireInterval = 200
let timebulletFired = 0
// this time tracks the game throughout
let lastTime = 0


function gameLoop(currentTime) {
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

const bulletManager = new Bullets(app, bulletSpeed);

player1 = new Spaceship(app, 80, 80, "Player1", 0x00FF00, bulletManager),
player2 = new Spaceship(app, 100, 100, "Player2", 0xFFAAFF, bulletManager)

gameLoop(lastTime)


// to do
// collision detect when hit
// health bar, name, ammo etc
// player menu
// obstacles which move
// change to classes