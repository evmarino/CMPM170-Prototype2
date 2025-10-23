class Menu {
  constructor() {
    this.bg = null;
    this.happy = null;
    this.angry = null;

    this.btnSize = 300;
    this.y = null;
    this.xL = null;
    this.xR = null;

    this.bubbleText =
      "Use WASD to move your aura maxxer and R to activate his aura eater to get the evil aura enemies (black circles) and the aura boosters (colored circles).";
  }

  preload() {
    if (DEBUGIMAGESKIP)
      return;
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
    this.y  = height - 240;
    this.xL = width * 0.25 - 70; // happy
    this.xR = width * 0.75 + 70; // angry
  }

  draw() {
    if (DEBUGIMAGESKIP){
      fill(255);            
      stroke(0);        
      strokeWeight(3);
      rect(this.xL, this.y, this.btnSize);
      rect(this.xR, this.y, this.btnSize);
    }else{
    
      if (this.bg) image(this.bg, width/2, height/2, width, height);
      else background(30);

      // buttons
      if (this.happy) image(this.happy, this.xL, this.y, this.btnSize, this.btnSize);
      if (this.angry) image(this.angry, this.xR, this.y, this.btnSize, this.btnSize);
    }

    // title
    fill(0)
    stroke(255);
    strokeWeight(6);
    textSize(64);
    textAlign(CENTER, CENTER);
    text('Prototype 2', width/2, height - 300);
    noStroke();

    
    const w = min(720, width * 0.75); 
    const h = 120;                   
    const cx = width / 2;
    const cy = this.y + 60;           // nudge up/down

    fill(0);            
    stroke(255);        
    strokeWeight(4);    
    textAlign(CENTER, CENTER);
    textSize(22);
    textWrap(WORD);
    text(this.bubbleText, cx - w/2, cy - h/2, w, h);
    noStroke();         
  }

  click(mx, my) {
    const half = this.btnSize / 2;
    const inHappy = mx >= this.xL - half && mx <= this.xL + half &&
                    my >= this.y - half && my <= this.y + half;
    const inAngry = mx >= this.xR - half && mx <= this.xR + half &&
                    my >= this.y - half && my <= this.y + half;

    if (inHappy) {
      mood = 'happy'; 
      isHappy = true; 
      state = 'game';
    } else if (inAngry) {
      mood = 'angry'; 
      isHappy = false; 
      state = 'game';
    }
  }

  //windowResized() {
   // resizeCanvas(windowWidth, windowHeight);
    //this.layout();
 //}
}
