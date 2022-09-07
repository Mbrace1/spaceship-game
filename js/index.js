// const PIXI = require('pixi.js');
// import SpaceShip from './spaceship.js';

const app = new PIXI.Application({
    width: 640,
    height: 360,
    resizeTo: window,
    transparent: true,
});

document.body.appendChild(app.view);

ship1 = PIXI.Sprite.from('/img/spaceship-body.png');
ship1.anchor.set(0.5)
ship1.x = 40
ship1.y = 40
app.stage.addChild(ship1)

function shipMovement(e) {
    // movement
    if (keys["d"]) {
        // ship1.rotation += 0.1
        ship1.rotation += 0.1
        ship1.x += Math.sin( ship1.rotation )  * speed;
        ship1.y -= Math.cos( ship1.rotation )  * speed;
    }
    if (keys["a"]) {
        // ship1.rotation -= 0.1
        ship1.rotation -= 0.1
        ship1.x += Math.sin( ship1.rotation )  * speed;
        ship1.y -= Math.cos( ship1.rotation )  * speed;
    }
    if (keys["w"]) {
        ship1.x += Math.sin( ship1.rotation )  * speed;
        ship1.y -= Math.cos( ship1.rotation )  * speed;
    }
}

// keyboard arrows
let keys = []
let speed = 4;


function gameLoop() {
    shipMovement()

    // adds key code to array on press, allowing for multiple keys being pressed at once
    document.addEventListener("keydown", function(e) {
        keys[e.key] = true
    })
    document.addEventListener("keyup", function(e) {
        keys[e.key] = false
    })

    // instead of ticker loop this is better for performance
    // func given to us by browser api
    requestAnimationFrame(gameLoop);
}


gameLoop()