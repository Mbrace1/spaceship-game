// const PIXI = require('pixi.js');
// import SpaceShip from './spaceship.js';

const app = new PIXI.Application({
    width: 640,
    height: 360,
    resizeTo: window,
    transparent: true,
});

document.body.appendChild(app.view);

let shipContainer = new PIXI.Container();
shipContainer.x = 40
shipContainer.y = 40
shipContainer.rotation = 0;

let ship1 = PIXI.Sprite.from('/img/spaceship-body.png');
ship1.anchor.x = 0.5
ship1.anchor.y = 0.5
shipContainer.addChild(ship1)

// load img
const loader = PIXI.Loader.shared;

loader.add("tileset", "./spritesheet.json").load(setup)

function setup(loader, resources) {
    const textures = []
    for(let i = 3; i < 5 ;i++) {
        const texture = PIXI.Texture.from(`flame${i}.png`)
        textures.push(texture)
    }
    const flame = new PIXI.AnimatedSprite(textures)
    flame.scale.set(.07,.07)
    flame.anchor.x = 0.5
    flame.anchor.y = ship1.anchor.y + 1.2
    flame.rotation = 3.142
    shipContainer.addChild(flame)
    flame.play()
    flame.animationSpeed = 0.02
}

function shipMovement(e) {
    // movement
    if (keys["d"]) {
        // ship1.rotation += 0.1
        shipContainer.rotation += 0.1
    }
    if (keys["a"]) {
        // ship1.rotation -= 0.1
        shipContainer.rotation -= 0.1
    }
    if (keys["w"]) {
        shipContainer.x += Math.sin( shipContainer.rotation )  * speed;
        shipContainer.y -= Math.cos( shipContainer.rotation )  * speed;
    }
}

function shipShoot() {
    // add interval between firing
    if (keys[" "]) {
        let bullet = createBullet()
        bullets.push(bullet)
        console.log("fire")
    }
}

function createBullet() {
    let bullet = new PIXI.Sprite.from('/img/bullet.png');
    bullet.anchor.set(0.5)
    bullet.x = shipContainer.x
    bullet.y = shipContainer.y
    bullet.speed = bulletSpeed
    bullet.rotation = shipContainer.rotation
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
let speed = 4;
let bullets = []
let bulletSpeed = 8;

function gameLoop() {
    shipMovement()
    shipShoot()
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

app.stage.addChild(shipContainer)
gameLoop()