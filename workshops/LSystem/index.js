import p5 from '/lib/p5.js';
import buildCommonButton from '/utils/CommonButton.js';
import buildTitle from '/utils/Title.js';
import buildCredits from '/utils/Credits.js'
import buildBackButton from '/utils/BackButton.js';

/*let rules = {
  "X": "F+[[X]-X]-F[-FX]+X",
  "F": "FF"
}*/

let rules = {
  "F": "F[+F]F[-F]F"
}

let len = 40; // Aumenté la longitud para que sea visible
let ang = 25;
let drawRules;
const buttonsColumnWidth = 600 * 0.20;
let word = "F";
let s = (sk) => {

  function mouseReleased(){
    word = generate();
    console.log(word);
    sk.redraw();
  }

  function generate() {
    let next = "";
    for(let i = 0; i < word.length; i ++) {
      let c = word[i];
      if(c in rules) {
        next += rules[c];
      } else {
        next += c;
      }
    }
    
    return next;
  }
  
  sk.setup = () =>{

    const canvas = sk.createCanvas(600, 600,sk.WEBGL);
    canvas.parent('main-container');
    canvas.position(500, 0);
    // Draw buttons panel
    sk.fill(0);
    sk.rect(0, 0, buttonsColumnWidth, 600);


    // Draw required buttons
    const backButton = buildBackButton(
      sk, 30, 2
    );

    const generateBtn = buildCommonButton(
      sk, 'Generao pa!', 30, 140, "danger"
    );

    generateBtn.mouseClicked(() => {
      mouseReleased();
    });

    drawRules ={
      'F': () =>{
        sk.stroke(100, 50, 0);
        sk.strokeWeight(5);
        sk.line(0, 0, 0, 0, 0, -len); // Proporciona coordenadas 3D para sk.line()
        sk.translate(0, 0, -len); // Ajusta la posición en el eje z
        
      },
      '+': () =>{
        sk.rotateX(sk.PI/180 * -ang); // Utiliza rotateY para rotar en el eje y
      },
      '-': () =>{
        sk.rotateY(sk.PI/180 * ang); // Utiliza rotateY para rotar en el eje y
      },
      '[': () => {sk.push()} ,
      ']': () => {sk.pop()},
    }
    //sk.noLoop();
    //drawInterface();
  }

  sk.draw = () =>{
    sk.orbitControl(2,2,2);
    sk.background(100); 
    sk.translate(0, sk.height/4);
    //sk.rotate(sk.PI/180 * ang);
    sk.push();

    for(let i = 0; i < word.length; i ++) {
      let c = word[i];
      if(c in drawRules) {
        drawRules[c]();
      }  
    }
    sk.pop();
  }
}

const P5 = new p5(s, "main-container");
