class Rect {
  constructor(x, y, vx, vy, m) {
    //Vectors for rect position
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.vel.mult(0.1);
    this.acc = createVector();

    this.rectH = constrain(random(200), 150, 250);

    this.mass = m;
    this.r = sqrt(this.mass) * 2;

    //Vectors for rect w and h
    // this.wth = createVector(1, 0);
    // this.hgt = createVector(0, 1);

    //Vectors for rect transformation
    // this.traW = createVector(30, 0);
    // this.traH = createVector(0, 60);
    // this.traAW = sin(AW);
    // this.traAH = cos(AH);

    //constants
    // this.fps = fps;
    // this.diff = diff;
  }

  update() {
    // this.diff += sin(this.fps + this.diff) * 10;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    // this.pos.y.limit(height - 250);
    this.acc.set(0, 0);

    // if (this.vel.x > -1) {
    //     this.vel.mult(lerp(30, -30, 0.2));
    // } else if (this.vel.x == -1) {
    //     this.vel.mult(lerp(-30, 30, 0.2));
    // }

    // this.traW.mult(5 * sin(radians(this.fps)));
    // this.traH.mult(10 * cos(radians(this.fps)));
    // this.wth.mult(this.traW);
    // this.hgt.mult(this.traH);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let G = 1;
    let strength = (G * (this.mass * mover.mass)) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }

  display(frameCount, lerpM) {
    push();
    stroke(255);
    strokeWeight(3);
    noFill();
    rectMode(CENTER);
    push();
    translate(this.pos.x + lerpM, constrain(this.pos.y, 100, height - 100));
    rotate(frameCount);
    rect(0, 0, 10, this.rectH);
    rect(0, 0, this.rectH, 10);
    push();
    fill(255);
    rect(0, 0, 10, 10);
    pop();
    pop();
    pop();
  }
}
