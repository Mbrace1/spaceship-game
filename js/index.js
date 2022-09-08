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
const loader = PIXI.Loader.shared;
loader.add("tileset", "./spritesheet.json").load(setup)
const textures = []
console.log(textures)

function setup (loader, resources) {
    for(let i = 3; i < 5 ;i++) {
        const texture = PIXI.Texture.from(`flame${i}.png`)
        textures.push(texture)
    }
}

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
    // console.log(lastTime)
    // add interval between firing
    if (keys[" "] && lastTime > timebulletFired + fireInterval) {
        let bullet = createBullet()
        bullets.push(bullet)
        timebulletFired = lastTime
    }
}

function createBullet() {
    let bullet = new PIXI.Sprite.from('/img/bullet.png');
    bullet.anchor.set(0.5)
    bullet.x = player1.container.position.x 
    bullet.y = player1.container.position.y
    bullet.speed = bulletSpeed
    bullet.rotation = player1.body.rotation
    app.stage.addChild(bullet)

    return bullet
}

function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].position.x += Math.sin( bullets[i].rotation )  * bullets[i].speed;
        bullets[i].position.y -= Math.cos( bullets[i].rotation )  * bullets[i].speed;
        
        if (				
            bullets[i].position.x < 0 ||
            bullets[i].position.x > app.renderer.width ||
            bullets[i].position.y < 0 ||
            bullets[i].position.y > app.renderer.height) {
                app.stage.removeChild(bullets[i])
                bullets.splice(i,1)
        }
    }
    
}

// keyboard arrows
let keys = []
const speed = 4;
let bullets = []
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
    updateBullets()
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

const player1 = new Spaceship(app, 80, 80, "Player1", 0x00FF00)
const player2 = new Spaceship(app, 100, 100, "Player2", 0x00FF00)
gameLoop(lastTime)


// to do
// add second player
// second player controls
// collision detect when hit
// health bar, name, ammo etc
// player menu
// obstacles which move
// change to classes