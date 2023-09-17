class Tree{

  constructor(word,rules, sk){
    this.rules = rules;
    this.len=60;
    this.ang=25;
    this.word=word;
    this.drawRules ={
      'F': () =>{
        sk.stroke(100, 50, 0);
        sk.strokeWeight(5);
        sk.line(0, 0, 0, 0, 0, -this.len);
        sk.translate(0, 0, -this.len); 
        
      },
      '+': () =>{
        sk.rotateX(sk.PI/180 * -this.ang); 
      },
      '-': () =>{
        sk.rotateY(sk.PI/180 * this.ang); 
      },
      '[': () => {sk.push()} ,
      ']': () => {
        sk.noStroke();
        sk.fill(0, 150, 0);
        //sk.ellipse(0, 0, 20, 50);
        sk.ellipsoid(20,15,15);
        sk.pop()
      },
    }
  }


  generate() {
    let next = "";
    for(let i = 0; i < this.word.length; i ++) {
      let c = this.word[i];
      if(c in this.rules) {
        next += this.rules[c];
      } else {
        next += c;
      }
    }
    
    return next;
  }

  btnReleased(sk){
    this.word = this.generate();
    console.log(this.word);
  }

  
  draw(sk,width,height){

    
    sk.push();
    sk.translate(width / 4, height / 2);
    sk.rotate(sk.PI / 180 * this.ang);
    
    for(let i = 0; i < this.word.length; i ++) {
      let c = this.word[i];
      if(c in this.drawRules) {
        this.drawRules[c]();
      }  
    }
    
    sk.pop();
    
  }
  
}

export default Tree;
