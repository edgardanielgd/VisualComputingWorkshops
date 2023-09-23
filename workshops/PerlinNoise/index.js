import p5 from '/lib/p5.js';
import buildBackButton from '/utils/BackButton.js';

const width = 1300;
const height = 800;

let s = (sk) => {
  let radius = 200; // Radio o escala de la esfera
  let cols = 30;
  let rows = 30;
  let time = 0; // Variable para el tiempo
  let noiseScale = 0.4; // Factor de escala inicial para el ruido Perlin
  let maxdeform = 100; // Maxima deformación en el radio
  let timespace = 0.1; // velocidad en la animación

  let camera = null;

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

    camera.move(x_offset, y_offset, z_offset);
    camera.pan(xy_rotation);
    camera.tilt(xz_rotation);
  }

  const drawInterface = () => {

    // Titles and info
    let creditsText = "Créditos:<br>" +
      "Miguel Angel Puentes Cespedes<br>" +
      "Bryan Smith Colorado Lopez<br>" +
      "Reinaldo Toledo Leguizamon<br>" +
      "Edgar Daniel Gonzalez Diaz";

    let h2 = sk.createElement('h2', '3D Perlin Noise');
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
      "Use las teclas para mover la camara: <br>" +
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

    // Input sliders
    let radiusSlider = sk.createSlider(50, 500, radius, 1);
    radiusSlider.position(30, 350);
    radiusSlider.style('width', '200px');

    let colsSlider = sk.createSlider(10, 100, cols, 1);
    colsSlider.position(30, 400);
    colsSlider.style('width', '200px');

    let rowsSlider = sk.createSlider(10, 100, rows, 1);
    rowsSlider.position(30, 450);
    rowsSlider.style('width', '200px');

    let noiseScaleSlider = sk.createSlider(0.1, 1, noiseScale, 0.01);
    noiseScaleSlider.position(30, 500);
    noiseScaleSlider.style('width', '200px');

    let maxdeformSlider = sk.createSlider(0, 200, maxdeform, 1);
    maxdeformSlider.position(30, 550);
    maxdeformSlider.style('width', '200px');

    let timespaceSlider = sk.createSlider(0.01, 0.5, timespace, 0.01);
    timespaceSlider.position(30, 600);
    timespaceSlider.style('width', '200px');

    // Input sliders labels
    let radiusLabel = sk.createElement('p', 'Radio');
    radiusLabel.style('font-size', '18px');
    radiusLabel.style('color', 'white');
    radiusLabel.position(240, 350);

    let colsLabel = sk.createElement('p', 'Columnas');
    colsLabel.style('font-size', '18px');
    colsLabel.style('color', 'white');
    colsLabel.position(240, 400);

    let rowsLabel = sk.createElement('p', 'Filas');
    rowsLabel.style('font-size', '18px');
    rowsLabel.style('color', 'white');
    rowsLabel.position(240, 450);

    let noiseScaleLabel = sk.createElement('p', 'Factor de escala');
    noiseScaleLabel.style('font-size', '18px');
    noiseScaleLabel.style('color', 'white');
    noiseScaleLabel.position(240, 500);

    let maxdeformLabel = sk.createElement('p', 'Deformación máxima');
    maxdeformLabel.style('font-size', '18px');
    maxdeformLabel.style('color', 'white');
    maxdeformLabel.position(240, 550);

    let timespaceLabel = sk.createElement('p', 'Velocidad de animación');
    timespaceLabel.style('font-size', '18px');
    timespaceLabel.style('color', 'white');
    timespaceLabel.position(240, 600);

    // Input sliders events
    radiusSlider.input(() => {
      radius = radiusSlider.value();
    });

    colsSlider.input(() => {
      cols = colsSlider.value();
    });

    rowsSlider.input(() => {
      rows = rowsSlider.value();
    });

    noiseScaleSlider.input(() => {
      noiseScale = noiseScaleSlider.value();
    });

    maxdeformSlider.input(() => {
      maxdeform = maxdeformSlider.value();
    });

    timespaceSlider.input(() => {
      timespace = timespaceSlider.value();
    });


    // Draw required buttons
    buildBackButton(
      sk, 10, 10
    );
  }

  sk.setup = () => {
    const canvas = sk.createCanvas(width, height, sk.WEBGL);
    canvas.position(0, 0);

    drawInterface();

    camera = sk.createCamera();
    camera.move(
      0,
      -camera.eyeY - radius - maxdeform,
      -camera.eyeZ + radius + maxdeform
    )
    camera.tilt(0.5);

    sk.stroke(0);
    sk.fill(255);
  }

  sk.draw = () => {
    sk.background(0);
    checkKeyUpdate();

    // Fix poles vertices to avoid multiple values
    let north_pole_coords = null;
    let south_pole_coords = null;

    // Draw Sphere's rows
    // Y represents the value of phi
    for (let y = 0; y < rows - 1; y++) {
      sk.beginShape(sk.TRIANGLE_STRIP);
      const phi_start = sk.map(y, 0, rows - 1, 0, sk.PI);
      const phi_end = sk.map(y + 1, 0, rows - 1, 0, sk.PI);

      // Save start and last coords to end the sphere properly
      let start_coords = null;
      let end_coords = null;

      // X represents the value of pi
      for (let x = 0; x < cols; x++) {
        const pi = sk.map(x, 0, cols, 0, 2 * sk.PI);

        const noiseValueS = sk.noise(x * noiseScale + time, y * noiseScale + time); // Valor de ruido Perlin parametrizado con tiempo
        const rs = radius + noiseValueS * maxdeform; // Ajusta el radio con el ruido

        // Parse to spherical coordinates for the first vertex
        let xs = rs * sk.sin(phi_start) * sk.cos(pi);
        let ys = rs * sk.sin(phi_start) * sk.sin(pi);
        let zs = rs * sk.cos(phi_start);

        if (y == 0) {
          if (north_pole_coords == null) {
            north_pole_coords = [xs, ys, zs];
          } else {
            xs = north_pole_coords[0];
            ys = north_pole_coords[1];
            zs = north_pole_coords[2];
          }
        }

        const noiseValueE = sk.noise(x * noiseScale + time, (y + 1) * noiseScale + time); // Valor de ruido Perlin parametrizado con tiempo
        const re = radius + noiseValueE * maxdeform; // Ajusta el radio con el ruido

        // Parse to spherical coordinates for the second vertex
        let xe = re * sk.sin(phi_end) * sk.cos(pi);
        let ye = re * sk.sin(phi_end) * sk.sin(pi);
        let ze = re * sk.cos(phi_end);

        if (y == rows - 2) {
          if (south_pole_coords == null) {
            south_pole_coords = [xe, ye, ze];
          } else {
            xe = south_pole_coords[0];
            ye = south_pole_coords[1];
            ze = south_pole_coords[2];
          }
        }

        if (start_coords == null) {
          start_coords = [xs, ys, zs];
          end_coords = [xe, ye, ze];
        }

        sk.fill(
          sk.random(255),
        )

        sk.vertex(xs, ys, zs);
        sk.vertex(xe, ye, ze);
      }
      // End the sphere properly
      sk.fill(
        sk.random(255),
      )
      sk.vertex(start_coords[0], start_coords[1], start_coords[2]);
      sk.vertex(end_coords[0], end_coords[1], end_coords[2]);

      sk.endShape();
    }

    time += timespace; // Incrementa el tiempo para animar el ruido Perlin 
  }
};

const P5 = new p5(s, "main-container");
