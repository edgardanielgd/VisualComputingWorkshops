import p5 from '/lib/p5.js';
import buildTitle from '/utils/Title.js';
import buildBackButton from '/utils/BackButton.js';
import buildCommonButton from '/utils/CommonButton.js';
import buildCredits from '/utils/Credits.js'

const width = 1300;
const height = 800;

const buttonsColumnWidth = width * 0.20;

let gl, camera, testComparator, shapes = [], enableZBuffer = true;


let s = (sk) => {

  const drawInterface = () => {

    let creditsText = "Créditos:<br>" +
      "Miguel Angel Puentes Cespedes<br>" +
      "Bryan Smith Colorado Lopez<br>" +
      "Reinaldo Toledo Leguizamon<br>" +
      "Edgar Daniel Gonzalez Diaz";

    let infoText = "Oprimir la tecla espacio <br>"+
                "para activar/desactivar <br>"+
                "la renderización por ZBuffer.";

    let h2 = sk.createElement('h2', 'Painters algorithm');
    h2.style('color', 'white');
    h2.style('font-size', '40px');
    h2.style('font-family', 'Georgia, sans-serif');
    h2.position(30, 80);

    let credits = sk.createElement('p', creditsText);
    credits.style('font-size', '16px');
    credits.style('color', 'white');
    credits.style('line-height', '1.5'); 
    credits.html(creditsText); 
    credits.position(30, 450);

    let info = sk.createElement('p', infoText);
    info.style('font-size', '16px');
    info.style('color', 'white');
    info.style('line-height', '1.5'); 
    info.html(infoText); 
    info.position(30, 200);

    // Draw required buttons
    const backButton = buildBackButton(
      sk, 10, 10
    );

  }

  sk.setup = () => {
    const canvas = sk.createCanvas(width, height, sk.WEBGL);
    canvas.position(0, 0);
    camera = sk.createCamera();

    gl = sk._renderer.GL;

    for (let i = -2; i < 2; i++) {
      for (let j = -2; j < 2; j++) {
        for (let k = -2; k < 2; k++) {
          createPyramid(75*i, 75*j, 75*k);
        }
      }
    }
    console.log(shapes[0].p1);
    console.log(shapes[0].p2);
    console.log(shapes[0].p3);


    // Hint: camera.eyeX, camera.eyeY, camera.eyeZ
    testComparator = (a, b) => {
      const depthA = calculateDepth(a);
      const depthB = calculateDepth(b);

      if (depthA < depthB) {
        return 1; // 'a' debe mostrarse antes que 'b'
      } else if (depthA > depthB) {
        return -1; // 'b' debe mostrarse antes que 'a'
      } else {
        return 0; // Mismas profundidades, sin cambio en el orden
      }
    };

    function calculateDepth(shape) {
      // Calcula la profundidad de una figura
      // promedio de las coordenadas Z de los vértices.
      const vertices = [shape.p1, shape.p2, shape.p3];
      let totalDepth = -Infinity;

      for (let vertex of vertices) {
        if (totalDepth < vertex.z)
          totalDepth = vertex.z;
      }

      return totalDepth;
    }

    sk.noStroke();
    
    drawInterface();
  }

  sk.draw = () => {
    sk.background(100);
    sk.fill(0);
    sk.orbitControl();

    shapes.sort(testComparator);
    shapes.forEach(s => s.show());

  }

  sk.keyPressed = () => {
    if (sk.key === ' '){
      enableZBuffer = !enableZBuffer;
      if (enableZBuffer) {
        gl.enable(gl.DEPTH_TEST);
        console.log('Se activó ZBuffer');
      } else {
        gl.disable(gl.DEPTH_TEST);
        console.log('Se desactivó ZBuffer');
      }
    }

    if (sk.key === 'w') {
      console.log(
        "Piramid 1, face 1",
        shapes[0].p1.x, 
        shapes[0].p1.y, 
        shapes[0].p1  .z
      )
      console.log(
        "Camera position",
        camera.eyeX,
        camera.eyeY,
        camera.eyeZ
      )
    }
  }

  function createPyramid(x, y, z) {
    let p1 = sk.createVector(x + sk.random(75), y + sk.random(75), z);
    let p2 = sk.createVector(x + 10 + sk.random(75), y + 10 + sk.random(75), z);
    let p3 = sk.createVector(x + sk.random(75), y + 10 + sk.random(75), z);
    let p4 = sk.createVector(x + sk.random(75), y + sk.random(75), z + 1 + sk.random(75));

    let face1 = new PyramidFace(p1, p2, p3);
    let face2 = new PyramidFace(p1, p2, p4);
    let face3 = new PyramidFace(p1, p3, p4);
    let face4 = new PyramidFace(p2, p4, p3);

    shapes.push(face1, face2, face3, face4);
  }

  class PyramidFace {
    constructor(p1, p2, p3) {
      this.p1 = p1;
      this.p2 = p2;
      this.p3 = p3;
      this.col = sk.color(sk.random(255),sk.random(255),sk.random(255))
    }

    show() {
      sk.fill(this.col);
      sk.beginShape();
      sk.vertex(this.p1.x, this.p1.y, this.p1.z);
      sk.vertex(this.p2.x, this.p2.y, this.p2.z);
      sk.vertex(this.p3.x, this.p3.y, this.p3.z);
      sk.endShape(sk.CLOSE);
    }
  }
}

const P5 = new p5(s, "main-container");