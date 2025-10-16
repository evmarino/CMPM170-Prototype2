let x;
let y;

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

    if(keyIsDown(LEFT_ARROW)){ x = x - 5; }
    if(keyIsDown(RIGHT_ARROW)){ x = x + 5;}
    if(keyIsDown(UP_ARROW)){ y = y - 5;   }
    if(keyIsDown(DOWN_ARROW)){ y = y + 5; }

}
