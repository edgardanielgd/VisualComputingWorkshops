import config from '/workshops/AngryBirds/config.js';
import Base from '/workshops/AngryBirds/Base.js';

class Pig extends Base {

  static BIRDS_COLLISION_DAMAGE = 5;
  static BOX_COLLISION_DAMAGE = 0.002;
  static WALLS_COLLISION_DAMAGE = 0.2;

  constructor({ x, y, r, m, img, world, life = 100 } = {}) {
    super({ life });
    this.body = Matter.Bodies.circle(
      x, y, r, {
      restitution: 0.5,
      collisionFilter: {
        category: config.BOX_CATEGORY
      }
    }
    );
    Matter.Body.setMass(this.body, m);
    Matter.World.add(world, this.body);
    this.img = img;
    this.initial_life = life;
  }

  show(sk, boundaries) {

    const should_not_show = this.body.position.x - this.body.circleRadius < boundaries.left ||
      this.body.position.x + this.body.circleRadius > boundaries.right ||
      this.body.position.y - this.body.circleRadius < boundaries.top ||
      this.body.position.y + this.body.circleRadius > boundaries.bottom;

    if (should_not_show) return;

    sk.push();
    sk.translate(this.body.position.x, this.body.position.y);
    sk.rotate(this.body.angle);
    sk.fill(255);
    sk.imageMode(sk.CENTER);
    sk.image(this.img, 0, 0, 2 * this.body.circleRadius, 2 * this.body.circleRadius);
    sk.pop();

    // Draw life bar
    sk.push();
    sk.noStroke();
    sk.translate(this.body.position.x, this.body.position.y);
    sk.fill(255, 0, 0);
    sk.rectMode(sk.CENTER);
    sk.rect(0, -this.body.circleRadius - 10, 2 * this.body.circleRadius, 5);
    sk.fill(0, 255, 0);
    sk.rect(0, -this.body.circleRadius - 10, 2 * this.body.circleRadius * this.life / this.initial_life, 5);
    sk.pop();

  }


}

export default Pig;