import buildCommonButton from '/utils/CommonButton.js';
import buildTitle from '/utils/Title.js';
import buildCredits from '/utils/Credits.js'
import buildInfo from '/utils/ProgramInfo.js';
import buildInput from '/utils/Input.js';
import buildBackButton from '/utils/BackButton.js';
import Environment from '/workshops/FlocksAndShoal/Environment.js';
import Attractor from '/workshops/FlocksAndShoal/Attractor.js';
import p5 from '/lib/p5.js';

// Config can be changed from here
import config from '/workshops/FlocksAndShoal/config.js';

const width = 1200;
const height = 900;

// Width of buttons column
const buttonsColumnWidth = width * 0.30;

// Set default game keys
let s = (sk) => {

  // Initialize main game
  const environment = new Environment({
    offsetX: buttonsColumnWidth + 50,
    offsetY: 0,
    initialUnits: 200,
    individualImg: sk.loadImage("images/boid.png"),
    predatorImg: sk.loadImage("images/eagle.png"),
    backgroundImg: sk.loadImage("images/skyBackground.jpeg"),
    dimX: width - buttonsColumnWidth,
    dimY: height,
    individualSize: 20
  });

  sk.setup = () => {

    const canvas = sk.createCanvas(
      width, height
    );

    canvas.position(0, 0);
    sk.background(255);

    // Draw buttons panel
    sk.fill(0);
    sk.rect(0, 0, buttonsColumnWidth, height);

    const title = buildTitle(
      sk, "Floaks and Shoal",
      5, 75, buttonsColumnWidth - 10, 80
    );

    // Draw required buttons
    const backButton = buildBackButton(
      sk, 10, 2
    );

    const startButton = buildCommonButton(
      sk, 'Start', 90, 140, "danger"
    );

    const pauseButton = buildCommonButton(
      sk, 'Pause', 190, 140, "danger"
    );

    const restartButton = buildCommonButton(
      sk, 'Restart', 140, 210, "danger"
    );

    sk.fill(255);
    sk.textSize(16);

    // First inputs row
    sk.text("Frame Rate", 30, 290);

    const framerateInput = buildInput(
      sk, 20, 300, buttonsColumnWidth / 2 - 40, 30,
      '60'
    );

    sk.text("Separation Distance", buttonsColumnWidth / 2, 290);

    const separationDistanceInput = buildInput(
      sk, buttonsColumnWidth / 2, 300,
      buttonsColumnWidth / 2 - 40, 30,
      config.SEPARATION_DISTANCE.toString()
    );

    // Second inputs row
    sk.text("Separation Factor", 30, 350);

    const separationFactorInput = buildInput(
      sk, 20, 360, buttonsColumnWidth / 2 - 40, 30,
      config.SEPARATION_FACTOR.toString()
    );

    sk.text("Grouping Distance", buttonsColumnWidth / 2, 350);

    const groupingDistanceInput = buildInput(
      sk, buttonsColumnWidth / 2, 360,
      buttonsColumnWidth / 2 - 40, 30,
      config.GROUPING_DISTANCE.toString()
    );

    // Third inputs row
    sk.text("Grouping Factor", 30, 410);

    const groupingFactorInput = buildInput(
      sk, 20, 420, buttonsColumnWidth / 2 - 40, 30,
      config.GROUPING_FACTOR.toString()
    );

    sk.text("Centering Factor", buttonsColumnWidth / 2, 410);

    const centeringFactorInput = buildInput(
      sk, buttonsColumnWidth / 2, 420,
      buttonsColumnWidth / 2 - 40, 30,
      config.CENTERING_FACTOR.toString()
    );

    // Fourth inputs row
    sk.text("Cruising vel. Factor", 30, 470);

    const cruisingVelFactor = buildInput(
      sk, 20, 480, buttonsColumnWidth / 2 - 40, 30,
      config.COHESION_FACTOR.toString()
    );

    sk.text("Turning Factor", buttonsColumnWidth / 2, 470);

    const turningFactorInput = buildInput(
      sk, buttonsColumnWidth / 2, 480,
      buttonsColumnWidth / 2 - 40, 30,
      config.TURNING_FACTOR.toString()
    );

    // Fifth inputs row
    sk.text("Turning Preview", 30, 530);

    const turningPreviewInput = buildInput(
      sk, 20, 540, buttonsColumnWidth / 2 - 40, 30,
      config.TURNING_PREVIEW.toString()
    );

    sk.text("Max Speed", buttonsColumnWidth / 2, 530);

    const maxSpeedInput = buildInput(
      sk, buttonsColumnWidth / 2, 540,
      buttonsColumnWidth / 2 - 40, 30,
      config.MAX_SPEED.toString()
    );

    // Sixth inputs row
    sk.text("Force Att. Range", 30, 590);

    const forceAttractionRangeInput = buildInput(
      sk, 20, 600, buttonsColumnWidth / 2 - 40, 30,
      config.FORCE_ATTRACTION_RANGE.toString()
    );

    sk.text("Attractor Gravity", buttonsColumnWidth / 2, 590);

    const attractorGravityInput = buildInput(
      sk, buttonsColumnWidth / 2, 600, 
      buttonsColumnWidth / 2 - 40, 30,
      config.ATTRACTOR_GRAVITY.toString()
    );

    sk.text(
      "Click: Add Predator\tA: Add attractor\nR: Add Repulsor\t(Click to make permanent)", 10, 650,
      buttonsColumnWidth - 40, 90
    );

    const credits = buildCredits(
      sk, 5, 700, buttonsColumnWidth - 10, 500
    );

    pauseButton.mouseClicked(() => {
      environment.updatable = false;
    })
    
    startButton.mouseClicked(() => {
      environment.updatable = true;
    })

    restartButton.mouseClicked(() => {
      environment.restart();
    })

    // Link inputs 
    framerateInput.input(
      () => {
        const value = framerateInput.value();
        sk.frameRate(
          value ? parseInt(value) : 0
        )
      }
    );

    separationDistanceInput.input(
      () => {
        const value = separationDistanceInput.value();
        config.SEPARATION_DISTANCE = (
          value ? parseInt(value) : 0
        )
      }
    );

    separationFactorInput.input(
      () => {
        const value = separationFactorInput.value();
        config.SEPARATION_FACTOR = (
          value ? parseInt(value) : 0
        )
      }
    );

    groupingDistanceInput.input(
      () => {
        const value = groupingDistanceInput.value();
        config.GROUPING_DISTANCE = (
          value ? parseInt(value) : 0
        )
      }
    );

    groupingFactorInput.input(
      () => {
        const value = groupingFactorInput.value();
        config.GROUPING_FACTOR = (
          value ? parseInt(value) : 0
        )
      }
    );

    centeringFactorInput.input(
      () => {
        const value = centeringFactorInput.value();
        config.CENTERING_FACTOR = (
          value ? parseInt(value) : 0
        )
      }
    );

    cruisingVelFactor.input(
      () => {
        const value = cruisingVelFactor.value();
        config.CRUISER_VELOCITY_FACTOR = (
          value ? parseInt(value) : 0
        )
      }
    );

    turningFactorInput.input(
      () => {
        const value = turningFactorInput.value();
        config.TURNING_FACTOR = (
          value ? parseInt(value) : 0
        )
      }
    );

    turningPreviewInput.input(
      () => {
        const value = turningPreviewInput.value();
        config.TURNING_PREVIEW = (
          value ? parseInt(value) : 0
        )
      }
    );

    maxSpeedInput.input(
      () => {
        const value = maxSpeedInput.value();
        config.MAX_SPEED = (
          value ? parseInt(value) : 0
        )
      }
    );

    forceAttractionRangeInput.input(
      () => {
        const value = forceAttractionRangeInput.value();
        config.FORCE_ATTRACTION_RANGE = (
          value ? parseInt(value) : 0
        )
      }
    );

    attractorGravityInput.input(
      () => {
        const value = attractorGravityInput.value();
        config.ATTRACTOR_GRAVITY = (
          value ? parseInt(value) : 0
        )
      }
    );


    sk.frameRate(60);

  }

  sk.draw = () => {
    // Make future drawings not overlap drawn buttons box
    environment.draw(sk);
    environment.update();
  }

  sk.keyPressed = () => {
    environment.onKeyPressed(sk);
  }

  sk.mouseClicked = () => {
    environment.onMouseClicked(sk.mouseX, sk.mouseY);
  }

  sk.mouseMoved = () => {
    environment.onMouseMoved(sk.mouseX, sk.mouseY);
  }
}

const P5 = new p5(s, "main-container");