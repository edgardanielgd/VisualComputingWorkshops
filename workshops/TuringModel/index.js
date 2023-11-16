import p5 from '/lib/p5.js';
import buildTitle from '/utils/Title.js';
import buildBackButton from '/utils/BackButton.js';
import buildCommonButton from '/utils/CommonButton.js';
import buildCredits from '/utils/Credits.js'

const width = 1300;
const height = 800;

const buttonsColumnWidth = width * 0.20;

let wolf;
let myTexture;
let lab;

const w = 800; // Ancho del lienzo
const h = 600; // Alto del lienzo
const cSiz = 5; // Tamaño de la celda
const pCnt = 500; // Cantidad de iteraciones del sistema de reacción-difusión




let s = (sk) => {

  sk.preload = () =>{
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

    let credits = sk.createElement('p', creditsText);
    credits.style('font-size', '16px');
    credits.style('color', 'black');
    credits.style('line-height', '1.5');
    credits.html(creditsText);
    credits.position(30, 450);


    // Draw required buttons
    const backButton = buildBackButton(
      sk, 10, 10
    );

  }

  sk.setup = () => {
    const canvas = sk.createCanvas(w, h, sk.WEBGL);
    canvas.position(0, 0);
    // Inicializa el sistema de reacción-difusión
    lab = new Labo(cSiz);
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
    lab.observe();
    sk.orbitControl(2, 1, 0.1);
    sk.translate(100, 50, 0);
    sk.scale(50, -50, 50);
    sk.model(wolf);

  }


  class Labo {
    cellSize;
    matrixW;
    matrixH;
    diffU;
    diffV;
    cells;

    constructor(_cSiz) {
      this.cellSize = _cSiz;
      this.matrixW = sk.floor(width / this.cellSize);
      this.matrixH = sk.floor(height / this.cellSize);
      this.diffU = 0.9;
      this.diffV = 0.1;
      this.cells = new Array();
    }

    /*
     * init : initialize reaction-diffusion system.
     */
    init() {
      for (let x = 0; x < this.matrixW; x++) {
        this.cells[x] = [];
        for (let y = 0; y < this.matrixH; y++) {
          this.cells[x][y] = new Cell(
            sk.map(x, 0.0, this.matrixW, 0.03, 0.12),   // feed
            sk.map(y, 0.0, this.matrixH, 0.045, 0.055), // kill
            1,                         // u
            (sk.random(1) < 0.1) ? 1 : 0  // v
          );
        }
      }
    }

    

    /*
     * proceed : proceed reaction-diffusion calculation.
     */
    proceed() {

      // calculate Laplacian
      const nD = Array(); // neighbors on diagonal
      const nH = Array(); // neighbors on vertical and horizontal
      for (let x = 0; x < this.matrixW; x++) {
        for (let y = 0; y < this.matrixH; y++) {

          // set neighbors
          nD[0] = this.cells[sk.max(x - 1, 0)][sk.max(y - 1, 0)];
          nD[1] = this.cells[sk.max(x - 1, 0)][sk.min(y + 1, this.matrixH - 1)];
          nD[2] = this.cells[sk.min(x + 1, this.matrixW - 1)][sk.max(y - 1, 0)];
          nD[3] = this.cells[sk.min(x + 1, this.matrixW - 1)][sk.min(y + 1, this.matrixH - 1)];
          nH[0] = this.cells[sk.max(x - 1, 0)][y];
          nH[1] = this.cells[x][sk.max(y - 1, 0)];
          nH[2] = this.cells[x][sk.min(y + 1, this.matrixH - 1)];
          nH[3] = this.cells[sk.min(x + 1, this.matrixW - 1)][y];

          // Laplacian
          let c = this.cells[x][y];
          let sum = 0.0;
          for (let i = 0; i < 4; i++) {
            sum += nD[i].valU * 0.05 + nH[i].valU * 0.2;
          }
          sum -= c.valU;
          c.lapU = sum;

          sum = 0.0;
          for (let i = 0; i < 4; i++) {
            sum += nD[i].valV * 0.05 + nH[i].valV * 0.2;
          }
          sum -= c.valV;
          c.lapV = sum;

        }
      }

      // reaction-diffusion
      for (let x = 0; x < this.matrixW; x++) {
        for (let y = 0; y < this.matrixH; y++) {
          let c = this.cells[x][y];
          let reaction = c.valU * c.valV * c.valV;
          let inflow = c.feed * (1.0 - c.valU);
          let outflow = (c.feed + c.kill) * c.valV;
          c.valU = c.valU + this.diffU * c.lapU - reaction + inflow;
          c.valV = c.valV + this.diffV * c.lapV + reaction - outflow;
          c.standardization();
        }
      }
    }

    /*
     * observe : display the result.
     */
    observe() {
      myTexture.background(0);
      myTexture.fill(255);
      myTexture.noStroke();
      for (let x = 0; x < this.matrixW; x++) {
        for (let y = 0; y < this.matrixH; y++) {
          let cx = x * this.cellSize;
          let cy = y * this.cellSize;
          let cs = this.cells[x][y].valU * this.cellSize;
          myTexture.rect(cx, cy, cs, cs);
        }
      }
    }
  }

  /*
   * Cell : holds cell informations.
   */
  class Cell {

    feed;
    kill;
    valU;
    valV;
    lapU;
    lapV;

    constructor(_f, _k, _u, _v) {
      this.feed = _f;
      this.kill = _k;
      this.valU = _u;
      this.valV = _v;
      this.lapU = 0;
      this.lapV = 0;
    }

    standardization() {
      this.valU = sk.constrain(this.valU, 0, 1);
      this.valV = sk.constrain(this.valV, 0, 1);
    }
  }

}

const P5 = new p5(s, "main-container");