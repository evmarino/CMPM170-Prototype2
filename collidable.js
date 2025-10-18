const COL = Object.freeze({X: 0, Y: 1, W: 2, H: 3, DX: 4, DY: 5, TRIGGER: 6, ON_X: 7, ON_Y: 8});
var AllColiders = [];

function clamp(x, min, max){
    return Math.max(min, Math.min(max, x));
}

class Collider{
    constructor (selections = {}){
        this.vars = {
            [COL.X]:0,
            [COL.Y]:0,
            [COL.W]:0,
            [COL.H]:0,
            [COL.DX]:0,
            [COL.DY]:0,
            [COL.ON_X]: [],
            [COL.ON_Y]: [],
            [COL.TRIGGER]:false
        };
        for (x in this.vars){
            if (selections[x] === undefined)
                continue;
            this.vars[x] = selections[x];
        }
    }
    set(varToSet, value){
        this.vars[varToSet] = varToSet;
    }
    get(varToGet = null){
        if (varToGet === null)
            return this.vars;
        return this.vars[varToGet];
    }
    meeting(x,y){
        return null;
    }
    update(){
        let _dx = this.vars[COL.DX];
        let _dy = this.vars[COL.DY];
        let temp = 0;
        let object = null;

        //kinda brute force-y way to do this but it works well promise
        //creeps forward until a solid collider is hit and then stops
        while ((_dx != 0 || _dy != 0)){
            temp = clamp(_dx,-1,1);
            object = this.meeting(this.vars[COL.X]+temp,this.vars[COL.Y]);
            //if there was no collision
            if (!object){
                this.vars[COL.X] += temp;
            //if the object collided with is not solid
            }else if (object.get(COL.TRIGGER)){
                object.dispatchEvent(COL.ON_X);
                this.vars[COL.X] += temp;
            //if this object is not solid
            }else if (vars[COL.TRIGGER]){
                this.dispatchEvent(COL.ON_X);
            //if both objects are solid
            }else{
                this.dispatchEvent(COL.ON_X);
                object.dispatchEvent(COL.ON_X);
            }
            _dx = (_dx - temp);
            temp = clamp(_dy,-1,1);
            object = this.meeting(this.vars[COL.X],this.vars[COL.Y]+temp);
            if (!object){
                this.vars[COL.Y] += temp;
            //if the object collided with is not solid
            }else if (object.get(COL.TRIGGER)){
                object.dispatchEvent(COL.ON_Y);
                this.vars[COL.Y] += temp;
            //if this object is not solid
            }else if (vars[COL.TRIGGER]){
                this.dispatchEvent(COL.ON_Y);
            //if both objects are solid
            }else{
                this.dispatchEvent(COL.ON_Y);
                object.dispatchEvent(COL.ON_Y);
            }
            _dy = (_dy - temp);
        }
    }
}