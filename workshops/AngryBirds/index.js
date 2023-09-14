import buildCommonButton from '/utils/CommonButton.js';
import buildTitle from '/utils/Title.js';
import buildCredits from '/utils/Credits.js'
import buildBackButton from '/utils/BackButton.js';
import p5 from '/lib/p5.js';

const width = 1600;
const height = 600;

import Bird from '/workshops/AngryBirds/Bird.js';
import Pig from '/workshops/AngryBirds/Pig.js';
import Box from '/workshops/AngryBirds/Box.js';
import Ground from '/workshops/AngryBirds/Ground.js';
import SlingShot from '/workshops/AngryBirds/SlingShot.js';

import config from '/workshops/AngryBirds/config.js';

// Levels
import Level1 from '/workshops/AngryBirds/levels/Level1.js';
import Level2 from '/workshops/AngryBirds/levels/Level2.js';
import Level3 from '/workshops/AngryBirds/levels/Level3.js';

const { Engine, World, Mouse, MouseConstraint, Events } = Matter;
let nbird = 0;
// Width of buttons column
const buttonsColumnWidth = width * 0.20;
let s = (sk) => {
  let background = sk.loadImage('images/sky.png');
  let redImg = sk.loadImage('images/red.png');
  let boxImg = sk.loadImage('images/box.png');
  let catapultImg = sk.loadImage('images/catapult.png');
  let pigImg = sk.loadImage('images/pig.webp');
  sk.preload = () => {
    background = sk.loadImage('images/sky.png');
    redImg = sk.loadImage('images/red.png');
    boxImg = sk.loadImage('images/box.png');
    catapultImg = sk.loadImage('images/catapult.png');
    pigImg = sk.loadImage('images/pig.webp');
  }

  // Levels
  let level = new Level1();
  let { engine, world, birds = [], pigs = [], ground, boxes, walls, slingshot } = level.getObjects(width, height, buttonsColumnWidth, redImg, boxImg, catapultImg, pigImg);
  let mouseConstraint;

  // Cargar un nivel
  function changeLevel(newLevel) {
    // Borra todos los objetos del nivel anterior
    for (const bird of birds) {
      World.remove(world, bird.body);
    }
    for (const pig of pigs) {
      World.remove(world, pig.body);
    }
    for (const box of boxes) {
      World.remove(world, box.body);
    }

    // Cambia el nivel
    level = newLevel;

    // Obtiene los objetos del nuevo nivel
    ({ engine, world, birds, pigs, ground, boxes, walls, slingshot }  = level.getObjects(
      width, height, buttonsColumnWidth, redImg, boxImg, catapultImg, pigImg
    ));

    // Agrega de nuevo el mouse al nivel
    const canvas = sk.createCanvas(
      width, height
    );

    canvas.position(0, 0);

    const div = sk.createElement('div');
    div.size(100, 100);
    div.position(150, 475);
    // div.style('background-color','red');

    const mouse = Mouse.create(canvas.elt);
    mouse.pixelRatio = sk.pixelDensity();

    // Set configuration buttons offset
    const mouseOffset = Matter.Vector.create(-buttonsColumnWidth, 0);
    Mouse.setOffset(mouse, mouseOffset);

    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      collisionFilter: {
        mask: config.BIRD_CATEGORY,
        category: config.MOUSE_CATEGORY
      }
    });
    World.add(world, mouseConstraint);
    Events.on(engine, 'afterUpdate',
      () => {
        slingshot.fly(
          mouseConstraint,
          buttonsColumnWidth + 120, 220
        );
          // Creo que es aquí que se actualiza la resortera con el nuevo pajaro pero se buguea aaa

        
        // Check if sting is too large
        /*if (slingshot.reset()) {
          console.log("aa")
          Matter.World.remove(world, mouseConstraint);
          setTimeout(function() {
            World.add(world, mouseConstraint);
          }, 1000); // 1000 milisegundos (1 segundo)
        }*/
      }
    );
    const drawInterface = () => {
      // Draw buttons panel
      sk.fill(0);
      sk.rect(0, 0, buttonsColumnWidth, height);
      const title = buildTitle(
        sk, "Angry Birds",
        5, 80, buttonsColumnWidth - 10, 80
      );
      const credits = buildCredits(
        sk, 5, 380, buttonsColumnWidth - 10, 500
      );

      // Draw required buttons
      const backButton = buildBackButton(
        sk, 10, 10
      );
      const l1 = buildCommonButton(
        sk, 'level 1', 130, 150, "danger"
      );

      const l2 = buildCommonButton(
        sk, 'level 2', 130, 200, "danger"
      );

      const l3 = buildCommonButton(
        sk, 'level 3', 130, 250, "danger"
      );

      l1.mouseClicked(() => {
        changeLevel(new Level1());
      });

      l2.mouseClicked(() => {
        changeLevel(new Level2());
      });

      l3.mouseClicked(() => {
        changeLevel(new Level3());
      });
    }

    drawInterface();

    sk.translate(30, 0);

  }

  sk.setup = () => {

    changeLevel(new Level1());

  }

  sk.draw = () => {
    sk.push();
    sk.rect(buttonsColumnWidth, 0, width - buttonsColumnWidth, height);

    Engine.update(engine);

    sk.translate(buttonsColumnWidth, 0);
    sk.image(
      background,
      0, 0, 1600, 600,
      0, 0, background.width, background.height,
    );
    slingshot.show(sk);


    ground.show(sk);

    for (const box of boxes) {
      box.show(sk);
    }

    for (const bird of birds) {
      bird.show(sk);
    }
    for (const pig of pigs) {
      pig.show(sk)
    }
    sk.pop();
  }

  sk.keyPressed = () => {
    if (sk.key == ' ') {
      for (const bird of birds) {
        World.remove(world, bird.body);
      }
      for (const pig of pigs) {
        World.remove(world, pig.body);
      }
    }
  }
}

const P5 = new p5(s, "main-container");