import buildCommonButton from '/utils/CommonButton.js';
import buildTitle from '/utils/Title.js';
import buildCredits from '/utils/Credits.js'
import buildBackButton from '/utils/BackButton.js';
import p5 from '/lib/p5.js';

const width = 1600;
const height = 600;

import Game from '/workshops/AngryBirds/Game.js';

// Levels
import level1 from '/workshops/AngryBirds/levels/level1.js';
import level2 from '/workshops/AngryBirds/levels/level2.js';
import level3 from '/workshops/AngryBirds/levels/level3.js';

const { Engine, World, Mouse, MouseConstraint, Events } = Matter;

// Width of buttons column
const buttonsColumnWidth = width * 0.20;
let s = (sk) => {

  let game = null;

  // Cargar un nivel
  function changeLevel(newLevel) {

    game.initializeLevel(newLevel);
  }

  // Load images and assets
  let background, redImg, blueImg, yellowImg, bombImg,
    boxImg, catapultImg, pigImg, glassImg, rockImg, bigredImg;

  sk.preload = () => {
    background = sk.loadImage('images/sky.png');

    redImg = sk.loadImage('images/red.png');
    blueImg = sk.loadImage('images/blue.webp');
    yellowImg = sk.loadImage('images/yellow.webp');
    bombImg = sk.loadImage('images/bomb.webp');

    boxImg = sk.loadImage('images/wood.png');
    catapultImg = sk.loadImage('images/catapult.png');
    pigImg = sk.loadImage('images/pig.webp');
    glassImg = sk.loadImage('images/glass.avif');
    rockImg = sk.loadImage('images/rock.jpeg');

    bigredImg = sk.loadImage('images/bigred.webp');
  }

  // Draw interface
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
      sk, 'level 1', 30, 150, "danger"
    );

    const l2 = buildCommonButton(
      sk, 'level 2', 110, 150, "danger"
    );

    const l3 = buildCommonButton(
      sk, 'level 3', 190, 150, "danger"
    );

    l1.mouseClicked(() => {
      changeLevel(level1(width - buttonsColumnWidth, height));
    });

    l2.mouseClicked(() => {
      changeLevel(level2(width - buttonsColumnWidth, height));
    });

    l3.mouseClicked(() => {
      changeLevel(level3(width - buttonsColumnWidth, height));
    });
  }

  sk.setup = () => {

    // Create canvas
    const canvas = sk.createCanvas(width, height);
    canvas.parent('main-container');
    canvas.position(0, 0);

    game = new Game({
      sk, canvas,
      width: width - buttonsColumnWidth, height,
      offsetX: buttonsColumnWidth,
      backgroundImg: background,
      boxImg, pigImg, catapultImg, redImg,
      blueImg, yellowImg, bombImg, glassImg,
      rockImg, bigredImg
    });

    changeLevel(level1(width - buttonsColumnWidth, height));
    drawInterface();

  }

  sk.draw = () => {
    game.draw(sk);
  }

  sk.keyPressed = () => {

  }
}

const P5 = new p5(s, "main-container");