const { Vector } = Matter;

class CustomSling {

	constructor(x,y,w,h,k, distance) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.k = k;
    this.body = null;
    this.distance = distance;
	}

	attach( obj ) {
    // obj is a matter.js object
    this.body = obj;
  }

  deattach(){ this.body = null; }

  update() {

    if( ! this.body ) return;
    
    const dx = this.x - this.body.position.x;
    const dy = this.y - this.body.position.y;

    const dist = Math.sqrt( dx*dx + dy*dy );

    if( dist > this.distance ){
      const force = Vector.create(
        this.k * dx,
        this.k * dy
      );
  
      // Actually acceleration
      const velocity = Vector.mult( force, 1 / this.body.mass );
  
      this.body.velocity = velocity;
      this.body = null;  
    }
    
  }

  draw(sk) {
    if( ! this.body ) return;
    sk.push();
    sk.fill(0);
    sk.line(
      this.x, this.y, 
      this.body.position.x, this.body.position.y
    );
    sk.pop();
  }
}

export default CustomSling;