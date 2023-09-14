//Utils
const { Engine, World, Mouse, MouseConstraint, Events } = Matter;
import config from '/workshops/AngryBirds/config.js';

// Objects
import Bird from '/workshops/AngryBirds/Bird.js';
import Pig from '/workshops/AngryBirds/Pig.js';
import Box from '/workshops/AngryBirds/Box.js';
import Ground from '/workshops/AngryBirds/Ground.js';
import SlingShot from '/workshops/AngryBirds/SlingShot.js';

class Level3 {
  getObjects(width, height, buttonsColumnWidth, redImg, boxImg, catapultImg, pigImg) {
    let engine, world, bird, pig, birds = [], pigs = [], ground, boxes = [], walls = [], slingshot;
    engine = Engine.create();
    world = engine.world;
    // Birds
    bird = new Bird(250, 475, 25, 5, redImg, world, config.BIRD_CATEGORY)
    birds.push(bird);
    bird = new Bird(150, 550, 25, 5, redImg, world, config.CATAPULT_CATEGORY)
    birds.push(bird);
    bird = new Bird(100, 550, 25, 5, redImg, world, config.CATAPULT_CATEGORY)

    birds.push(bird);
    // Pigs
    pig = new Pig(1025, 550, 25, 5, pigImg, world)
    pigs.push(pig);
    pig = new Pig(960, 135, 25, 5, pigImg, world)
    pigs.push(pig);
    pig = new Pig(1100, 135, 25, 5, pigImg, world)
    pigs.push(pig);
    // Other
    slingshot = new SlingShot(birds[0], catapultImg, world, 100);
    ground = new Ground((width - buttonsColumnWidth) / 2, height - 10, width - buttonsColumnWidth, 20, world);
    for (let i = 0; i < 8; i++) {
      const box = new Box(
        (width - buttonsColumnWidth) * 3.0 / 4.0,
        (50 * (i + 1)) + 155, 50, 50, boxImg, world, { isStatic: true }
      );
      boxes.push(box);
    }
    for (let i = 0; i < 8; i++) {
      const box = new Box(
        (width - buttonsColumnWidth + 80) * 3.0 / 4.0 + 75,
        (50 * (i + 1)) + 155, 50, 50, boxImg, world, { isStatic: true });
      boxes.push(box);
    }

    return { engine, world, birds, pigs, ground, boxes, walls, slingshot };
  }
}

export default Level3;