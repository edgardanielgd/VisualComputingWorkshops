import config from '/workshops/AngryBirds/config.js';

class Box {
  constructor(x, y, w, h, img, world, options = {}) {
    this.body = Matter.Bodies.rectangle(
      x, y, w, h, {
        ...options,
        collisionFilter: {
          category: config.BOX_CATEGORY
        }
      }
    );
    this.w = w;
    this.h = h;
    this.img = img;
    if(options.isStatic == true){
       options.isStatic = true;
    }
    Matter.World.add(world, this.body);
  }

  show(sk) {
    sk.push();
    sk.translate(this.body.position.x, this.body.position.y);
    sk.rotate(this.body.angle);
    if (this.img) {
      sk.imageMode(sk.CENTER);
      sk.image(this.img, 0, 0, this.w, this.h);
    } else {
      sk.fill(50, 200, 0);
      sk.noStroke();
      sk.rectMode(sk.CENTER);
      sk.rect(0, 0, this.w, this.h);
    }
    sk.pop();
  }
}

export default Box;