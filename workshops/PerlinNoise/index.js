import p5 from '/lib/p5.js';
import buildBackButton from '/utils/BackButton.js';

const width = 1300;
const height = 800;

let s = (sk) => {
  let radius = 200; // Radio o escala de la esfera
  let cols = 100;
  let rows = 100;
  let time = 0; // Variable para el tiempo
  let noiseScale = 0.1; // Factor de escala inicial para el ruido Perlin
  let maxdeform = 100; // Maxima deformación en el radio
  let timespace = 1; // velocidad en la animación
  let prevStripY = []; // Almacena las coordenadas finales del TRIANGLE_STRIP anterior para cada fila


  const drawInterface = () => {
    let creditsText = "Créditos:<br>" +
      "Miguel Angel Puentes Cespedes<br>" +
      "Bryan Smith Colorado Lopez<br>" +
      "Reinaldo Toledo Leguizamon<br>" +
      "Edgar Daniel Gonzalez Diaz";

    let infoText = "Por completar, agregar parametrización";

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

    let info = sk.createElement('p', infoText);
    info.style('font-size', '18px');
    info.style('color', 'white');
    info.style('line-height', '1.5');
    info.html(infoText);
    info.position(30, 475);

    // Draw required buttons
    const backButton = buildBackButton(
      sk, 10, 10
    );
  }

  sk.setup = () => {
    const canvas = sk.createCanvas(width, height, sk.WEBGL);
    canvas.position(0, 0);

    drawInterface();
  }

  sk.draw = () => {
    sk.background(0);
    sk.orbitControl(2, 2, 2);

    time += timespace; // Incrementa el tiempo para animar el ruido Perlin 

    for (let y = 0; y < rows; y++) {
      sk.beginShape(sk.TRIANGLE_STRIP);
      for (let x = 0; x <= cols; x++) {
        for (let i = 0; i <= 1; i++) {
          const lat = sk.map(y + i, 0, rows, -sk.HALF_PI, sk.HALF_PI);
          const lon = sk.map(x, 0, cols, -sk.PI, sk.PI);
          const noiseValue = sk.noise(x * noiseScale + time, y * noiseScale + time); // Valor de ruido Perlin parametrizado con tiempo
          const r = radius + noiseValue * maxdeform; // Ajusta el radio con el ruido
          const x1 = r * sk.cos(lat) * sk.cos(lon);
          const y1 = r * sk.cos(lat) * sk.sin(lon);
          const z1 = r * sk.sin(lat);
          sk.vertex(x1, y1, z1);
        }
      }
      sk.endShape();

      // Almacena las coordenadas finales del TRIANGLE_STRIP actual
      prevStripY[y] = {
        x: sk.xp1, // sk.xp1 y sk.yp1 contienen las coordenadas finales de la tira anterior
        y: sk.yp1,
        z: sk.zp1
      };

      // Utiliza las coordenadas finales de la tira anterior como coordenadas iniciales para la siguiente tira
      sk.beginShape(sk.TRIANGLE_STRIP);
      for (let x = 0; x <= cols; x++) {
        for (let i = 0; i <= 1; i++) {
          const lat = sk.map(y + i, 0, rows, -sk.HALF_PI, sk.HALF_PI);
          const lon = sk.map(x, 0, cols, -sk.PI, sk.PI);
          const noiseValue = sk.noise(x * noiseScale + time, y * noiseScale + time); // Valor de ruido Perlin parametrizado con tiempo
          const r = radius + noiseValue * maxdeform; // Ajusta el radio con el ruido
          const x1 = r * sk.cos(lat) * sk.cos(lon);
          const y1 = r * sk.cos(lat) * sk.sin(lon);
          const z1 = r * sk.sin(lat);
          // Utiliza las coordenadas finales del TRIANGLE_STRIP anterior como coordenadas iniciales
          sk.vertex(prevStripY[y].x, prevStripY[y].y, prevStripY[y].z);
          sk.vertex(x1, y1, z1);
        }
      }
      sk.endShape();
    }
  }
};

const P5 = new p5(s, "main-container");
