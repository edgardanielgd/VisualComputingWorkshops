import Box from "/workshops/AngryBirds/Box.js";

class Ground extends Box {

  constructor({ x, y, w, h, world } = {}) {
    super({ x, y, w, h, img: null, world, options: { isStatic: true } });
  }

}

export default Ground;