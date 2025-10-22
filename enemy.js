
let enemies = [];
const ENEMIESCOUNT = 10;
const ENEMY_RADIUS = 50;

class Enemy {
  constructor(x, y, h = 10, c = 0) {
    this.x = x;
    this.y = y;
    this.health = h;
    this.color = c;
  }

  draw() {
    stroke(0);
    strokeWeight(3);
    fill(this.color);
    console.log(this.color);
    ellipse(this.x, this.y, ENEMY_RADIUS);
    this.color *= 0.9;
  }
}
