
let enemies = [];
const ENEMIESCOUNT = 10;
const ENEMY_DIAMETER = 50;

class Enemy {
  constructor(x, y, h = 10, c = 0) {
    this.x = x;
    this.y = y;
    this.health = h;
    this.color = c;
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

  draw() {
    stroke(0);
    strokeWeight(3);
    fill(this.color);
    ellipse(this.x, this.y, ENEMY_DIAMETER);
    this.color *= 0.9;
  }
}
