import buildCommonButton from '/utils/CommonButton.js';
import buildTitle from '/utils/Title.js';
import buildCredits from '/utils/Credits.js'
import buildInfo from '/utils/ProgramInfo.js';
import buildInput from '/utils/Input.js';
import buildBackButton from '/utils/BackButton.js';
import buildComboBox from '/utils/ComboBox.js';
import Board from '/workshops/ConwayGame/Board.js';
import patterns from '/workshops/ConwayGame/patterns.js';
import p5 from '/lib/p5.js';

const width = 1200;
const height = 950;

// Width of buttons column
const buttonsColumnWidth = width * 0.30;

// Initialize main game
const board = new Board(
  {
    cellSize: 20,
    offsetX: buttonsColumnWidth + 40,
    offsetY: 50
  }
);

// Colors are randomly shuffled by the time
const colors = {
  "Black & White" : [0, 255],
  "Color 1" : [[188, 245, 66], [8, 94, 29]],
  "Color 2" : [[166, 86, 30], [68, 242, 228]],
  "Color 3" : [[82, 68, 242], [68, 242, 120]],
};

// Set default game keys
const keysPatterns = {
  'z': patterns.pentaDecathlonPattern,
  'x': patterns.snakePattern,
  'c': patterns.pulsarPattern,
  'v': patterns.crossPattern,
  'b': patterns.blockPattern,
  'w': patterns.lightWeightSpaceshipPattern,
  'h': patterns.beeHivePattern,
  'l': patterns.loafPattern,
  'o': patterns.boatPattern,
  't': patterns.tubPattern,
  'k': patterns.blinkerPattern,
  'a': patterns.toadPattern,
  'e': patterns.beaconPattern,
  'g': patterns.gliderPattern,
  'q': patterns.lightWeightSpaceshipPatternTranslatable,
  'r': patterns.goesperGliderGunPattern,
  // 'm': patterns.svasticasPattern;
}

let s = (sk) => {
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
      sk, "Conway's Game Of Life",
      5, 45, buttonsColumnWidth - 10, 80
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

    const clearButton = buildCommonButton(
      sk, 'Clear', 90, 210, "danger"
    );

    const restartButton = buildCommonButton(
      sk, 'Random', 190, 210, "danger"
    );

    sk.fill(255);
    sk.textSize(16);
    sk.text("Frame Rate", 20, 290);

    const framerateInput = buildInput(
      sk, 20, 300, buttonsColumnWidth / 2 - 40, 30,
      '8'
    );

    sk.text("Alive Ratio", buttonsColumnWidth / 2, 290);

    const aliveRatioInput = buildInput(
      sk, buttonsColumnWidth / 2, 300, buttonsColumnWidth / 2 - 40, 30,
      '0.5'
    );

    // Set values range for alive ratio
    aliveRatioInput.attribute(
      'min', '0'
    );
    aliveRatioInput.attribute(
      'max', '1'
    );

    sk.text("Choose a color", 20, 350);

    const colorsSelection = buildComboBox(
      sk, 20, 360, buttonsColumnWidth - 40, 30,
      colors
    );

    startButton.mouseClicked(
      () => {
        board.updateAllowed = true;
      }
    );

    clearButton.mouseClicked(
      () => {
        board.clear();
      }
    );

    pauseButton.mouseClicked(
      () => {
        board.updateAllowed = false;
      }
    );

    restartButton.mouseClicked(
      () => {
        board.randomizeCells();
      }
    );

    framerateInput.input(
      () => {
        const value = framerateInput.value();
        sk.frameRate(
          value ? parseInt(value) : 0
        )
      }
    );

    aliveRatioInput.input(
      () => {
        const value = aliveRatioInput.value();
        board.setAliveRatio((value && value >= 0) ?
          (value > 1.0 ? 1.0 : value)
          : 0.0
        );

        // Reset input if an invalid value is given
        if(!value || value < 0 || value > 1)
          aliveRatioInput.value(0.5);
      }
    );

    colorsSelection.mouseClicked(
      () => {
        const value = colorsSelection.value();
        if( value && colors[value] ){
          board.setCellsColors(
            colors[value][0],
            colors[value][1]
          )
        }
      }
    );

    const credits = buildCredits(
      sk, 5, 380, buttonsColumnWidth - 10, 500
    );

    const programInfo = buildInfo(
      sk, 5, 610, buttonsColumnWidth - 10, 250,
      'Información:',
      (
        arr => {
          let infoData = "\n";
          for (const key in keysPatterns) {
            infoData += `<li>Tecla ${key} : ${keysPatterns[key].name
              }</li> \n`;
          }
          infoData += `<li>Tecla Esc: Punto </li> \n`
          return infoData;
        }
      )(keysPatterns)
    );

    sk.frameRate(8);
  }

  sk.draw = () => {
    // Make future drawings not overlap drawn buttons box
    board.draw(sk);
    board.update(false);
  }

  sk.keyPressed = () => {
    if (sk.keyCode == sk.ESCAPE) {
      board.setPattern(null);
    }

    if (keysPatterns[sk.key])
      board.setPattern(keysPatterns[sk.key]);
  }

  sk.mouseClicked = () => {
    board.onMouseClick(
      sk.mouseX, sk.mouseY
    );
  }

  sk.mouseMoved = () => {
    // board.onMouseMove(
    //   sk.mouseX, sk.mouseY
    // );
  }
}

const P5 = new p5(s, "main-container");