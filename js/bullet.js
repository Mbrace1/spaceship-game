
class Bullets {
    static count = 0
    constructor (game, bulletSpeed) {
        Bullets.count++
        this.game = game
        this.intitalBullets = 5
        this.bulletSpeed = bulletSpeed
        this.activeBullets = []
        this.storedBullets = []
        for( var i = 0; i < this.intitalBullets; i++ ) {
			this.createBullet();
		}

    }

    fire(x,y, rotation, spaceShip) {
        if( this.storedBullets.length === 0 ) {
			this.createBullet();
		}
        // console.log(x)
        // console.log(rotation)
        // console.log(spaceShip)
		var bullet = this.storedBullets.pop();
		bullet.tint = spaceShip.tint;
		bullet.position.x = x;
		bullet.position.y = y;
		bullet.rotation = rotation;
		bullet.source = spaceShip;
		this.activeBullets.push(bullet);
    }

    update(spaceShips) {
        for (let i = 0; i < this.activeBullets.length; i++) {
            let bullet = this.activeBullets[i]
            bullet.position.x += Math.sin( bullet.rotation )  * this.bulletSpeed;
            bullet.position.y -= Math.cos( bullet.rotation )  * this.bulletSpeed;
            if (				
                bullet.position.x < 0 ||
                bullet.position.x > app.renderer.width ||
                bullet.position.y < 0 ||
                bullet.position.y > app.renderer.height) {
                    this.recycleBullet(bullet, i);
            } else {
                for(let j = 0; j < spaceShips.length; j++ ) {
					if(spaceShips[j] === bullet.source ) {
						continue;
					}
					if(spaceShips[j].checkHit( bullet.position ) ) {
						this.recycleBullet( bullet, i );
						continue;
					}
				}
            }
        }
    }

    recycleBullet(bullet, i) {
		bullet.position.x = -50;
		bullet.position.y = -50;
		bullet.rotation = 0;
		bullet.source = null;
		this.activeBullets.splice( i, 1 );
		this.storedBullets.push( bullet );
	}

    createBullet() {
        let bullet = new PIXI.Sprite.from('/img/bullet.png');
        bullet.anchor.set(0.5)
		bullet.position.x = -50;
		bullet.position.y = -50;
		bullet.anchor.x = 0.5;
		bullet.anchor.y = 0.5;
		bullet.rotation = 0;
		this.storedBullets.push(bullet);
        this.game.stage.addChild(bullet)
    }
}