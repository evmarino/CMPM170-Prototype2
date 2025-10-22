class Menu {
  constructor() {
    this.bg = null;
    this.happy = null;
    this.angry = null;

    this.btnSize = 300;
    this.y = null;
    this.xL = null;
    this.xR = null;
  }

  preload() {
    this.bg    = loadImage('./Assets/title.png');
    this.happy = loadImage('./Assets/happybutton.png');
    this.angry = loadImage('./Assets/angrybutton.png');
  }

  setup() {
    textAlign(CENTER, CENTER);
    imageMode(CENTER);
    noStroke();
    this.layout();
  }

  layout() {
    this.y  = height * 0.5;
    this.xL = width  * 0.25; // left button (happy)
    this.xR = width  * 0.75; // right button (angry)
  }

  draw() {
    if (this.bg) image(this.bg, width/2, height/2, width, height);
    else background(30);

    if (this.happy) image(this.happy, this.xL, this.y, this.btnSize, this.btnSize);
    if (this.angry) image(this.angry, this.xR, this.y, this.btnSize, this.btnSize);

    fill(255);
    textSize(64);
    text('Prototype 2', width/2, height*0.2);
  }

  click(mx, my) {
    const half = this.btnSize / 2;
    const inHappy = mx >= this.xL - half && mx <= this.xL + half && my >= this.y - half && my <= this.y + half;
    const inAngry = mx >= this.xR - half && mx <= this.xR + half && my >= this.y - half && my <= this.y + half;

    if (inHappy) {
      mood = 'happy';
      isHappy = true;
      isAngry = false;
      state = 'game';
    } else if (inAngry) {
      mood = 'angry';
      isHappy = false;
      isAngry = true;
      state = 'game';
    }
  }

   MousePressed() {
    resizeCanvas(windowWidth, windowHeight);
    if (menu) menu.layout();
  }

}

