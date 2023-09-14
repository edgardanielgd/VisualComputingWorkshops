const config = {
  // Distance a boid must be from others to avoid them
  SEPARATION_DISTANCE : 300,
  SEPARATION_FACTOR : 0.5,
  
  // Distance a bird must be from others to be attracted by them
  GROUPING_DISTANCE : 350,
  GROUPING_FACTOR : 0.5,
  CENTERING_FACTOR : 0.005,
  
  // Cruising velocity settings
  COHESION_FACTOR : 0.5,
  
  // Boids near window border will turn back
  TURNING_FACTOR : 100,
  TURNING_PREVIEW : 0,
  
  MAX_SPEED : 3,

  FORCE_ATTRACTION_RANGE : 100,

  ATTRACTOR_SIZE : 50,

  ATTRACTOR_GRAVITY: 0.5,

  ATTRACTOR_IN_COLOR: [0,0,255],

  ATTRACTOR_OUT_COLOR: [255,0,0],

  PREDATION_FACTOR : 1.8,

  PREDATION_EVASION_RANGE: 200,
    
  PREDATION_AVOID : 0.8,

  EAT_DISTANCE: 10,
}

export default config;