export default (width, height) => {
  // Ground does always have a 10px height 
  return {
    slingshot: {
      x: width / 8,
      y: height - 95,
      w: 150,
      h: 150,
      xa: width / 8,
      ya: height - 145,
    },
    birds: [
      {
        type: 'bomb',
        mass: 5,
        radius: 25,
      },
      {
        type: 'yellow',
        mass: 5,
        radius: 25,
      },
      {
        type: 'blue',
        mass: 5,
        radius: 25,
      },
      {
        type: 'bomb',
        mass: 5,
        radius: 25,
      },
      {
        type: 'bigred',
        mass: 20,
        radius: 35,
      }
    ],
    boxes: (
      () => {
        const _boxes = [];

        for (let i = 0; i < 9; i++) {
          _boxes.push({
            x: width / 2 + (i * 50),
            y: height - 45,
            w: 50,
            h: 50,
            type: 'rock',
            life: 500,
          });
        }

        _boxes.push({
          x: width * 4 / 9,
          y: height - 45,
          w: 50,
          h: 100,
          type: 'glass',
          life: 10,
        });

        return _boxes;
      }
    )(),
    pigs: [
      {
        x: width * 9 / 16,
        y: height - 100,
        r: 25,
        m: 5,
        life: 100,
      },
      {
        x: width * 10 / 16,
        y: height - 100,
        r: 25,
        m: 5,
        life: 100,
      },
      {
        x: width * 11 / 16,
        y: height - 100,
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
      }
    ]
  }

};