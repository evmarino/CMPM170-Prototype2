const CELL_WIDTH = 25;
const CELL_HEIGHT = 25;

class Level {
  constructor(width, height, centerWidth, centerHeight) {
    this.grid = new Array(width).fill().map(() => new Array(height).fill(0));

    // generate outer walls and inner room
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[r].length; c++) {
        // First and last rows
        if (r == 0 || r == this.grid.length - 1) {
          this.grid[r][c] = 1;
          continue;
        }

        // First and last columns
        if (c == 0 || c == this.grid[r].length - 1) {
          this.grid[r][c] = 1;
          continue;
        }
      }
    }

    console.log(this.grid);
  }

  rand(min, max) {
    return min + Math.floor(Math.random() * (1 + max - min));
  }

  update() {
    
  }

  draw() {
    // TODO: This needs to be optimized, way too inefficient as is
    // Camera based rendering is one approach, or we just dont do grid-based levels
    /*
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[r].length; c++) {
        switch (this.grid[r][c]) {
          case 0: // empty
            noFill();
            stroke(0);
            strokeWeight(3);
            break;
          case 1: // wall
            fill(255, 0, 0);
            break;
        }

        rectMode(CORNERS);
        rect(r * CELL_WIDTH, c * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
      }
    }
    */
  }
}
