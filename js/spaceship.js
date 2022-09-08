
class Spaceship {
    constructor(game, x, y, name, tint, bullets) {
        this.game = game;
        this.name = name;   
        this.speed = 4;
        this.tint = tint
        this.health = 100;
        this.bulletManager = bullets
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
		this.body.tint = this.tint;
        this.container.addChild(this.body);

        // add flame sprite
        const textures = []
        for(let i = 3; i < 5 ;i++) {
            const texture = PIXI.Texture.from(`./img/flame${i}.png`)
            textures.push(texture)
        }
        this.flame = new PIXI.AnimatedSprite(textures)
        this.flame.scale.set(.07,.07)
        this.flame.anchor.x = 0.5
        this.flame.anchor.y = this.body.anchor.y + 1.2
        this.flame.rotation = 3.142
        this.flame.tint = this.tint
        this.flame.animationSpeed = 0.02
        this.flame.play()
        // add to stage
        this.game.stage.addChild(this.container);
    }

    // methods
    checkHit(bulletPos) {
        // if bullet within body of sprite
        // takewaway health
        // call destroyed if no health 
        if (this.body.containsPoint(bulletPos)) {
            this.health--
            console.log("ship hit")
            if (this.health <= 0) {
                console.log("spaceship destroyed")
                // remove ship
                // log player win in main game loop
            }
        }
    }

    shoot() {
        this.bulletManager.fire(
            this.container.position.x,
            this.container.position.y,
            this.body.rotation, this)
    }
    
    movement(direction) {
        if (direction === "right") {
            this.body.rotation += 0.1
            this.flame.rotation += 0.1
        }
        if (direction === "left") {
            this.body.rotation -= 0.1
            this.flame.rotation -= 0.1
        }
        if (direction === "forward") {
            this.container.position.x += Math.sin( this.body.rotation )  * this.speed;
            this.container.position.y -= Math.cos( this.body.rotation )  * this.speed;
            this.container.addChild(this.flame);
        }
    }
    // destroyed
        // show explosion
        // remove ship from game
}