
class Spaceship {
    static count = 0;
    constructor(game, x, y, name, tint, bullets) {
        Spaceship.count++
        this.game = game;
        this.name = name;   
        this.speed = 5;
        this.tint = tint
        this.health = 100;
        this.healthbarWidth = 50;
        this.bulletManager = bullets
        this.isDestroyed = false
        this.hitDuration = 60
        this.hitHighlightStart = null
        // spaceship container
		this.container = new PIXI.Container();
		this.container.position.x = x;
		this.container.position.y = y;
        this.container.rotation = 0;

        // text
		this.textStyle = { font : 'Arial',fontSize: '12px', fill: this.tint, align : 'center' };
		this.text = new PIXI.Text( name, this.textStyle );
		this.text.anchor.x = 0.5;
		this.text.anchor.y = -2.5;
		this.container.addChild( this.text );

        // healthbar
        this.healthbar = new PIXI.Container();

        // represents empty health
        this.healthbarOuter = new PIXI.Graphics();
        this.healthbarOuter.beginFill(0x0000);
        this.healthbarOuter.lineStyle(2, this.tint);
        this.healthbarOuter.drawRect(-25, 55, this.healthbarWidth, 5);
        
        // represents full health, will decrease
        this.healthbarInner = new PIXI.Graphics();
        this.healthbarInner.beginFill(0xff0000);
        this.healthbarInner.drawRect(-25, 55, this.healthbarWidth, 5);

        this.healthbar.addChild(this.healthbarOuter);
        this.healthbar.addChild(this.healthbarInner);
        this.container.addChild(this.healthbar);

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

        // explosion will be added to stage once spaceship destroyed
        const explosionTextures = []
        for(let i = 1; i < 25 ;i++) {
            const texture = PIXI.Texture.from(`./img/explosion/explosion_frame_${i}.png`)
            explosionTextures.push(texture)
        }
        this.explosion = new PIXI.AnimatedSprite(explosionTextures)
		this.explosion.anchor.x = 0.5;
		this.explosion.anchor.y = 0.5;
		this.explosion.loop = false;

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
            this.healthbarWidth = ((this.healthbarWidth *2) -1)/2
            this.body.tint = 0xFF0000;
            this.hitHighlightStart = performance.now();
            this.healthbar.removeChild(this.healthbarInner);
            this.healthbarInner = new PIXI.Graphics();
            this.healthbarInner.beginFill(0xff0000);
            this.healthbarInner.drawRect(-25, 55, this.healthbarWidth, 5);
            this.healthbar.addChild(this.healthbarInner);
            if (this.health <= 0) {
                // remove ship
                this.isDestroyed = true;
                this.game.stage.addChild( this.explosion );
                this.explosion.position.x = this.container.position.x;
                this.explosion.position.y = this.container.position.y;
                this.explosion.play();
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

    update(lastTime) {
        if (this.hitHighlightStart && lastTime > this.hitHighlightStart + this.hitDuration) {
            this.body.tint = this.tint;
            this.hitHighlightStart = null
        }
    }
}