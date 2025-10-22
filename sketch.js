//let x; let y;

//const W = 87; const A = 65; const S = 83; const D = 68; const R = 82; const SPACE = 32;

//let ringRadius = 0;
//let ringGrowing = false;
let player;
// let wall;
let level;
let powerup;
//p is pressed and is 1 the draw frame when the key is initially pressed down
//r is released and is 1 the draw frame the key is released
//d is down and is 1 from when p is 1 to when r is 1 not including when r is 1
let inputs = {
    ['w']: {p: 0, r: 0, d: 0},
    ['a']: {p: 0, r: 0, d: 0},
    ['s']: {p: 0, r: 0, d: 0},
    ['d']: {p: 0, r: 0, d: 0},
    ['r']: {p: 0, r: 0, d: 0},
    [' ']: {p: 0, r: 0, d: 0},
    ['arrowright']: {p: 0, r: 0, d: 0},
    ['arrowleft']:  {p: 0, r: 0, d: 0},
    ['arrowup']:    {p: 0, r: 0, d: 0},
    ['arrowdown']:  {p: 0, r: 0, d: 0},
};

function setup(){
    createCanvas(windowWidth, windowHeight);
    //x = width/2;
    //y = height/2;
    player = new Player({x: width/2, y: height/2 + 40});
    // wall = new Collider({x: 50, w: width/3, h: height/3});
    // console.log(wall.get("x"));

    powerup = new PowerUp(width / 2 + 100, height / 2);

    const LEVEL_WIDTH = 50;
    const LEVEL_HEIGHT = 50;

    const CENTER_SIZE = 0.10;
    const CENTER_WIDTH = LEVEL_WIDTH * CENTER_SIZE;
    const CENTER_HEIGHT = LEVEL_HEIGHT * CENTER_SIZE;

    level = new Level(50, 50, CENTER_WIDTH, CENTER_HEIGHT);
}

//disables scrolling on keypresses
window.addEventListener("keydown", function(event) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].indexOf(event.code) > -1) {event.preventDefault();}}, 0);

function draw(){
    
    //game logic
    player.update();

    handleKeys();

    for (let x of AllColliders)
        x.update();
    
    //visuals
    background(221,199,160);

    level.draw();

    powerup.draw();
    
    //fill(255);
    //ellipse(x,y,25,25);
    player.draw();

    /*
    noFill();
    stroke(0);
    strokeWeight(3);
    rectMode(CENTER);
    rect(width * 0.8 , height/2, 400, 600);
    rect(width * 0.48 , height/2, 500, 200);
    rectMode(CORNERS);
    rect(wall.get("x"), wall.get("y"), wall.get("w")+wall.get("x"), wall.get("h")+wall.get("y"))
    */

    // if (ringGrowing) {
    //     noFill();
    //     stroke(0);
    //     strokeWeight(3);
    //     ellipse(x, y, ringRadius * 2, ringRadius * 2);
    //     ringRadius += RING_SPEED;

    //     if (ringRadius > RING_MAX) {
    //         ringGrowing = false;
    //         ringRadius = 0;
    //     }
    // }
}

function keyPressed(event){
    let key = event.key.toLowerCase();
    if (inputs[key] !== undefined)
        inputs[key] = {p: 1, r: 0, d: 1};
}
function keyReleased(event){
    let key = event.key.toLowerCase();
    if (inputs[key] !== undefined)
        inputs[key] = {p: 0, r: 1, d: 0};
}

function handleKeys(){

    // if(inputs['a'].d || inputs['arrowleft'].d) { x = x - 5;}
    // if(inputs['d'].d || inputs['arrowright'].d){ x = x + 5;}
    // if(inputs['w'].d || inputs['arrowup'].d)   { y = y - 5;}
    // if(inputs['s'].d || inputs['arrowdown'].d) { y = y + 5;}

    // if (inputs[' '].p || inputs['r'].p) { 
    //     ringGrowing = true;
    //     ringRadius = 28; 
    // }

    for (let x in inputs){
        inputs[x].p = 0;
        inputs[x].r = 0;
    }

}
