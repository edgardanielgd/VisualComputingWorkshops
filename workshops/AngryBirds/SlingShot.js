import config from '/workshops/AngryBirds/config.js';
import Ground from '/workshops/AngryBirds/Ground.js';

const { World } = Matter;

class SlingShot {
  constructor(body, img, world, max_distance) {
    const options = {
      pointA: {
        x: body.body.position.x,
        y: body.body.position.y
      },
      bodyB: body.body,
      length: 5,
      stiffness: 0.05,
      collisionFilter: {
        category: config.CATAPULT_CATEGORY
      }
    }
    this.sling = Matter.Constraint.create(options);
    this.world = world;
    this.img = img;
    Matter.World.add(world, this.sling);

    // Max distance constraint
    this.max_distance = max_distance;
  }

  show(sk) {
    if (this.sling.bodyB != null) {
      sk.stroke(0);
      sk.strokeWeight(4);
      sk.line(this.sling.pointA.x, this.sling.pointA.y,
        this.sling.bodyB.position.x, this.sling.bodyB.position.y);
      sk.line(this.sling.pointA.x + 20, this.sling.pointA.y,
        this.sling.bodyB.position.x, this.sling.bodyB.position.y);
    }
    if (this.img) {
      sk.imageMode(sk.CENTER);
      sk.image(this.img, 255, 525, 150, 150);
    }
  }

  fly(mConstraint, offsetX, offsetY) {
    if (this.sling.bodyB != null
      && mConstraint.mouse.button === -1
      && (
        Math.abs(this.sling.bodyB.position.x - this.sling.pointA.x) > 10 ||
        Math.abs(this.sling.bodyB.position.y - this.sling.pointA.y) > 10
      )
    ) {

      this.deattach(mConstraint);
    }

  }

  hasBird() {
    return this.sling.bodyB != null;
  }

  attach(bird) {
    this.sling.bodyB = bird.body;
    
    /*bird.collisionFilter = {
      category: config.BIRD_CATEGORY,
      group: -1,
      mask: 0xFFFF & config.CATAPULT_CATEGORY
    };*/
  }

  deattach(mConstraint) {
    this.sling.bodyB.collisionFilter = {
      category: config.BOX_CATEGORY,
      group: -1,
      mask: 0xFFFF & ~config.MOUSE_CATEGORY
    };

    this.sling.bodyB = null;
    mConstraint.constraint.bodyB = null;
    // World.remove( this.world, mConstraint);
  }

  reset() {
    if (this.sling.bodyB) {
      const diffX = this.sling.pointA.x - this.sling.bodyB.position.x;
      const diffY = this.sling.pointA.y - this.sling.bodyB.position.y;

      const distance = Math.sqrt(diffX * diffX + diffY * diffY);

      if (distance >= this.max_distance)
        // Move old object to new position
        return true;

      return false;
    }
  }

  /* onMouseDrag(mouseConstraint) {
    
  }*/

}

export default SlingShot;