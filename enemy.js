class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    fill(0);
    ellipse(this.x + POWER_UP_RADIUS / 3, this.y + POWER_UP_RADIUS / 3, POWER_UP_RADIUS);
  }
}
