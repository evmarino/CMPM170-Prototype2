
let enemies = [];
const ENEMIESCOUNT = 10;
const ENEMY_DIAMETER = 50;

// used to track spacing of enemies so they dont just pile on each other
let enemyMap = new Map();

class Enemy {
  constructor(x, y, h = 10, c = 0, speed = 1) {
    this.x = x;
    this.y = y;
    this.health = h;
    this.color = c;
    this.speed = speed;

    let spaceX = Math.floor((this.x + ENEMY_DIAMETER / 2) / ENEMY_DIAMETER);
    let spaceY = Math.floor((this.y + ENEMY_DIAMETER / 2) / ENEMY_DIAMETER);

    let space = [spaceX, spaceY].join(",");

    enemyMap.set(space, this);

    if (isHappy)
      this.speed *= 2;

    for (let i = 0; i < AllColliders.length; i ++){
      let x = AllColliders[i].get("x");
      let y = AllColliders[i].get("y");
      let w = AllColliders[i].get("w");
      let h = AllColliders[i].get("h");
      if (x <= this.x && x + w >= this.x && y <= this.y && y + h >= this.y){
        this.x = random(width);
        this.y = random(height);
        i = 0;
      }
    }
  }

  update() {
    let pdx = player.x - this.x;
    let pdy = player.y - this.y;

    let angle = Math.atan2(pdy, pdx);

    let newX = this.x + Math.cos(angle) * this.speed;
    let newY = this.y + Math.sin(angle) * this.speed;

    let curSpaceX = Math.floor((this.x + ENEMY_DIAMETER / 2) / ENEMY_DIAMETER);
    let curSpaceY = Math.floor((this.y + ENEMY_DIAMETER / 2) / ENEMY_DIAMETER);

    let curSpace = [curSpaceX, curSpaceY].join(",");

    let nextSpaceX = Math.floor((newX + ENEMY_DIAMETER / 2) / ENEMY_DIAMETER);
    let nextSpaceY = Math.floor((newY + ENEMY_DIAMETER / 2) / ENEMY_DIAMETER);

    let nextSpace = [nextSpaceX, nextSpaceY].join(",");

    if (nextSpaceX != curSpaceX || nextSpaceY != curSpaceY) {
      if (enemyMap.has(nextSpace)) {
        if (curSpaceX != nextSpaceX) {
          newX = this.x;
        }
        if (curSpaceY != nextSpaceY) {
          newY = this.y;
        }
      } else {
        enemyMap.set(nextSpace, this);
        enemyMap.delete(curSpace);

        console.log('move?');
      }
    }

    this.x = newX;
    this.y = newY;
  }

  draw() {
    stroke(0);
    strokeWeight(3);
    fill(this.color);
    ellipse(this.x, this.y, ENEMY_DIAMETER);
    this.color *= 0.9;

    // DEBUG RENDER for ENEMY MAP POSITIONS
    /*
    for (const [k, v] of enemyMap) {
      let coords = k.split(",");

      let cX = Number(coords[0]);
      let cY = Number(coords[1]);
      
      stroke(255, 0, 0);
      strokeWeight(3);
      noFill();
      ellipse(cX * ENEMY_DIAMETER, cY * ENEMY_DIAMETER, ENEMY_DIAMETER);
    }
    */
  }

  removeFromMap() {
    let curSpaceX = Math.floor((this.x + ENEMY_DIAMETER / 2) / ENEMY_DIAMETER);
    let curSpaceY = Math.floor((this.y + ENEMY_DIAMETER / 2) / ENEMY_DIAMETER);

    let curSpace = [curSpaceX, curSpaceY].join(",");

    enemyMap.delete(curSpace);
  }
}
