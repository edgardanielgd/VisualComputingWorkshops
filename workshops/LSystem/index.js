import p5 from '/lib/p5.js';

let rules = {
  "X": "F+[[X]-X]-F[-FX]+X",
  "F": "FF"
}

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
    mouseReleased()
  }

  sk.draw = () =>{
    sk.background(100); 
    sk.fill(255);

    //sk.orbitControl(); 
    sk.orbitControl(2, 2, 2);
    
    sk.push();
    sk.translate(0, 0, 0);
    sk.cylinder(50);
    sk.pop();

    sk.line(-100, 0, 0, 100, 0, 0);


  }


}

const P5 = new p5(s, "main-container");
