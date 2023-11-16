import p5 from '/lib/p5.js';
import buildBackButton from '/utils/BackButton.js';
import config from '/workshops/TuringModel/config.js';
import buildCommonButton from '/utils/CommonButton.js';

import Labo from '/workshops/TuringModel/Labo.js';

const width = 1300;
const height = 800;

let wolf;
let myTexture;
let lab;

const w = 1080; // Ancho del lienzo
const h = 720; // Alto del lienzo

let s = (sk) => {

  sk.preload = () => {
    wolf = sk.loadModel('/workshops/TuringModel/wolf.obj');
  }

  const drawInterface = () => {

    let creditsText = "Créditos:<br>" +
      "Miguel Angel Puentes Cespedes<br>" +
      "Bryan Smith Colorado Lopez<br>" +
      "Reinaldo Toledo Leguizamon<br>" +
      "Edgar Daniel Gonzalez Diaz";


    let h2 = sk.createElement('h2', 'Reaction-Diffusion Model');
    h2.style('color', 'black');
    h2.style('font-size', '40px');
    h2.style('font-family', 'Georgia, sans-serif');
    h2.position(30, 80);

    /* Input sliders */

    // Diffusion rate of U
    let diffULabel = sk.createElement('p', 'Diff U');
    diffULabel.style('font-size', '20px');
    diffULabel.style('color', 'black');
    diffULabel.position(240, 140);

    let diffUSlider = sk.createSlider(0, 1, config.DIFF_U, 0.01);
    diffUSlider.position(30, 150);
    diffUSlider.style('width', '200px');

    // Diffusion rate of V
    let diffVLabel = sk.createElement('p', 'Diff V');
    diffVLabel.style('font-size', '20px');
    diffVLabel.style('color', 'black');
    diffVLabel.position(240, 190);

    let diffVSlider = sk.createSlider(0, 1, config.DIFF_V, 0.01);
    diffVSlider.position(30, 200);
    diffVSlider.style('width', '200px');

    // Min feed Range
    let minFeedLabel = sk.createElement('p', 'Min Feed Range');
    minFeedLabel.style('font-size', '20px');
    minFeedLabel.style('color', 'black');
    minFeedLabel.position(240, 240);

    let minFeedSlider = sk.createSlider(0, 1, config.MIN_FEED_RANGE, 0.01);
    minFeedSlider.position(30, 250);
    minFeedSlider.style('width', '200px');

    // Max feed Range
    let maxFeedLabel = sk.createElement('p', 'Max Feed Range');
    maxFeedLabel.style('font-size', '20px');
    maxFeedLabel.style('color', 'black');
    maxFeedLabel.position(240, 290);

    let maxFeedSlider = sk.createSlider(0, 1, config.MAX_FEED_RANGE, 0.01);
    maxFeedSlider.position(30, 300);
    maxFeedSlider.style('width', '200px');

    // Min kill Range
    let minKillLabel = sk.createElement('p', 'Min Kill Range');
    minKillLabel.style('font-size', '20px');
    minKillLabel.style('color', 'black');
    minKillLabel.position(240, 340);

    let minKillSlider = sk.createSlider(0, 1, config.MIN_KILL_RANGE, 0.01);
    minKillSlider.position(30, 350);
    minKillSlider.style('width', '200px');

    // Max kill Range
    let maxKillLabel = sk.createElement('p', 'Max Kill Range');
    maxKillLabel.style('font-size', '20px');
    maxKillLabel.style('color', 'black');
    maxKillLabel.position(240, 390);

    let maxKillSlider = sk.createSlider(0, 1, config.MAX_KILL_RANGE, 0.01);
    maxKillSlider.position(30, 400);
    maxKillSlider.style('width', '200px');

    // Background color picker
    let backgroundColorPickerLabel = sk.createElement('p', 'Background color');
    backgroundColorPickerLabel.style('font-size', '20px');
    backgroundColorPickerLabel.style('color', 'black');
    backgroundColorPickerLabel.position(240, 440);

    let backgroundColorPicker = sk.createColorPicker(config.DEFAULT_BACKGROUND_COLOR);
    backgroundColorPicker.position(30, 450);
    backgroundColorPicker.style('width', '200px');

    // Dot color picker
    let dotColorPickerLabel = sk.createElement('p', 'Dot color');
    dotColorPickerLabel.style('font-size', '20px');
    dotColorPickerLabel.style('color', 'black');
    dotColorPickerLabel.position(240, 490);

    let dotColorPicker = sk.createColorPicker(config.DEFAULT_BACKGROUND_COLOR);
    dotColorPicker.position(30, 500);
    dotColorPicker.style('width', '200px');

    // Cell size
    let cellSizeLabel = sk.createElement('p', 'Cell Size');
    cellSizeLabel.style('font-size', '20px');
    cellSizeLabel.style('color', 'black');
    cellSizeLabel.position(240, 540);

    let cellSizeSlider = sk.createSlider(1, 5, config.CELL_SIZE, 1);
    cellSizeSlider.position(30, 550);
    cellSizeSlider.style('width', '200px');

    let credits = sk.createElement('p', creditsText);
    credits.style('font-size', '16px');
    credits.style('color', 'black');
    credits.style('line-height', '1.5');
    credits.html(creditsText);
    credits.position(30, 600);

    // Draw required buttons
    buildBackButton(sk, 10, 10);
    const resetButton = buildCommonButton(
      sk, 'Apply', 300, 650, "danger"
    );

    // Link buttons with functions
    diffUSlider.input(() => { config.DIFF_U = diffUSlider.value() })
    diffVSlider.input(() => { config.DIFF_V = diffVSlider.value() })
    minFeedSlider.input(() => { config.MIN_FEED_RANGE = minFeedSlider.value() })
    maxFeedSlider.input(() => { config.MAX_FEED_RANGE = maxFeedSlider.value() })
    minKillSlider.input(() => { config.MIN_KILL_RANGE = minKillSlider.value() })
    maxKillSlider.input(() => { config.MAX_KILL_RANGE = maxKillSlider.value() })
    cellSizeSlider.input(() => { config.CELL_SIZE = cellSizeSlider.value() })
    backgroundColorPicker.input(() => { config.DEFAULT_BACKGROUND_COLOR = backgroundColorPicker.value() })
    dotColorPicker.input(() => { config.DEFAULT_DOT_COLOR = dotColorPicker.value() })

    resetButton.mouseClicked(() => {
      lab = new Labo(sk, config.CELL_SIZE, width, height);
      lab.init();

      myTexture = sk.createGraphics(w, h);
      myTexture.image(sk.get(), 0, 0, w, h);
    })
  }

  sk.setup = () => {
    const canvas = sk.createCanvas(w, h, sk.WEBGL);
    canvas.position(0, 0);
    // Inicializa el sistema de reacción-difusión
    lab = new Labo(sk, config.CELL_SIZE, width, height);
    lab.init();

    // Crea una textura a partir de la imagen generada por el sistema de reacción-difusión
    myTexture = sk.createGraphics(w, h);
    myTexture.image(sk.get(), 0, 0, w, h);

    drawInterface();
  }

  sk.draw = () => {

    sk.noStroke();
    lab.proceed();

    sk.background(220);

    // Aplica la textura al modelo
    sk.texture(myTexture);
    lab.observe(myTexture);
    sk.orbitControl(2, 1, 0.1);
    sk.translate(100, 50, 0);
    sk.scale(50, -50, 50);
    sk.model(wolf);
  }
}

const P5 = new p5(s, "main-container");