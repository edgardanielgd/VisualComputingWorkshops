import config from '/workshops/AngryBirds/config.js';

const BIRDS_COLLISION_DAMAGE = 0.5;
const BOX_COLLISION_DAMAGE = 0.002;
const WALLS_COLLISION_DAMAGE = 0.2;

const { Vector, Collision } = Matter;

class Pig {
  constructor({ x, y, r, m, img, world, life = 100 } = {}) {
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
    this.life = life;
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
  }

  update(birds, walls, boxes) {

    const calculateDamage = (extBody, factor) => {
      let extMomentum = Vector.mult(extBody.velocity, extBody.mass);
      let selfMomentum = Vector.mult(this.body.velocity, this.body.mass);
      let relativeMomentum = Vector.sub(extMomentum, selfMomentum);

      let magnitude = Vector.magnitude(relativeMomentum) * factor;

      return magnitude;
    };

    for (const bird of birds) {
      if (Matter.SAT.collides(this.body, bird.body).collided) {
        this.life -= calculateDamage(bird.body, BIRDS_COLLISION_DAMAGE);
      }
    }

    for (const wall of walls) {
      if (Matter.SAT.collides(this.body, wall.body).collided) {
        this.life -= WALLS_COLLISION_DAMAGE * Vector.magnitude(this.body.velocity);
      }
    }

    for (const box of boxes) {
      if (Matter.SAT.collides(this.body, box.body).collided) {
        this.life -= calculateDamage(box.body, BOX_COLLISION_DAMAGE);
      }
    }
  }


}

export default Pig;