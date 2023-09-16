export default (width, height) => {
  // Ground does always have a 10px height 
  return {
    slingshot: {
      x: width / 2,
      y: height - 95,
      w: 150,
      h: 150,
      xa: width / 2,
      ya: height - 145,
    },
    birds: [
      {
        type: 'red',
      },
      {
        type: 'blue',
      },
      {
        type: 'yellow',
      },
      {
        type: 'red',
      },
      {
        type: 'bomb',
      },
      {
        type: 'red',
      },
      {
        type: 'blue',
      },
      {
        type: 'yellow',
      }
    ],
    boxes: (
      () => {
        const _boxes = [];

        for (let i = 0; i < 4; i++) {
          _boxes.push({
            x: width * 4 / 30,
            y: 50 * (i + 1),
            w: 50,
            h: 50,
            type: 'wood',
            life: 100,
          });
        }

        for (let i = 0; i < 4; i++) {
          _boxes.push({
            x: width * 26 / 30,
            y: 50 * (i + 1),
            w: 50,
            h: 50,
            type: 'wood',
            life: 100,
          });
        }

        for (let i = 0; i < 4; i++) {
          _boxes.push({
            x: width * 4 / 30,
            y: 50 * (i + 1) + height / 2,
            w: 50,
            h: 50,
            type: 'rock',
            life: 1000,
          });
        }

        return _boxes;
      }
    )(),
    pigs: [
      {
        x: width * 2 / 30,
        y: 160,
        r: 25,
        m: 5,
        life: 100,
      },
      {
        x: width * 28 / 30,
        y: 160,
        r: 25,
        m: 5,
        life: 100,
      },
      {
        x: width * 2 / 30,
        y: 160 + height / 2,
        r: 25,
        m: 5,
        life: 100,
      }
    ],
    walls: [
      {
        x: width / 2,
        y: height - 10,
        w: width,
        h: 20,
      },
      {
        x: 5,
        y: height / 2,
        w: 10,
        h: height,
      },
      {
        x: width - 5,
        y: height / 2,
        w: 10,
        h: height,
      },
      {
        x: width / 2,
        y: 5,
        w: width,
        h: 10,
      },
      {
        x: width * 27 / 30,
        y: height / 2,
        w: width * 6 / 30,
        h: 10,
      },
      {
        x: width * 3 / 30,
        y: height / 2,
        w: width * 6 / 30,
        h: 10,
      }
    ]
  }

};