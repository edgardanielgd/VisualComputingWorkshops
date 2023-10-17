const detail = 200
let angle=0, radius=300, radius2=50;
const startX = 0;
let xProof=0;
let t=1
let curve = 0;
const buildings_position = [{x:0,y:140},{x:0,y:420},{x:0,y:460},{x:50,y:170},{x:50,y:340},{x:50,y:420},{x:50,y:460},{x:100,y:200},{x:100,y:260},{x:150,y:210},{x:150,y:280},{x:150,y:330},
{x:100,y:490},{x:100,y:450}, {x:150,y:490}, {x:150,y:450}, {x:150,y:380},{x:220,y:200},{x:220,y:250},{x:270,y:250},{x:270,y:390},
{x:270,y:340},{x:330,y:260},{x:330,y:350},{x:380,y:350},{x:380,y:250},{x:410,y:240},{x:440,y:380},{x:490,y:400},{x:530,y:420},{x:560,y:410},{x:490,y:350},{x:490,y:300},{x:520,y:350},
{x:520,y:280},{x:520,y:240},{x:520,y:180},{x:570,y:360},{x:570,y:280},{x:570,y:240},{x:570,y:190},{x:630,y:360},{x:630,y:280},{x:630,y:240},{x:630,y:190}]
// change y to z
function setup(){
  p0 = createVector(startX,300);
  p1 = createVector(startX,100);
  p2 = createVector(150+startX,300);
  p3 = createVector(300+startX,300);
 
  p4= createVector(startX,300);
  p5 = createVector(startX,500);
  p6 = createVector(startX+150,300);
  p7 = createVector(300+startX,300);
 
  p8 = createVector(600+startX,300);
  p9 = createVector(600+startX,100);
  p10 = createVector(450+startX,300);
  p11 = createVector(300+startX,300);
 
  p12 = createVector(600+startX,300);
  p13 = createVector(600+startX,500);
  p14 = createVector(450+startX,300);
  p15 = createVector(300+startX,300); 
  
  
  for(let i=0; i<buildings_position.length;i+=1){
    buildings_position[i].col=[ Math.floor(Math.random() * (250 - 100) + 100), Math.floor(Math.random() * (250 - 100) + 100),Math.floor(Math.random() * (250 - 0) + 0)];
    buildings_position[i].h = Math.floor(Math.random() * (70 - 50) + 50);
  }
  
  console.log(buildings_position)
  
  
 
  //createCanvas(1400,1000,WEBGL);
  createCanvas(640,480,WEBGL);
  camera = createCamera();
  camera.setPosition(0,-10,300);
  camera.pan(-1.7);
  
  
  
 
}



function draw(){
  let z=0
  background(0);
  
  checkKeyUpdate();

  
   
  

  fill(250)
  /*
  line(p0.x,0,p0.y,p1.x,0,p1.y);
  line(p1.x,0,p1.y,p2.x,0,p2.y);
  line(p2.x,0,p2.y,p3.x,0,p3.y);
 
 
  line(p4.x,p4.y,p5.x,0,p5.y);
  line(p5.x,p5.y,p6.x,0,p6.y);
  line(p6.x,p6.y,p7.x,0,p7.y);
 
 
  line(p8.x,0,p8.y,p9.x,0,p9.y);
  line(p9.x,0,p9.y,p10.x,0,p10.y);
  line(p10.x,0,p10.y,p11.x,0,p11.y);
 
  line(p12.x,0,p12.y,p13.x,0,p13.y);
  line(p13.x,0,p13.y,p14.x,0,p14.y);
  line(p14.x,0,p14.y,p15.x,0,p15.y); */
 
 
  for (let t=0; t<=1; t+=1/40){
    const p01x = linear(p0.x,p1.x,t);
    const p12x = linear(p1.x,p2.x,t);
    const p23x = linear(p2.x,p3.x,t);
    
    const p45x = linear(p4.x,p5.x,t);
    const p56x = linear(p5.x,p6.x,t);
    const p67x = linear(p6.x,p7.x,t);
   
    const p89x = linear(p8.x,p9.x,t);
    const p910x = linear(p9.x,p10.x,t);
    const p1011x = linear(p10.x,p11.x,t);
    
    const p1213x = linear(p12.x,p13.x,t);
    const p1314x = linear(p13.x,p14.x,t);
    const p1415x = linear(p14.x,p15.x,t);


    const p01y = linear(p0.y,p1.y,t);
    const p12y = linear(p1.y,p2.y,t);
    const p23y = linear(p2.y,p3.y,t);
    
    const p45y = linear(p4.y,p5.y,t);
    const p56y = linear(p5.y,p6.y,t);
    const p67y = linear(p6.y,p7.y,t);
   
    const p89y = linear(p8.y,p9.y,t);
    const p910y = linear(p9.y,p10.y,t);
    const p1011y = linear(p10.y,p11.y,t);
   
    const p1213y = linear(p12.y,p13.y,t);
    const p1314y = linear(p13.y,p14.y,t);
    const p1415y = linear(p14.y,p15.y,t);
   

    //line(p01x,0,p01y,p12x,0,p12y);
    //line(p12x,0,p12y,p23x,0,p23y);

   
    //line(p45x,0,p45y,p56x,0,p56y);
    //line(p56x,0,p56y,p67x,0,p67y);
   
    //line(p89x,0,p89y,p910x,0,p910y);
    //line(p910x,0,p910y,p1011x,0,p1011y);
   
    //line(p1213x,0,p1213y,p1314x,0,p1314y);
    //line(p1314x,0,p1314y,p1415x,0,p1415y);

   
    const q0x = linear(p01x,p12x,t);
    const q0y = linear(p01y,p12y,t);
   
    const q1x = linear(p12x,p23x,t);
    const q1y = linear(p12y,p23y,t);
   
    const q2x = linear(p45x,p56x,t);
    const q2y = linear(p45y,p56y,t);
   
    const q3x = linear(p56x,p67x,t);
    const q3y = linear(p56y,p67y,t);
   
    const q4x = linear(p89x,p910x,t);
    const q4y = linear(p89y,p910y,t);
   
    const q5x = linear(p910x,p1011x,t);
    const q5y = linear(p910y,p1011y,t);
   
    const q6x = linear(p1213x,p1314x,t);
    const q6y = linear(p1213y,p1314y,t);
   
    const q7x = linear(p1314x,p1415x,t);
    const q7y = linear(p1314y,p1415y,t);
   
   
   
   
    //line(q0x,0,q0y,q1x,0,q1y);
    //line(q2x,0,q2y,q3x,0,q3y);
    //line(q4x,0,q4y,q5x,0,q5y);
    //line(q6x,0,q6y,q7x,0,q7y);
   
    const x1 = linear(q0x,q1x,t);
    const y1 = linear(q0y,q1y,t);
    
    const x2 = linear(q2x,q3x,t);
    const y2 = linear(q2y,q3y,t);
   
    const x3 = linear(q4x,q5x,t);
    const y3 = linear(q4y,q5y,t);
   
    const x4 = linear(q6x,q7x,t);
    const y4 = linear(q6y,q7y,t);
   

    drawCurvePath(x1,y1);
    drawCurvePath(x2,y2);
    drawCurvePath(x3,y3);
    drawCurvePath(x4,y4);
    
    
    drawControlPoints();
    drawBuildings();
    
   
  }
  

  
  
 
  
  if(curve===0){
  
    t=t%1;
    curve=curve%4
    console.log("curve: ",curve);
    console.log("t: ",t);
    
    const p01x = linear(p0.x,p1.x,t);
    const p12x = linear(p1.x,p2.x,t);
    const p23x = linear(p2.x,p3.x,t);
  
    const p01y = linear(p0.y,p1.y,t);
    const p12y = linear(p1.y,p2.y,t);
    const p23y = linear(p2.y,p3.y,t);
    
    const q0x = linear(p01x,p12x,t);
    const q0y = linear(p01y,p12y,t);
   
    const q1x = linear(p12x,p23x,t);
    const q1y = linear(p12y,p23y,t);
    
    const x1 = linear(q0x,q1x,t);
    const y1 = linear(q0y,q1y,t);
    
    
    
    camera.setPosition(x1,-20,y1);
    console.log("x and y: ",x1,"   ",y1);
    
    if(t+1/detail!==1){
      const p01xn = linear(p0.x,p1.x,t+1/detail);
      const p12xn = linear(p1.x,p2.x,t+1/detail);
      const p23xn = linear(p2.x,p3.x,t+1/detail);
     
    
    
      const p01yn = linear(p0.y,p1.y,t+1/detail);
      const p12yn = linear(p1.y,p2.y,t+1/detail);
      const p23yn = linear(p2.y,p3.y,t+1/detail);
      
      const q0xn = linear(p01x,p12x,t+1/detail);
      const q0yn = linear(p01y,p12y,t+1/detail);
     
      const q1xn = linear(p12x,p23x,t+1/detail);
      const q1yn = linear(p12y,p23y,t+1/detail);
      
      const x1n = linear(q0x,q1x,t+1/detail);
      const y1n = linear(q0y,q1y,t+1/detail);
      
      camera.lookAt(x1n,-20,y1n);
      
    } 
     t+=1/detail 
  
  }else if(curve===1){
    if(t<=0){
      t=1
    }
    console.log("curve: ",curve);
    console.log("t: ",t);
    
    const p01x = linear(p12.x,p13.x,t);
    const p12x = linear(p13.x,p14.x,t);
    const p23x = linear(p14.x,p15.x,t);
  
    const p01y = linear(p12.y,p13.y,t);
    const p12y = linear(p13.y,p14.y,t);
    const p23y = linear(p14.y,p15.y,t);
    
    const q0x = linear(p01x,p12x,t);
    const q0y = linear(p01y,p12y,t);
   
    const q1x = linear(p12x,p23x,t);
    const q1y = linear(p12y,p23y,t);
    
    const x1 = linear(q0x,q1x,t);
    const y1 = linear(q0y,q1y,t);
    
    
    
    camera.setPosition(x1,-20,y1);
    console.log("x and y: ",x1,"   ",y1);
    
    if(t+1/detail!==0){
      const p01xn = linear(p0.x,p1.x,t-1/detail);
      const p12xn = linear(p1.x,p2.x,t-1/detail);
      const p23xn = linear(p2.x,p3.x,t-1/detail);
     
    
    
      const p01yn = linear(p0.y,p1.y,t-1/detail);
      const p12yn = linear(p1.y,p2.y,t-1/detail);
      const p23yn = linear(p2.y,p3.y,t-1/detail);
      
      const q0xn = linear(p01x,p12x,t-1/detail);
      const q0yn = linear(p01y,p12y,t-1/detail);
     
      const q1xn = linear(p12x,p23x,t-1/detail);
      const q1yn = linear(p12y,p23y,t+1/detail);
      
      const x1n = linear(q0x,q1x,t-1/detail);
      const y1n = linear(q0y,q1y,t-1/detail);
      
      camera.lookAt(x1n,-20,y1n);
      
    }
    
    
    t-=1/detail 
  
  }else if(curve===2){
    t=t%1;
    curve=curve%4
    console.log("curve: ",curve);
    console.log("t: ",t);
    
    const p01x = linear(p8.x,p9.x,t);
    const p12x = linear(p9.x,p10.x,t);
    const p23x = linear(p10.x,p11.x,t);
  
    const p01y = linear(p8.y,p9.y,t);
    const p12y = linear(p9.y,p10.y,t);
    const p23y = linear(p10.y,p11.y,t);
    
    const q0x = linear(p01x,p12x,t);
    const q0y = linear(p01y,p12y,t);
   
    const q1x = linear(p12x,p23x,t);
    const q1y = linear(p12y,p23y,t);
    
    const x1 = linear(q0x,q1x,t);
    const y1 = linear(q0y,q1y,t);
    
    
    
    camera.setPosition(x1,-20,y1);
    console.log("x and y: ",x1,"   ",y1);
    
    if(t+1/detail!==1){
      const p01xn = linear(p0.x,p1.x,t+1/detail);
      const p12xn = linear(p1.x,p2.x,t+1/detail);
      const p23xn = linear(p2.x,p3.x,t+1/detail);
     
    
    
      const p01yn = linear(p0.y,p1.y,t+1/detail);
      const p12yn = linear(p1.y,p2.y,t+1/detail);
      const p23yn = linear(p2.y,p3.y,t+1/detail);
      
      const q0xn = linear(p01x,p12x,t+1/detail);
      const q0yn = linear(p01y,p12y,t+1/detail);
     
      const q1xn = linear(p12x,p23x,t+1/detail);
      const q1yn = linear(p12y,p23y,t+1/detail);
      
      const x1n = linear(q0x,q1x,t+1/detail);
      const y1n = linear(q0y,q1y,t+1/detail);
      
      camera.lookAt(x1n,-20,y1n);
      
    } 
     t+=1/detail 
    
  
  }else if(curve===3){
    if(t<=0){
      t=1
    }
    console.log("curve: ",curve);
    console.log("t: ",t);
    
    const p01x = linear(p4.x,p5.x,t);
    const p12x = linear(p5.x,p6.x,t);
    const p23x = linear(p6.x,p7.x,t);
  
    const p01y = linear(p4.y,p5.y,t);
    const p12y = linear(p5.y,p6.y,t);
    const p23y = linear(p6.y,p7.y,t);
    
    const q0x = linear(p01x,p12x,t);
    const q0y = linear(p01y,p12y,t);
   
    const q1x = linear(p12x,p23x,t);
    const q1y = linear(p12y,p23y,t);
    
    const x1 = linear(q0x,q1x,t);
    const y1 = linear(q0y,q1y,t);
    
    
    
    camera.setPosition(x1,-20,y1);
    console.log("x and y: ",x1,"   ",y1);
    
    if(t+1/detail!==0){
      const p01xn = linear(p0.x,p1.x,t-1/detail);
      const p12xn = linear(p1.x,p2.x,t-1/detail);
      const p23xn = linear(p2.x,p3.x,t-1/detail);
     
    
    
      const p01yn = linear(p0.y,p1.y,t-1/detail);
      const p12yn = linear(p1.y,p2.y,t-1/detail);
      const p23yn = linear(p2.y,p3.y,t-1/detail);
      
      const q0xn = linear(p01x,p12x,t-1/detail);
      const q0yn = linear(p01y,p12y,t-1/detail);
     
      const q1xn = linear(p12x,p23x,t-1/detail);
      const q1yn = linear(p12y,p23y,t+1/detail);
      
      const x1n = linear(q0x,q1x,t-1/detail);
      const y1n = linear(q0y,q1y,t-1/detail);
      
      camera.lookAt(x1n,-20,y1n);
      
    }
    
    
    t-=1/detail 
  
  }
  
  if(curve===0 && t>=0.998){
    curve=1;
    t=1;
  }else if(curve === 1 && t<=0.01){
    curve=2;
    t=0;
  }else if(curve === 2 && t>=0.999999){
    curve=3;
    t=1;
  }else if(curve === 3 && t<=0.01){
    curve=0;
    t=0;
  }
  
  

}







function drawCurvePath(x,y){
    fill(220,5,0);
    push();
    translate(x,0,y);
    box(2,0.5,2,5,5);
    pop();
}



function drawControlPoints(){

    drawControlPoint(p0.x,p0.y);
    drawControlPoint(p1.x,p1.y);
    drawControlPoint(p2.x,p2.y);
    drawControlPoint(p3.x,p3.y);
    drawControlPoint(p4.x,p4.y);
    drawControlPoint(p5.x,p5.y);
    drawControlPoint(p6.x,p6.y);
    drawControlPoint(p7.x,p7.y);
    drawControlPoint(p8.x,p8.y);
    drawControlPoint(p9.x,p9.y);
    drawControlPoint(p10.x,p10.y);
    drawControlPoint(p11.x,p11.y);
    drawControlPoint(p12.x,p12.y);
    drawControlPoint(p13.x,p13.y);
    drawControlPoint(p14.x,p14.y);
    drawControlPoint(p15.x,p15.y);
}

function drawControlPoint(p1,p2){
    
    fill(250,250,0);
    push();
    translate(p1,0,p2);
    ellipsoid(5,5,5,5,5);
    pop();
}

function drawBuildings(){
  
  for(let i=0; i<buildings_position.length;i+=1){
    drawBuilding(buildings_position[i].x,buildings_position[i].y,buildings_position[i].h,buildings_position[i].col);
  }
  
  
}

function drawBuilding(x,y,h,col){

    //stroke(0,0,250);
    fill(col[0],col[1],col[2]);
    push();
    translate(x,0,y);
    box(20,h,20,20,20);
    pop();
}

function linear(p0,p1,t){
  return (1-t)*p0+p1*t;
}


const checkKeyUpdate = () => {
    let x_offset = 0;
    let y_offset = 0;
    let z_offset = 0;
    let xy_rotation = 0;
    let xz_rotation = 0;

    if (keyIsDown(81)) { // Q
      y_offset = 3;
    }
    if (keyIsDown(69)) { // E
      y_offset = -3;
    }
    if (keyIsDown(87)) { // W
      z_offset = -3;
    }
    if (keyIsDown(83)) { // S
      z_offset = 3;
    }
    if (keyIsDown(65)) { // A
      x_offset = -3;
    }
    if (keyIsDown(68)) { // D
      x_offset = 3;
    }
    if (keyIsDown(85)) { // U
      xy_rotation = 0.05;
    }
    if (keyIsDown(73)) { // I
      xy_rotation = -0.05;
    }
    if (keyIsDown(89)) { // Y
      xz_rotation = -0.05;
    }
    if (keyIsDown(72)) { // H
      xz_rotation = 0.05;
    }
    
    console.log( "camera location: ",x_offset, y_offset, z_offset);

    camera.move(x_offset, y_offset, z_offset);
  
    camera.pan(xy_rotation);
    camera.tilt(xz_rotation);
  }