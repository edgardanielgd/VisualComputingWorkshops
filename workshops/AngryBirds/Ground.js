import Box from "/workshops/AngryBirds/Box.js";

class Ground extends Box {
  
  constructor(x, y, w, h, world){
    super(x, y, w, h, null, world, {isStatic: true});
  }
  
}

export default Ground;