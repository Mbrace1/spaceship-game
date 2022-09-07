
class Spaceship {
    constructor(game, x, y, name) {
        this.game = game;
        this.name = name;   
        this.speed = 4;
        // spaceship container
		this.container = new PIXI.Container();
		this.container.position.x = x;
		this.container.position.y = y;
        this.container.rotation = 0;

        // create sprite
        this.body = PIXI.Sprite.from('/img/spaceship-body.png');
		// this.body.tint = this.tint;
		this.body.anchor.x = 0.5;
		this.body.anchor.y = 0.5;
		this.body.tint = 0x00FF00;
        this.container.addChild(this.body);

        // add to stage
        this.game.stage.addChild(this.container);
    }

    // methods
    checkHit(bulletPos) {
        // if bullet within body of sprite
        // takewaway health
        // call destroyed if no health 
        // console.log("hit")
    }
    
    movement(direction) {
        if (direction === "right") {
            this.body.rotation += 0.1
        }
        if (direction === "left") {
            this.body.rotation -= 0.1
        }
        if (direction === "forward") {
            this.container.position.x += Math.sin( this.body.rotation )  * this.speed;
            this.container.position.y -= Math.cos( this.body.rotation )  * this.speed;
            console.log("move")
        }
    }
    // destroyed
        // show explosion
        // remove ship from game

    update(dx, dy) {
        console.log(this.x)
        console.log(this.y)
        this.x = this.x + dx
        this.y = this.y + dy
    }
    // position/movement update
        // wasd movement
}