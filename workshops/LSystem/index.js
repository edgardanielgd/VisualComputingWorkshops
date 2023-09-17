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
  
  const myTree = new Tree('X',rules['1'], sk);
  
  const drawInterface = () => {
    // Draw buttons panel
    sk.fill(0);
    sk.rect(-(width/2), -(height/2), buttonsColumnWidth, height);
    
    const title = buildTitle(
      sk, "L-System Tree",
      5, 80,10, buttonsColumnWidth - 10, 80
    );

    // Draw required buttons
    const backButton = buildBackButton(
      sk, 10, 10
    );

    const generateButton = buildCommonButton(
      sk, 'Generate', 90, 180, "danger"
    );

    const aTree = buildCommonButton(
      sk, 'Arbol A', 90, 250, "danger"
    );
    const bTree = buildCommonButton(
      sk, 'Arbol B', 90, 300, "danger"
    );

    generateButton.mouseClicked(() => {
      myTree.btnReleased();
      sk.redraw();
    });

    aTree.mouseClicked(() => {
       
    });

    const credits = buildCredits(
      sk, 5, 550, buttonsColumnWidth - 10, 500
    );

    
  }

  sk.setup = () =>{
    const canvas = sk.createCanvas(width, height, sk.WEBGL);
    canvas.position(0, 0);

    sk.background(100);
    
    drawInterface();
  }
  
  sk.draw = () =>{
    sk.orbitControl(2,2,2);
    myTree.draw(sk,width,height);

  }
}

const P5 = new p5(s, "main-container");
