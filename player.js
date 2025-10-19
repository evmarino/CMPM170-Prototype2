const RING_MAX = 140;
const RING_SPEED = 4;

class Player{
    constructor(selections = {}){
        this.ringGroing = false;
        this.ringRadius = 0;
        this.x = 0;
        this.y = 0;
        this.dy = 0;
        this.dx = 0;
        for (let x in selections){
            if (this[x] === undefined)
                throw new Error("Non-existant Player variable: " + x);
            if (typeof this[x] == "function")
                throw new Error("Please don't modify methods dynamically ;-; its mean.");
            this[x] = selections[x];
        }
    }
    set(varToSet, value, skipCheck = false){
        if (!skipCheck && this[varToSet] === undefined)
            throw new Error("Non-existant Player variable: " + varToSet);
        if (typeof this[x] == "function")
            throw new Error("Please don't modify methods dynamically ;-; its mean.");
        this[varToSet] = value;
        console.log(this)
    }
    get(varToGet, skipCheck = false){
        if (!skipCheck && this[varToSet] === undefined)
            throw new Error("Non-existant Player variable: " + varToSet);
        //you can by definition get methods through this
        //idk why youd wanna do that but you could
        return this[varToGet];
    }
    draw(){
        fill(255);
        ellipse(this.x,this.y,25);
        
        if (this.ringGrowing) {
            noFill();
            stroke(0);
            strokeWeight(3);
            ellipse(this.x, this.y, this.ringRadius * 2, this.ringRadius * 2);
            this.ringRadius += RING_SPEED;

            if (this.ringRadius > RING_MAX) {
                this.ringGrowing = false;
                this.ringRadius = 0;
            }
        }
    }
}