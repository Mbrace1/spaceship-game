const PIXI = require('pixi.js');

module.exports = class SpaceShip {
    constructor(game, x, y, name) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.name = name;
        console.log()asd
        // spaceship container
		this.container = new PIXI.Container();
		this.container.position.x = x;
		this.container.position.y = y;

        // create sprite
        this.body = PIXI.Sprite.from( '/img/sample.png' );
		// this.body.tint = this.tint;
		this.body.anchor.x = 0.5;
		this.body.anchor.y = 0.5;
        this.container.addChild( this.body );

        // add to stage
        this.game.stage.addChild(this.container);
    }

    // methods
    checkHit(bulletPos) {
        // if bullet within body of sprite
        // takewaway health
        // call destroyed if no health 
        console.log("hit")
    }
    
    // destroyed
        // show explosion
        // remove ship from game
    // position/movement update
        // wasd movement
}