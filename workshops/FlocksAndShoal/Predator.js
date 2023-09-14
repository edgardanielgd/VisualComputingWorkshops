import Individual from '/workshops/FlocksAndShoal/Individual.js';
import p5 from '/lib/p5.js';
import config from '/workshops/FlocksAndShoal/config.js';

class Predator extends Individual {
  constructor({
    x = 0, y = 0,
    velMag = 0, velRot = 0,
    img = null, 
    size = 10
  } = {}) {
    super({x,y,velMag,velRot,img,size});
  }

  draw(sk, boundaries) {
    const exceedsX = this.position.x - this.size / 2 < boundaries.left || 
      this.position.x + this.size / 2 > boundaries.right;
    const exceedsY = this.position.y - this.size / 2< boundaries.top || 
      this.position.y + this.size / 2> boundaries.bottom;

    if( exceedsX || exceedsY ) return;

    // A small trick must be done here
    // coords get affected after rotating
    // so its easier to first translate the 
    // roation point to image's center
    sk.push();
    sk.translate(this.position.x, this.position.y);
    sk.rotate(this.velocity.heading() + sk.PI);
    sk.imageMode(sk.CENTER);
    sk.image( 
      this.img, 0, 0,
      this.size, this.size
    );
    sk.pop();
  }
  
  update(community, deletef) {
    
    // Always search for the closest boid
    let closestBoid = null;
    let minDistance = Number.MAX_VALUE;

    for(const boid of Object.values(community)) {
      const distance = boid.position.dist(this.position);

      if( distance < minDistance ){
        minDistance = distance;
        closestBoid = boid;
      }
    }

    if( minDistance < config.EAT_DISTANCE ){
      // Delete boid from group
      deletef( closestBoid.identifier );
      return;
    }

    if( closestBoid ){
      const direction = p5.Vector.sub(closestBoid.position, this.position);
      direction.normalize();
      direction.mult(config.PREDATION_FACTOR );
      this.velocity = direction;
    }

    // Limit velocity to given boundaries
    const velocityMag = this.velocity.mag();
    this.velocity.normalize();
     this.velocity.mult( 
      velocityMag > config.MAX_SPEED / 2 ? 
        config.MAX_SPEED / 2 : velocityMag 
    );
    
    this.position.add(this.velocity);
  }

  onMouse(x,y,offset) {
    
  }
}

export default Predator;