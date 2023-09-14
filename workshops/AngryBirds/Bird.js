import config from '/workshops/AngryBirds/config.js';

class Bird {
  constructor(x, y, r, m, img, world, collision) {
    this.body = Matter.Bodies.circle(
      x, y, r, {
      restitution: 0.5,
      collisionFilter: {
        category: collision
      }
    }
    );
    Matter.Body.setMass(this.body, m);
    Matter.World.add(world, this.body);
    this.img = img;
  }

  show(sk) {
    sk.push();
    sk.translate(this.body.position.x, this.body.position.y);
    sk.rotate(this.body.angle);
    sk.fill(255);
    //ellipse(0, 0, 2*this.body.circleRadius, 2*this.body.circleRadius);
    sk.imageMode(sk.CENTER);
    sk.image(this.img, 0, 0, 2 * this.body.circleRadius, 2 * this.body.circleRadius);
    sk.pop();
  }

}

export default Bird;