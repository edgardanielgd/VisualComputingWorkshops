import p5 from '/lib/p5.js';
import buildTitle from '/utils/Title.js';
import buildBackButton from '/utils/BackButton.js';
import buildCommonButton from '/utils/CommonButton.js';
import buildCredits from '/utils/Credits.js'
import Tree from '/workshops/LSystem/tree.js';
import rules from '/workshops/LSystem/rules.js';

const width = 1300;
const height = 800;

const buttonsColumnWidth = width * 0.20;


let s = (sk) => {

  let myTree = new Tree('X', rules['1'], sk, 30, 25);
  let font;

  const drawInterface = () => {

    let creditsText = "Créditos:<br>" +
      "Miguel Angel Puentes Cespedes<br>" +
      "Bryan Smith Colorado Lopez<br>" +
      "Reinaldo Toledo Leguizamon<br>" +
      "Edgar Daniel Gonzalez Diaz";

    let infoText = "Botón generate para renderizar<br>"+
                "el siguiente nivel del árbol.<br>"+
                "Clk izquierdo: rotar.<br>"+
                "Clk derecho: mover.<br>"+
                "Scroll: Zoom.";

    let h2 = sk.createElement('h2', 'L system tree');
    h2.style('color', 'white');
    h2.style('font-size', '40px');
    h2.style('font-family', 'Georgia, sans-serif');
    h2.position(30, 80);

    let credits = sk.createElement('p', creditsText);
    credits.style('font-size', '18px');
    credits.style('color', 'white');
    credits.style('line-height', '1.5'); 
    credits.html(creditsText); 
    credits.position(30, 650);

    let info = sk.createElement('p', infoText);
    info.style('font-size', '18px');
    info.style('color', 'white');
    info.style('line-height', '1.5'); 
    info.html(infoText); 
    info.position(30, 475);

    // Draw required buttons
    const backButton = buildBackButton(
      sk, 10, 10
    );

    const generateButton = buildCommonButton(
      sk, 'Generate', 90, 180, "danger"
    );

    const restartButton = buildCommonButton(
      sk, 'Restart', 90, 230, "danger"
    );

    const aTree = buildCommonButton(
      sk, 'Arbol A', 90, 300, "primary"
    );
    const bTree = buildCommonButton(
      sk, 'Arbol B', 90, 350, "primary"
    );
    const cTree = buildCommonButton(
      sk, 'Arbol C', 90, 400, "primary"
    );

    generateButton.mouseClicked(() => {
      myTree.btnReleased();
      // sk.redraw();
    });


    aTree.mouseClicked(() => {
      myTree.restart(sk);
      myTree = new Tree('X', rules['1'], sk, 30, 25);
    });

    bTree.mouseClicked(() => {
      myTree.restart(sk);
      myTree = new Tree('F', rules['2'], sk, 50, 20);
    });

    cTree.mouseClicked(() => {
      myTree.restart(sk);
      myTree = new Tree('X', rules['3'], sk, 20, 25.7);
    });

    restartButton.mouseClicked(() => {
      myTree.restart(sk);
    });



  }

  sk.preload = () => {
    // font = sk.loadFont('/workshops/LSystem/Georgia.otf');
  }

  sk.setup = () => {
    const canvas = sk.createCanvas(width, height, sk.WEBGL);
    canvas.position(0, 0);

    drawInterface();

    // camera = sk.createCamera();

  }

  sk.draw = () => {

    sk.background(100);

    sk.fill(0);
    // sk.rect(-(width / 2), -(height / 2), buttonsColumnWidth, height);

    // const credits = buildCredits(
    //   sk, 5, 550, buttonsColumnWidth - 10, 500, font
    // );

    sk.orbitControl(2, 2, 2);
    myTree.draw(sk, width, height);
  }
}

const P5 = new p5(s, "main-container");
