let x;
let y;

const W = 87;
const A = 65;
const S = 83;
const D = 68;

function setup(){
    createCanvas(windowWidth, windowHeight);
    x = width/2;
    y = height/2; 

}

function draw(){
    background(221,199,160);
    
    fill(255);
    ellipse(x,y,25,25);

    handleKeys();

    noFill();
    stroke(0);
    strokeWeight(3);
    rectMode(CENTER);
    rect(width * 0.8 , height/2, 400, 600);

    noFill();
    stroke(0);
    strokeWeight(3);
    rectMode(CENTER);
    rect(width * 0.48 , height/2, 500, 200);
    
}

function handleKeys(){

    if(keyIsDown(A)){ x = x - 5;}
    if(keyIsDown(D)){ x = x + 5;}
    if(keyIsDown(W)){ y = y - 5;}
    if(keyIsDown(S)){ y = y + 5;}

}
