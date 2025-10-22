const POWER_UP_RADIUS = 25;

// TODO: Different power-up types, this is just growth
class PowerUp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    fill(0, 255, 0);
    ellipse(this.x + POWER_UP_RADIUS / 2, this.y + POWER_UP_RADIUS / 2, POWER_UP_RADIUS);
  }
}
