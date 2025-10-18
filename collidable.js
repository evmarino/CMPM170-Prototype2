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
            [COL.ON_X]: {},
            [COL.ON_Y]: {},
            [COL.TRIGGER]:false
        };
        //i like compiler errors i think they make debugging easier
        //if they annoy you uh... sobbry ;-;
        for (x in this.selections){
            if (this.vars[x] === undefined)
                throw new Error("Passed argument contains a non-existant collider variable: " + x);
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
    setEvent(xOrY, func, eventName = ""){
        if (xOrY != COL.ON_X && xOrY != COL.ON_Y)
            throw new Error("Invalid event. Argument for method call must be COL.ON_X or COL.ON_Y.");
        if (typeof func != "function")
            throw new Error("Event to execute must be a function (rip).");
        this.vars[xOrY][eventName] = func;
    }
    removeEvent(xOrY, eventName = ""){
        if (xOrY != COL.ON_X && xOrY != COL.ON_Y)
            throw new Error("Invalid event. Argument for method call must be COL.ON_X or COL.ON_Y.");
        if (this.vars[xOrY][eventName] === undefined)
            throw new Error("Cannot remove event that does not exist.");
        delete this.vars[xOrY][eventName];
    }
    dispatchEvent(xOrY){
        if (xOrY != COL.ON_X && xOrY != COL.ON_Y)
            throw new Error("Invalid event. Argument for method call must be COL.ON_X or COL.ON_Y.");
        for (x in this.vars[xOrY])
            this.vars[xOrY][x]();
    }
    //both meeting and update should probably be changed so that meeting returns a list of interacted with objects
    //with this if two colliders overlap the second to be instantiated will not be interacted with
    //id fix it rn but im lazy :)
    meeting(x,y){
        let myX1 = x + this.vars[COL.W];
        let myY1 = y + this.vars[COL.H];
        for (obj of AllColiders){
            let otherX0 = obj.get(COL.X);
            let otherY0 = obj.get(COL.Y);
            let otherX1 = otherX0 + obj.get(COL.W);
            let otherY1 = otherY0 + obj.get(COL.H);
            if (myX1 >= otherX0 && x <= otherX1 && myY1 >= otherY0 && y <= otherY1)
                return obj;
        }
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