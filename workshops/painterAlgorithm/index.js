import p5 from '/lib/p5.js';
import buildTitle from '/utils/Title.js';
import buildBackButton from '/utils/BackButton.js';
import buildCommonButton from '/utils/CommonButton.js';
import buildCredits from '/utils/Credits.js'

const width = 1300;
const height = 800;

const buttonsColumnWidth = width * 0.20;

let gl, camera, testComparator, shapes = [], enableZBuffer = true;

let cameraPlane;

const getCameraPlane = () => {
  const normal = new p5.Vector(
    camera.centerX - camera.eyeX,
    camera.centerY - camera.eyeY,
    camera.centerZ - camera.eyeZ
  );

  normal.normalize();

  cameraPlane = [
    normal.x, normal.y, normal.z,
    -(camera.eyeX * normal.x + camera.eyeY * normal.y + camera.eyeZ * normal.z)
  ];
}

const getPointPlane = (face) => {
  const P = new p5.Vector(
    face.p1.x - face.p2.x,
    face.p1.y - face.p2.y,
    face.p1.z - face.p2.z
  );

  P.normalize();

  const Q = new p5.Vector(
    face.p1.x - face.p3.x,
    face.p1.y - face.p3.y,
    face.p1.z - face.p3.z
  );

  Q.normalize();

  const N = p5.Vector.cross(P, Q);

  return [N.x, N.y, N.z, -(face.p1.x * N.x + face.p1.y * N.y + face.p1.z * N.z)]
}

const getZDistance = (point) => {
  const [a, b, c, d] = cameraPlane;

  const distance = (
    a * point.x + b * point.y + c * point.z + d
  ) / Math.sqrt(a * a + b * b + c * c);

  return distance;
}

const getZProjectionVectors = () => {
  const [a, b, c, d] = cameraPlane;

  const Z = new p5.Vector(a, b, c);
  const uVector = new p5.Vector(
    a + 1, b, c
  );

  uVector.normalize();

  const dot = p5.Vector.dot(uVector, Z);

  const X = p5.Vector.sub(uVector, p5.Vector.mult(Z, dot));

  X.normalize();

  const Y = p5.Vector.cross(Z, X).mult(-1);

  return [X, Y];
}

const isOutsideFace = (faceBase, faceToCheck) => {
  const [a, b, c, d] = getPointPlane(faceBase);

  const evaluationP1 = a * faceToCheck.p1.x + b * faceToCheck.p1.y + c * faceToCheck.p1.z + d;
  const evaluationP2 = a * faceToCheck.p2.x + b * faceToCheck.p2.y + c * faceToCheck.p2.z + d;
  const evaluationP3 = a * faceToCheck.p3.x + b * faceToCheck.p3.y + c * faceToCheck.p3.z + d;

  return (evaluationP1 >= 0 && evaluationP2 >= 0 && evaluationP3 >= 0);
}

const getZProjection = (point) => {
  const [a, b, c, d] = cameraPlane;
  const k = getZDistance(point);

  const projectedPoint = {
    x: point.x + k * a,
    y: point.y + k * b,
    z: point.z + k * c
  }

  // Now convert from 3D to 2D coordinates
  const [X, Y] = getZProjectionVectors();

  const pAsVector = new p5.Vector(
    projectedPoint.x, projectedPoint.y, projectedPoint.z
  );

  const projection2D = new p5.Vector(
    p5.Vector.dot(pAsVector, X), p5.Vector.dot(pAsVector, Y)
  );

  return projection2D;
}

const testComparator2 = (a, b) => {
  const da = [
    getZDistance(a.p1), getZDistance(a.p2), getZDistance(a.p3)
  ];

  da.sort();

  const db = [
    getZDistance(b.p1), getZDistance(b.p2), getZDistance(b.p3)
  ];

  db.sort();

  // Case 1: Min Z of a is greater than Max Z of b
  if (da[0] > db[2]) {
    return 1;
  } else if (db[0] > da[2]) {
    return -1;
  }

  const projectionAP1 = getZProjection(a.p1);
  const projectionAP2 = getZProjection(a.p2);
  const projectionAP3 = getZProjection(a.p3);

  const projectionBP1 = getZProjection(b.p1);
  const projectionBP2 = getZProjection(b.p2);
  const projectionBP3 = getZProjection(b.p3);

  const Axs = [projectionAP1.x, projectionAP2.x, projectionAP3.x];
  const Ays = [projectionAP1.y, projectionAP2.y, projectionAP3.y];
  const Bxs = [projectionBP1.x, projectionBP2.x, projectionBP3.x];
  const Bys = [projectionBP1.y, projectionBP2.y, projectionBP3.y];

  Axs.sort(); Ays.sort(); Bxs.sort(); Bys.sort();

  // Define position squares
  const minAx = Axs[0]; const maxAx = Axs[2];
  const minAy = Ays[0]; const maxAy = Ays[2];
  const minBx = Bxs[0]; const maxBx = Bxs[2];
  const minBy = Bys[0]; const maxBy = Bys[2];

  // Test one totally inside another

  // A inside B
  const aInsideB = (
    minAx >= minBx && maxAx <= maxBx &&
    minAy >= minBy && maxAy <= maxBy
  );

  if (aInsideB) {
    if (da[0] < db[0]) {
      return 1;
    }

    return -1;
  }

  // B inside A
  const bInsideA = (
    minBx >= minAx && maxBx <= maxAx &&
    minBy >= minAy && maxBy <= maxAy
  );

  if (bInsideA) {
    if (da[0] > db[0]) {
      return -1;
    }

    return 1;
  }

  // Check if not interception at all
  const interception = (
    (minAx >= minBx && minAx <= maxBx && minAy >= minBy && minAy <= maxBy) ||
    (maxAx >= minBx && maxAx <= maxBx && maxAy >= minBy && maxAy <= maxBy) ||
    (minBx >= minAx && minBx <= maxAx && minBy >= minAy && minBy <= maxAy) ||
    (maxBx >= minAx && maxBx <= maxAx && maxBy >= minAy && maxBy <= maxAy)
  );

  if (!interception) {
    // Dont even bother to check
    return 0;
  }

  if (isOutsideFace(a, b)) {
    return 1;
  }

  if (isOutsideFace(b, a)) {
    return -1;
  }
};

let s = (sk) => {

  const drawInterface = () => {

    let creditsText = "Créditos:<br>" +
      "Miguel Angel Puentes Cespedes<br>" +
      "Bryan Smith Colorado Lopez<br>" +
      "Reinaldo Toledo Leguizamon<br>" +
      "Edgar Daniel Gonzalez Diaz";

    let infoText = "Oprimir la tecla espacio <br>" +
      "para activar/desactivar <br>" +
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

    // for (let i = -2; i < 2; i++) {
    //   for (let j = -2; j < 2; j++) {
    //     for (let k = -2; k < 2; k++) {
    //       createPyramid(75*i, 75*j, 75*k);
    //     }
    //   }
    // }

    createPyramid(0, 0, 0);


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
    getCameraPlane();

    sk.background(100);
    sk.fill(0);
    sk.orbitControl();

    shapes.sort(testComparator2);
    shapes.forEach(s => s.show());

  }

  sk.keyPressed = () => {
    if (sk.key === ' ') {
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
        shapes[0].p1.z
      )
      console.log(
        "Camera position",
        camera.eyeX,
        camera.eyeY,
        camera.eyeZ
      )
    }

    if (sk.key === 'q') {
      console.log(shapes[0]);
      console.log(shapes[0].p1)
      console.log(getZProjection(shapes[0].p1))
      console.log(cameraPlane)
      // console.log(getZProjection(shapes[0].p2))
      // console.log(getZProjection(shapes[0].p3))
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
      this.col = sk.color(sk.random(255), sk.random(255), sk.random(255))
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