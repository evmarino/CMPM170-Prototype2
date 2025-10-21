const RING_MAX = 140;
const RING_SPEED = 1;

/*
Player class is instantiated with one argument in the form of an object
this allows arguments to be passed in any order or even admitted
that object is allowed the following properties
yes i did just copy and paste this from the collider class:
x - the x position
y - you'll never guess
s - the width and height of the player (since they are a circle)
dx - the velocity on the x axis
dy - a secret :)
ringGrowing - a bool that determines if the ring around the player is
    honestly this is a good variable name u get it
ringRadius - some kinda ring radius
ringStartRadius - start kinda ring radius
*/

class Player{
    constructor(selections = {}){
        this.ringMode = "grow";
        this.ringRadius = 5;
        this.ringChangeRate = 10;
        this.newTargetRadius = 0;
        this.ringDirection = -1;

        this.x = 0;
        this.y = 0;
        this.s = 25;
        this.dy = 0;
        this.dx = 0;

        for (let x in selections){
            if (this[x] === undefined)
                throw new Error("Non-existant Player variable: " + x);
            if (typeof this[x] == "function")
                throw new Error("Please don't modify methods dynamically ;-; its mean.");
            this[x] = selections[x];
        }

        this.col = new Collider({x: this.x, y: this.y, w: this.s, h: this.s});
        this.sHalf = this.s/2;
    }
    set(varToSet, value, skipCheck = false){
        if (!skipCheck && this[varToSet] === undefined)
            throw new Error("Non-existant Player variable: " + varToSet);
        if (typeof this[x] == "function")
            throw new Error("Please don't modify methods dynamically ;-; its mean.");
        this[varToSet] = value;
        this.col.set("x", this.x);
        this.col.set("y", this.y);
    }
    get(varToGet, skipCheck = false){
        if (!skipCheck && this[varToSet] === undefined)
            throw new Error("Non-existant Player variable: " + varToSet);
        //you can by definition get methods through this
        //idk why youd wanna do that but you could
        return this[varToGet];
    }
    draw(){
        this.x = this.col.get("x");
        this.y = this.col.get("y");

        fill(255);
        rectMode(CENTER);
        ellipse(this.x+this.sHalf,this.y+this.sHalf,this.s);

        noFill();
        stroke(0);
        strokeWeight(3);
        ellipse(this.x+this.sHalf, this.y+this.sHalf, this.ringRadius * 2, this.ringRadius * 2);
    }
    update(){
        this.x = this.col.get("x");
        this.y = this.col.get("y");

        let hmove = (inputs['d'].d || inputs['arrowright'].d) - (inputs['a'].d || inputs['arrowleft'].d);
        let vmove = (inputs['s'].d || inputs['arrowdown'].d) - (inputs['w'].d || inputs['arrowup'].d);
        this.dx = hmove * 5;
        this.dy = vmove * 5;

        if (this.ringRadius < RING_MAX && (inputs[' '].p || inputs['r'].p)) {
            switch (this.ringMode) {
                case "grow":
                    this.ringChanging = true;
                    this.ringDirection = 1;
                    this.newTargetRadius = this.ringRadius + this.ringChangeRate;
                    break;
                case "shrink":
                    break;
            }
        } else if (!this.ringChanging) {
            switch (this.ringMode) {
                case "grow":
                    this.ringChanging = true;
                    this.ringDirection = -1;
                    this.newTargetRadius = this.ringRadius - (this.ringChangeRate / 2);
                    break;
                case "shrink":
                    break;
            }
        }

        this.col.set("dx", this.dx);
        this.col.set("dy", this.dy);

        if (this.ringChanging) {
            console.log(this.ringDirection);
            this.ringRadius += this.ringDirection * RING_SPEED;

            if (Math.abs(this.ringRadius - this.newTargetRadius) <= RING_SPEED) {
                this.ringChanging = false;
            }
        }

        if (this.ringRadius < 0) {
            this.ringRadius = 0;
        }
    }
}
