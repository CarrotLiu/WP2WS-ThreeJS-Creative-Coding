let rects = [];
let elips = [];
let nRect = 8;
let lerpM = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  rects[0] = new Rect(width / 2, height / 2 + 200, 0, 1, 30);
  rects[1] = new Rect(width / 2, height / 2 - 200, 0, -1, 30);
  rects[2] = new Rect(width / 2, height / 2 + 300, 1, 0, 35);
  rects[3] = new Rect(width / 2, height / 2 - 300, -1, 0, 35);
  elips[0] = new Elip(width / 2, height / 2 + 20, 15, 0, 20);
  elips[1] = new Elip(width / 2, height / 2 - 20, -15, 0, 20);
  // rects[5] = new Rect(width / 2, height / 2 + 250, 0.5, 0, 35);
  // rects[6] = new Rect(width / 2, height / 2 - 250, -0.5, 0, 35);
}

function draw() {
  background(0, 10);
  lerpM = lerp(lerpM, mouseX, 0.05);
  push();
  rects[0].attract(rects[1]);
  rects[1].attract(rects[0]);
  rects[0].update();
  rects[1].update();
  rects[0].display(frameCount * 0.08, lerpM - width / 2);
  rects[1].display(frameCount * 0.08, lerpM - width / 2);
  pop();
  push();
  // rects[0].attract(elips[0]);
  elips[1].attract(elips[0]);
  elips[0].attract(elips[1]);
  elips[0].update();
  elips[1].update();
  elips[0].display(frameCount * 0.02);
  elips[1].display(frameCount * 0.02);
  pop();
  push();
  // translate(width / 2, height / 2);
  // rotate(PI / 4);
  rects[2].attract(rects[3]);
  rects[3].attract(rects[2]);
  rects[2].update();
  rects[3].update();
  rects[2].display(frameCount * 0.08, lerpM - width / 2);
  rects[3].display(frameCount * 0.08, lerpM - width / 2);
  pop();

  // rects[5].attract(rects[6]);
  // rects[6].attract(rects[5]);
  // rects[5].update();
  // rects[6].update();
  // rects[5].display(frameCount * 0.08);
  // rects[6].display(frameCount * 0.08);

  // for (let r in rects) {
  //     r.update();
  //     r.display();
  // }
  // for (let i = 0; i < nRect + 1; i++) {
  //     rects[i].update();
  //     rects[i].display();
  // }
}
