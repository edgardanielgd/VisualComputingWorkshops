import Individual from '/workshops/FlocksAndShoal/Individual.js';
import Predator from '/workshops/FlocksAndShoal/Predator.js';
import Attractor from '/workshops/FlocksAndShoal/Attractor.js';
import p5 from '/lib/p5.js';
import config from '/workshops/FlocksAndShoal/config.js';

class Environment {
  constructor({
    offsetX = 0, offsetY = 0,
    initialUnits = 100,
    dimX = 800, dimY = 1000,
    individualSize = 10,
    backgroundImg = null,
    individualImg = null,
    predatorImg = null
  } = {}) {
    this.offset = new p5.Vector(offsetX, offsetY);
    this.initialUnits = initialUnits;
    this.dims = new p5.Vector(dimX, dimY);
    this.backgroundImg = backgroundImg;
    
    this.individualImg = individualImg;
    this.individualSize = individualSize;
    this.predatorImg = predatorImg;
    
    this.flocks = {};
    this.attractors = [];
    this.predators = {};

    // Object attached to mouse
    this.carriedObject = null;
    
    this.generatePoblation();

    this.boundaries = {
      left : offsetX, right : offsetX + dimX,
      top : offsetY, bottom : offsetY + dimY
    }

    this.updatable = true;
  }

  restart() {
    this.carriedObject = null;

    this.flocks = {};
    this.attractors = [];
    this.predators = {};

    this.generatePoblation();
  }

  generatePoblation(sk) {
    this.flocks = {};
    for(let i = 0; i < this.initialUnits; i ++ ){

      // Generate random start positions
      const randX = Math.random() * ( this.dims.x ) + this.offset.x;
      const randY = Math.random() * ( this.dims.y ) + this.offset.y;

      // Generate random start velocities
      const velMag = Math.random() * 1;
      const velRot = Math.random() * 360;

      const boid = new Individual({
        x : randX,
        y : randY, 
        velMag : velMag,
        velRot : velRot,
        img : this.individualImg, 
        size : this.individualSize
      });
      
      this.flocks[boid.identifier] = boid;
    }
  }

  draw(sk) {
    // Draw background 
    sk.image(
      this.backgroundImg,
      this.offset.x, this.offset.y, this.dims.x, this.dims.y,
      0, 0, this.backgroundImg.width, this.backgroundImg.height,
    );

    // Now draw attractors
    for(const unit of this.attractors){
      unit.draw(sk, this.boundaries);
    }

    // Draw attached object, if any
    if( this.carriedObject ){

      // Draw a small circle around the target
      this.carriedObject.draw(sk, this.boundaries);
    }

    for(const unit of Object.values(this.flocks)){
      unit.draw(sk, this.boundaries);
    }

    for(const unit of Object.values(this.predators)){
      unit.draw(sk, this.boundaries);
    }
  }

  update() {
    if(!this.updatable) return;
    
    for(const unit of Object.values(this.flocks)){
      unit.update(
        this.flocks, 
        this.carriedObject ? [ ...this.attractors, this.carriedObject ] : this.attractors,
        this.boundaries,
        this.predators
      );
    }

    for(const unit of Object.values(this.predators)){
      unit.update(
        this.flocks,
        // Boid deletion function
        (id) => {
          delete this.flocks[id];
        }
      );
    }
  }

  addAttractor( attractor ) {
    this.attractors.push( attractor );
  }

  onMouseMoved( x, y ){
    if( this.carriedObject ) {
      this.carriedObject.position = new p5.Vector(x,y);
    }
  }

  onMouseClicked( x, y ){

    if( this.carriedObject ){
      this.attractors.push(this.carriedObject);
      this.carriedObject = null;
    } else {
      // Place a predator instead

      // Generate random start velocities
      const velMag = Math.random() * 1;
      const velRot = Math.random() * 360;
      
      const predator = new Predator({
        x : x, y : y,
        img : this.predatorImg,
        velMag, velRot,
        size : 30
      });

      this.predators[predator.identifier] = predator;
    }
  }

  onKeyPressed( sk ){
    
    if(sk.keyCode == sk.ESCAPE) this.carriedObject = null;
    
    switch( sk.key ) {

      case 'a':
        // Add a new attractor
        this.carriedObject = new Attractor({
          color: config.ATTRACTOR_IN_COLOR,
          size: config.ATTRACTOR_SIZE,
          x: sk.mouseX, y: sk.mouseY,
          gravity: config.ATTRACTOR_GRAVITY
        });
        break;

      case 'r':
        // Add a new repeller
        this.carriedObject = new Attractor({
          color: config.ATTRACTOR_OUT_COLOR,
          size: config.ATTRACTOR_SIZE,
          x: sk.mouseX, y: sk.mouseY,
          gravity: - config.ATTRACTOR_GRAVITY
        });
        break;
    }
  }
}

export default Environment;