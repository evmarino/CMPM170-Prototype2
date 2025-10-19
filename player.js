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
    }
    move(dx,dy){
        this.col.set(COL.DX,dx);
        this.col.set(COL.DY,dy);
    }
    draw(){
        fill(255);
        ellipse(this.x,this.y,25);
        
        if (ringGrowing) {
            noFill();
            stroke(0);
            strokeWeight(3);
            ellipse(x, y, ringRadius * 2, ringRadius * 2);
            ringRadius += RING_SPEED;

            if (ringRadius > RING_MAX) {
                ringGrowing = false;
                ringRadius = 0;
            }
        }
    }
}