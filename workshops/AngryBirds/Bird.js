import config from '/workshops/AngryBirds/config.js';

import Base from '/workshops/AngryBirds/Base.js';

class Bird extends Base {

  static BIRDS_COLLISION_DAMAGE = 0.05;
  static BOX_COLLISION_DAMAGE = 0.02;
  static WALLS_COLLISION_DAMAGE = 0.02;

  constructor({ x, y, r, m, img, world, collision, life = 300, type = 'red' } = {}) {
    super({ life, canCollide: false });
    this.body = Matter.Bodies.circle(
      x, y, r, {
      restitution: 0.5,
      collisionFilter: {
        category: collision
      }
    });
    Matter.Body.setMass(this.body, m);
    Matter.World.add(world, this.body);
    this.img = img;

    this.initial_life = life;
    this.type = type;

    this.world = world;
  }

  show(sk, boundaries) {

    Bird.drawBird(
      sk, this.body.position.x, this.body.position.y,
      this.body.circleRadius, this.body.angle,
      this.img, this.life, this.initial_life, boundaries
    );
  }

  static drawBird(sk, x, y, r, a, img, l, fl, boundaries) {

    const should_not_show = x - r < boundaries.left ||
      x + r > boundaries.right ||
      y - r < boundaries.top ||
      y + r > boundaries.bottom;

    if (should_not_show) return;

    sk.push();
    sk.translate(x, y);
    sk.rotate(a);
    sk.fill(255);
    sk.imageMode(sk.CENTER);
    sk.image(img, 0, 0, 2 * r, 2 * r);
    sk.pop();

    // Draw life bar
    if (l && fl) {
      sk.push();
      sk.noStroke();
      sk.translate(x, y);
      sk.fill(255, 0, 0);
      sk.rectMode(sk.CENTER);
      sk.rect(0, -r - 10, 2 * r, 5);
      sk.fill(0, 255, 0);
      sk.rect(0, -r - 10, 2 * r * l / fl, 5);
      sk.pop();
    }


  }
}

export default Bird;