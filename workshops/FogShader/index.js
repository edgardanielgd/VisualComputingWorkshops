import p5 from '/lib/p5.js';
import buildBackButton from '/utils/BackButton.js';

const width = 1300;
const height = 800;

let s = (sk) => {
  let fogNear = 0.7;
  let fogFar = 0.9;
  let camera = null;
  let rotationAngle = 0;
  let texture;

  const checkKeyUpdate = () => {
    let x_offset = 0;
    let y_offset = 0;
    let z_offset = 0;
    let xy_rotation = 0;
    let xz_rotation = 0;

    if (sk.keyIsDown(81)) { // Q
      y_offset = 10;
    }
    if (sk.keyIsDown(69)) { // E
      y_offset = -10;
    }
    if (sk.keyIsDown(87)) { // W
      z_offset = -10;
    }
    if (sk.keyIsDown(83)) { // S
      z_offset = 10;
    }
    if (sk.keyIsDown(65)) { // A
      x_offset = -10;
    }
    if (sk.keyIsDown(68)) { // D
      x_offset = 10;
    }
    if (sk.keyIsDown(85)) { // U
      xy_rotation = 0.05;
    }
    if (sk.keyIsDown(73)) { // I
      xy_rotation = -0.05;
    }
    if (sk.keyIsDown(89)) { // Y
      xz_rotation = -0.05;
    }
    if (sk.keyIsDown(72)) { // H
      xz_rotation = 0.05;
    }

    // Posición camara
    // console.log("Posición de la cámara (X, Y, Z):", camera.eyeX, camera.eyeY, camera.eyeZ);
    // console.log("Ángulo de la cámara (X, Y, Z):", camera.centerX, camera.centerY, camera.centerZ);

    camera.move(x_offset, y_offset, z_offset);
    camera.pan(xy_rotation);
    camera.tilt(xz_rotation);
  }

  const drawInterface = () => {
    let creditsText = "Créditos:<br>" +
      "Miguel Angel Puentes Cespedes<br>" +
      "Bryan Smith Colorado Lopez<br>" +
      "Reinaldo Toledo Leguizamon<br>" +
      "Edgar Daniel Gonzalez Diaz";

    let h2 = sk.createElement('h2', 'Fog Shader');
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

    let infoText = "Instrucciones:<br>" +
      "Use las teclas para mover la cámara: <br>" +
      "Q y E para subir y bajar (Y) <br>" +
      "W y S para acercar y alejar (Z) <br>" +
      "A y D para moverse a la izquierda y derecha (X) <br>" +
      "U y I para rotar a izquierda / derecha <br>" +
      "Y y H para rotar arriba / abajo <br>";
    let info = sk.createElement('p', infoText);
    info.style('font-size', '18px');
    info.style('color', 'white');
    info.style('line-height', '1.5');
    info.html(infoText);
    info.position(30, 135);

    let fogNearSlider = sk.createSlider(0, 1, fogNear, 0.01);
    fogNearSlider.position(30, 350);
    fogNearSlider.style('width', '200px');

    let fogFarSlider = sk.createSlider(0, 1, fogFar, 0.01);
    fogFarSlider.position(30, 400);
    fogFarSlider.style('width', '200px');

    let fogNearLabel = sk.createElement('p', 'fogNear');
    fogNearLabel.style('font-size', '18px');
    fogNearLabel.style('color', 'white');
    fogNearLabel.position(240, 350);

    let fogFarLabel = sk.createElement('p', 'fogFar');
    fogFarLabel.style('font-size', '18px');
    fogFarLabel.style('color', 'white');
    fogFarLabel.position(240, 400);

    fogNearSlider.input(() => {
      fogNear = fogNearSlider.value();
    });

    fogFarSlider.input(() => {
      fogFar = fogFarSlider.value();
    });

    buildBackButton(sk, 10, 10);
  }

  sk.setup = () => {
    const canvas = sk.createCanvas(width, height, sk.WEBGL);
    canvas.position(0, 0);

    drawInterface();

    camera = sk.createCamera();
    camera.camera(-728.4198549126278, -234.7516234526818, 187.85270602059123, -387.10488342035615, 241.10464976130223, -182.37114617427332, 0, 1, 0);

    sk.stroke(0);
    sk.fill(255);

    let pg = sk.createGraphics(100, 100);
    pg.clear();

    pg.colorMode(sk.HSB, 360, 50, 50);
    for (let j = 0; j < 100; j++) {
      pg.stroke(j * 3, 100, 100);
      pg.line(0, j, 100, j);
    }
    pg.colorMode(sk.RGB);

    pg.stroke(255, 0, 0);
    pg.strokeWeight(10);
    pg.line(30, 20, 30, 80);
    pg.line(30, 20, 70, 20);
    pg.line(30, 40, 60, 40);

    texture = pg.get();
  }

  sk.draw = () => {
    sk.background(0);
    checkKeyUpdate();

    sk.shader(fogShader);

    fogShader.setUniform("uFogNear", fogNear);
    fogShader.setUniform("uFogFar", fogFar);

    rotationAngle += 0.02;

    for (let i = 0; i < 15; i++) {
      sk.push();
      sk.translate((i * 400) - 500, 200 * i, 0);
      sk.rotateZ(rotationAngle);
      sk.rotateY(rotationAngle - ((i * 4) / 100));
      sk.rotateX(rotationAngle - ((i * 4) / 100));

      fogShader.setUniform("uFogNear", fogNear);
      fogShader.setUniform("uFogFar", fogFar);
      fogShader.setUniform("uTexture", texture);

      sk.box(100);
      sk.pop();
    }

    sk.resetShader();
  };

  const fogVertexShader = `
    precision highp float;
    attribute vec4 aPosition;
    attribute vec4 aTexCoord;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying vec4 vTexCoord;
    varying float vDepth;
    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aPosition;
      vTexCoord = aTexCoord;
      vDepth = gl_Position.z / gl_Position.w;
    }
  `;

  const fogFragmentShader = `
    precision highp float;
    varying vec4 vTexCoord;
    varying float vDepth;
    uniform float uFogNear;
    uniform float uFogFar;
    uniform sampler2D uTexture;

    void main() {
      float fogAmount = smoothstep(uFogNear, uFogFar, vDepth);
      vec4 texColor = texture2D(uTexture, vTexCoord.st);
      vec4 finalColor = mix(texColor, vec4(0.0), fogAmount);
      gl_FragColor = finalColor;
    }
  `;

  const fogShader = new p5.Shader(sk._renderer, fogVertexShader, fogFragmentShader);
};

const P5 = new p5(s, "main-container");
