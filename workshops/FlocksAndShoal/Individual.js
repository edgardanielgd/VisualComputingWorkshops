import p5 from '/lib/p5.js';
import config from '/workshops/FlocksAndShoal/config.js';

class Individual {
  constructor({
    x = 0, y = 0,
    velMag = 0, velRot = 0,
    img = null, 
    size = 10
  } = {}) {
    this.position = new p5.Vector(x,y);
    this.velocity = new p5.Vector(1,1);
    this.acceleration = new p5.Vector(0,0);

    this.velocity.setHeading( velRot );
    this.velocity.setMag( velMag );
    
    this.img = img;
    this.size = size;

    // To differentiate from other individuals
    this.identifier = crypto.randomUUID();
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
    sk.rotate(this.velocity.heading() + sk.PI/2);
    sk.imageMode(sk.CENTER);
    sk.image( 
      this.img, 0, 0,
      this.size, this.size
    );
    sk.pop();
  }

  update(community, attractors, boundaries, predators) {

    const separationVector = new p5.Vector(0,0);
    let separationBoidsCount = 0;
    
    const alignmentVector = new p5.Vector(0,0);
    let alignmentBoidsCount = 0;

    const cohesionVector = new p5.Vector(0,0);
    let cohesionBoidsCount = 0;

    const neighborsMassCenter = new p5.Vector(0,0);
    let centeringBoidsCount = 0;

    const attractorsVector = new p5.Vector(0,0);

    // Check if we are near window boundaries
    const turningVector = new p5.Vector(0,0);
    
    for(const boid of Object.values(community)){
       
        const distance = boid.position.dist(this.position);
        
        if( distance == 0.0 ) continue;
        
        // Default vector comes from external boid to me
        const boidVector = p5.Vector.sub(
         this.position, boid.position
        );
      
        if( distance <= config.SEPARATION_DISTANCE) {
          // Boid will try to separate from these neighbors
          const separationVectorI = boidVector.copy();
          separationVectorI.mult(
            distance == 0 ? Math.MAX_VALUE : 1 / distance
          );
          separationVector.add(separationVectorI);
          separationBoidsCount++;
         
       } else if( distance <= config.GROUPING_DISTANCE ){
          // Boid will try to align with other boids
          const cohesionVectorI = boidVector.copy();
          cohesionVectorI.mult(
            distance == 0 ? Math.MAX_VALUE : 1 / distance
          );
          cohesionVector.add(cohesionVectorI);
          cohesionBoidsCount++;

          // Summarize neighbors to center later
          neighborsMassCenter.add(boid.position);
          centeringBoidsCount++;

          // Average close neighbors velocities
          const alignmentVectorI = boid.velocity.copy();
          alignmentVectorI.normalize();
          
          alignmentVector.add(alignmentVectorI);
          alignmentBoidsCount++;
       }
    }

    // Normalize separation vector
    separationVector.mult(
      separationBoidsCount == 0 ?
        0 : 1 / separationBoidsCount
    );
    separationVector.normalize();
    separationVector.mult(config.SEPARATION_FACTOR);

    // Normalize alignment vector
    alignmentVector.mult(
      alignmentBoidsCount == 0 ?
        0 : - 1 / alignmentBoidsCount
    );
    alignmentVector.normalize();
    alignmentVector.mult(config.GROUPING_FACTOR);
    
    // Normalize cohesion vector
    cohesionVector.mult(
      (cohesionBoidsCount != 0) ? 
        -1 / cohesionBoidsCount : 0
    );
    cohesionVector.normalize();
    cohesionVector.mult(config.COHESION_FACTOR);

    // Summarize group's center point
    neighborsMassCenter.mult(
      centeringBoidsCount != 0 ?
        1 / cohesionBoidsCount : 0
    );
    
    const centeringVector = p5.Vector.sub(
      neighborsMassCenter, this.position
    );
    centeringVector.normalize();
    centeringVector.mult(config.CENTERING_FACTOR);

    if(this.position.x < boundaries.left + config.TURNING_PREVIEW)
      turningVector.x = config.TURNING_FACTOR;
    if(this.position.x > boundaries.right - config.TURNING_PREVIEW) 
      turningVector.x = - config.TURNING_FACTOR;
    if(this.position.y < boundaries.top + config.TURNING_PREVIEW) 
      turningVector.y = config.TURNING_FACTOR;
    if(this.position.y > boundaries.bottom - config.TURNING_PREVIEW) 
      turningVector.y = - config.TURNING_FACTOR;

    // Go through each attractor and get force vectors
    for(const attractor of attractors){
      const forceVector = attractor.getForce(this);
      attractorsVector.add( forceVector );
    }

    // Go through each predator and calculate evasion vector
    const predEvasionVector = new p5.Vector(0,0);
    for(const predator of Object.values(predators)){
      const distance = this.position.dist(predator.position);
      if( distance < config.PREDATION_EVASION_RANGE ){
        const evasionVector = p5.Vector.sub(this.position, predator.position);
        evasionVector.mult( distance == 0 ? Math.MAX_VALUE : 1 / distance );
        predEvasionVector.add(evasionVector);
      }
    }
    predEvasionVector.normalize();
    predEvasionVector.mult(config.PREDATION_AVOID);

    // Finally update velocity (Actually its acceleration)
    const changeVector = new p5.Vector(0,0);

    changeVector.add( separationVector );
    changeVector.add( alignmentVector );
    changeVector.add( cohesionVector );
    changeVector.add( attractorsVector );
    changeVector.add( turningVector );
    changeVector.add( predEvasionVector );

    this.velocity.add( changeVector );
    
    // Limit velocity to given boundaries
    const velocityMag = this.velocity.mag();
    this.velocity.normalize();
     this.velocity.mult( 
      velocityMag > config.MAX_SPEED ? 
        config.MAX_SPEED : velocityMag 
    );
    
    this.position.add(this.velocity);
  }

  onMouse(x,y,offset) {
    
  }
}

export default Individual;