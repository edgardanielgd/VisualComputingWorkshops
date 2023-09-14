import p5 from '/lib/p5.js';
import config from '/workshops/AngryBirds/config.js';
import CustomSling from '/workshops/AngryBirds2/CustomSling.js';

const { Engine, World, Mouse, MouseConstraint, Events } = Matter;

const width = 1600;
const height = 600;

let s = (sk) => {

  let engine, world, bird, point, slingshot, cs;
  let mouseConstraint;
  
  sk.setup = () => {
    const canvas = sk.createCanvas(
      width, height
    );

    canvas.position(0, 0);

    engine = Engine.create();
    world = engine.world;

    const div = sk.createElement('div');
    div.size(width,height);
    div.position(0, 0);
    //div.style('z-index', 2)
    // div.style('background-color','red');

    const mouse = Mouse.create(canvas.elt);
    mouse.pixelRatio = sk.pixelDensity();

    const mouseOffset = Matter.Vector.create(200, 0);
    // Mouse.setOffset(mouse, mouseOffset);

    point = Matter.Bodies.circle(
      200, 200, 100, { 
        restitution: 0.5,
        isStatic: true,
        collisionFilter: {
          mask: 0
        }
      }
    );
    
    bird = Matter.Bodies.circle(
      200, 200, 100, { 
        restitution: 0.5,
        isStatic: true,
        collisionFilter: {
          category: config.BIRD_CATEGORY
        }
      }
    );
    Matter.Body.setMass(bird, 10);
    Matter.World.add(world, bird);

    const options = {
      bodyA: point,
      bodyB: bird,
      length: 5,
      stiffness: 0.05,
      collisionFilter: {
        category: config.CATAPULT_CATEGORY
      }
    }
    
    // slingshot = Matter.Constraint.create(options);
  
    // Matter.World.add(world, slingshot);

    Events.on(engine, 'afterUpdate',
      () => {

        
      }
    );
  }

  sk.draw = () => {
    sk.background(128);
    Engine.update(engine);

    sk.push();
    sk.translate(bird.position.x, bird.position.y);
    sk.ellipse(0,0, 100, 10);
    sk.pop();
    
    
  }

  sk.mouseDragged = () => {
    const vector = new p5.Vector(
      point.position.x - sk.mouseX,
      point.position.y - sk.mouseY
    );

    const distance = vector.mag();
    if( distance > 100 ){
      vector.normalize();
      vector.mag(100);
    }

    bird.position.x = point.position.x - vector.x;
    bird.position.y = point.position.y - vector.y;
  }
}

const P5 = new p5(s, "main-container");