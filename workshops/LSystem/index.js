import p5 from '/lib/p5.js';

let rules = {
  "X": "F+[[X]-X]-F[-FX]+X",
  "F": "FF"
}

let len = 3;
let ang;
let drawRules;

let word = "X";
let s = (sk) => {

  function mouseReleased(){
    word = generate();
    console.log(word)
  }

  function generate() {
    let next = ""
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
    sk.createCanvas(710, 400, sk.WEBGL); 
    drawRules ={
      'F':() =>{
        sk.line(0, 0, 0, -len, 0, 0);
        sk.translate(0,-len,0);
      }
    }
    mouseReleased()
  }

  sk.draw = () =>{
    sk.background(100); 
    


  }


}

const P5 = new p5(s, "main-container");
