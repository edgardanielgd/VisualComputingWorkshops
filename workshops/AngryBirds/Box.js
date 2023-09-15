import config from '/workshops/AngryBirds/config.js';

class Box {
  constructor({ x, y, w, h, img, color = [0, 0, 0], life = 300, world, options = {} } = {}) {
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
    this.color = color;
    this.life = life;

    if (!options.isStatic)
      Matter.Body.setMass(this.body, 100);
    Matter.World.add(world, this.body);
  }

  show(sk, boundaries) {

    const should_not_show = this.body.position.x - this.w / 2 < boundaries.left ||
      this.body.position.x + this.w / 2 > boundaries.right ||
      this.body.position.y - this.h / 2 < boundaries.top ||
      this.body.position.y + this.h / 2 > boundaries.bottom;

    if (should_not_show) return;

    sk.push();
    sk.translate(this.body.position.x, this.body.position.y);
    sk.rotate(this.body.angle);

    if (this.img) {
      sk.imageMode(sk.CENTER);
      sk.image(this.img, 0, 0, this.w, this.h);
    } else {
      sk.fill(this.color[0], this.color[1], this.color[2]);
      sk.noStroke();
      sk.rectMode(sk.CENTER);
      sk.rect(0, 0, this.w, this.h);
    }

    sk.pop();
  }
}

export default Box;