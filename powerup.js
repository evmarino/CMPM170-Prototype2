let powerups = [];
const POWERUPCOUNT = 10;
const POWER_UP_RADIUS = 25;

// TODO: Different power-up types, this is just growth
class PowerUp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
    fill(0, 255, 0);
    ellipse(this.x, this.y, POWER_UP_RADIUS);
  }
}
