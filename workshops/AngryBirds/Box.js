import config from '/workshops/AngryBirds/config.js';

import Base from '/workshops/AngryBirds/Base.js';

class Box extends Base {

  static BIRDS_COLLISION_DAMAGE = 0.5;
  static BOX_COLLISION_DAMAGE = 0.002;
  static WALLS_COLLISION_DAMAGE = 0.2;

  constructor({ x, y, w, h, img, color = [0, 0, 0], life = 300, mass = 100, world, options = {} } = {}) {
    super();
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
    this.initial_life = life;
    this.life = life;

    if (!options.isStatic)
      Matter.Body.setMass(this.body, mass);
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
      sk.rectMode(sk.CENTER);
      sk.stroke(0);
      sk.strokeWeight(2);
      sk.rect(0, 0, this.w, this.h);
      sk.image(this.img, 0, 0, this.w, this.h);
    } else {
      sk.fill(this.color[0], this.color[1], this.color[2]);
      sk.noStroke();
      sk.rectMode(sk.CENTER);
      sk.rect(0, 0, this.w, this.h);
    }

    sk.pop();

    // Draw life bar (Static boxes don't have life)
    if (this.body.isStatic) return;

    sk.push();
    sk.noStroke();
    sk.translate(this.body.position.x, this.body.position.y);
    sk.fill(255, 0, 0);
    sk.rectMode(sk.CENTER);
    sk.rect(0, -this.h / 2 + 10, this.w * 3 / 4, 5);
    sk.fill(0, 255, 0);
    sk.rect(0, -this.h / 2 + 10, this.w * (3 / 4) * this.life / this.initial_life, 5);
    sk.pop();
  }
}

export default Box;