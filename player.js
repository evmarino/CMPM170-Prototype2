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
                throw new Error("Passed argument contains a non-existant player variable: " + x);
            this[x] = selections[x];
        }
    }
    set(varToSet, value, skipCheck = false){
        if (!skipCheck && this[varToSet] === undefined)
            throw new Error("Passed argument contains a non-existant player variable: " + varToSet);
        this[varToSet] = value;
        console.log(this)
    }
    get(varToGet, skipCheck = false){
        if (!skipCheck && this.vars[varToSet] === undefined)
            throw new Error("Passed argument contains a non-existant player variable: " + varToSet);
        return this.vars[varToGet];
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