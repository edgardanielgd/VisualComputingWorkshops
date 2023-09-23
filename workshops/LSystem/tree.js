class Tree {

  constructor(word, rules, sk, len, ang) {
    this.rules = rules;
    this.len = len;
    this.ang = ang;
    this.initial_word = word;
    this.restart(sk);
  }

  restart(sk) {
    this.word = this.initial_word;
    this.drawRules = {
      'F': () => {
        sk.stroke(100, 50, 0);
        sk.strokeWeight(8);
        sk.line(0, 0, 0, 0, 0, -this.len);
        sk.translate(0, 0, -this.len);
      },
      '+': () => {
        sk.rotateX(sk.PI / 180 * -this.ang);
      },
      '-': () => {
        sk.rotateY(sk.PI / 180 * this.ang);
      },
      '[': () => { sk.push() },
      ']': () => {
        sk.fill(0, 128, 0); 
        sk.stroke(0,50,0);
        sk.strokeWeight(2)
        sk.ellipsoid(30, 20, 10); 
        sk.pop()
      },
    }
  }

  generate() {
    let next = "";
    for (let i = 0; i < this.word.length; i++) {
      let c = this.word[i];
      if (c in this.rules) {
        next += this.rules[c];
      } else {
        next += c;
      }
    }

    return next;
  }

  btnReleased(sk) {
    this.word = this.generate();
    console.log(this.word);
  }


  draw(sk, width, height) {


    sk.push();
    sk.translate(0, height / 2);
    sk.rotate(sk.PI / 180 * this.ang-25);


    for (let i = 0; i < this.word.length; i++) {
      let c = this.word[i];
      if (c in this.drawRules) {
        this.drawRules[c]();
      }
    }

    sk.pop();

  }

}

export default Tree;
