import p5 from '/lib/p5.js';

import config from '/workshops/FlocksAndShoal/config.js';

class Attractor {
  constructor({
    color = [255,0,0],
    size = 20,
    x = 0, y = 0,
    gravity = 0
  } = {}) {
    this.color = color;
    this.size = size;
    this.position = new p5.Vector(x,y);
    this.gravity = gravity;
  }
  
  draw(sk, boundaries) {

    const exceedsX = this.position.x - this.size / 2 < boundaries.left || 
      this.position.x + this.size / 2 > boundaries.right;
    const exceedsY = this.position.y - this.size / 2< boundaries.top || 
      this.position.y + this.size / 2> boundaries.bottom;

    if( exceedsX || exceedsY ) return;
    
    sk.fill(
      this.color[0], this.color[1], this.color[2] 
    );
    sk.ellipse(
      this.position.x, 
      this.position.y, 
      this.size, this.size
    );
  }

  getForce( boid ) {
    const distance = boid.position.dist( this.position );

    if( distance > config.FORCE_ATTRACTION_RANGE )
      return new p5.Vector(0,0);
    
    const vector = p5.Vector.sub(
      this.position, boid.position
    );
    vector.mult(distance > 0 ? this.gravity / distance : 0);
    return vector;
  }
}

export default Attractor;