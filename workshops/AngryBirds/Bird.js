import config from '/workshops/AngryBirds/config.js';

class Bird {
  constructor({ x, y, r, m, img, world, collision, life = 100, type = 'red' } = {}) {
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
    this.life = life;
    this.world = world;
  }

  show(sk, boundaries) {

    Bird.drawBird(
      sk, this.body.position.x, this.body.position.y,
      this.body.circleRadius, this.body.angle,
      this.img, boundaries);
  }

  static drawBird(sk, x, y, r, a, img, boundaries) {

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
  }

}

export default Bird;