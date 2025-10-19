//please don't modify AllColliders by hand it'd hurt my feelings :(
var AllColliders = [];

function clamp(x, min, max){
    return Math.max(min, Math.min(max, x));
}

class Collider{
    constructor (selections = {}){
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.dx = 0;
        this.dy = 0;
        this.on_x = {};
        this.on_y = {};
        this.trigger = false;
        //i like compiler errors i think they make debugging easier
        //if they annoy you uh... sobbry ;-;
        for (let x in selections){
            if (this[x] === undefined)
                throw new Error("Collider variable doesn't exist: " + x);
            if (typeof this[x] == "function")
                throw new Error("Please don't modify methods dynamically ;-; its mean.");
            this[x] = selections[x];
        }
    }
    set(varToSet, value, skipCheck = false){
        if (!skipCheck && this[varToSet] === undefined)
            throw new Error("Collider variable doesn't exist: " + varToSet);
        if (typeof this[x] == "function")
            throw new Error("Please don't modify methods dynamically ;-; its mean.");
        this[varToSet] = value;
    }
    get(varToGet, skipCheck = false){
        if (!skipCheck && this[varToSet] === undefined)
            throw new Error("Collider variable doesn't exist: " + varToSet);
        return this[varToGet];
    }
    setEvent(xOrY, func, eventName = ""){
        if (xOrY != on_x && xOrY != on_y)
            throw new Error("Invalid event. Argument for method call must be on_x or on_y.");
        if (typeof func != "function")
            throw new Error("Event to execute must be a function (rip).");
        this[xOrY][eventName] = func;
    }
    removeEvent(xOrY, eventName = ""){
        if (xOrY != on_x && xOrY != on_y)
            throw new Error("Invalid event. Argument for method call must be on_x or on_y.");
        if (this[xOrY][eventName] === undefined)
            throw new Error("Cannot remove event that does not exist.");
        delete this[xOrY][eventName];
    }
    dispatchEvent(xOrY){
        if (xOrY != on_x && xOrY != on_y)
            throw new Error("Invalid event. Argument for method call must be on_x or on_y.");
        for (let x in this[xOrY])
            this[xOrY][x]();
    }
    //both meeting and update should probably be changed so that meeting returns a list of interacted with objects
    //with this if two colliders overlap the second to be instantiated will not be interacted with
    //id fix it rn but im lazy :)
    meeting(x,y){
        let myX1 = x + this.w;
        let myY1 = y + this.h;
        for (let obj of AllColliders){
            let otherX0 = obj.get("x");
            let otherY0 = obj.get("y");
            let otherX1 = otherX0 + obj.get("w");
            let otherY1 = otherY0 + obj.get("h");
            if (myX1 >= otherX0 && x <= otherX1 && myY1 >= otherY0 && y <= otherY1)
                return obj;
        }
        return null;
    }
    update(){
        let _dx = this.dy;
        let _dy = this.dy;
        let temp = 0;
        let object = null;

        //kinda brute force-y way to do this but it works well promise
        //creeps forward until a solid collider is hit and then stops
        while ((_dx != 0 || _dy != 0)){
            temp = clamp(_dx,-1,1);
            object = this.meeting(this.x+temp,this.y);
            //if there was no collision
            if (!object){
                this.x += temp;
            //if the object collided with is not solid
            }else if (object.get("trigger")){
                object.dispatchEvent(on_x);
                this.x += temp;
            //if this object is not solid
            }else if (this.trigger){
                this.dispatchEvent(on_x);
            //if both objects are solid
            }else{
                this.dispatchEvent(on_x);
                object.dispatchEvent(on_x);
            }
            _dx = (_dx - temp);
            temp = clamp(_dy,-1,1);
            object = this.meeting(this.x,this.y+temp);
            if (!object){
                this.y += temp;
            //if the object collided with is not solid
            }else if (object.get("trigger")){
                object.dispatchEvent(on_y);
                this.y += temp;
            //if this object is not solid
            }else if (this.trigger){
                this.dispatchEvent(on_y);
            //if both objects are solid
            }else{
                this.dispatchEvent(on_y);
                object.dispatchEvent(on_y);
            }
            _dy = (_dy - temp);
        }
    }
}