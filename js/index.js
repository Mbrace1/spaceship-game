// const PIXI = require('pixi.js');
// import SpaceShip from './spaceship.js';

const app = new PIXI.Application({ 
    width: 640, 
    height: 360,
    resizeTo: window,
    transparent: true,
});

document.body.appendChild(app.view);

let ship1 = new SpaceShip(app, 40, 40, "ship1")
ship1.checkHit(3)

// let sprite = PIXI.Sprite.from('./img/sample.png');
// app.stage.addChild(sprite);

// let elapsed = 0.0;
// app.ticker.add((delta) => {
//     elapsed += delta;
//     sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
// });