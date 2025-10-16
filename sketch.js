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
    ellipse(x,y,50,50);
    handleKeys();
}

function handleKeys(){

    if(keyIsDown(A)){ x = x - 5;}
    if(keyIsDown(D)){ x = x + 5;}
    if(keyIsDown(W)){ y = y - 5;}
    if(keyIsDown(S)){ y = y + 5;}

}
