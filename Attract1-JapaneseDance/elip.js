class Elip {
  constructor(x, y, vx, vy, m) {
    //Vectors for ellipse position
    this.pos = createVector(x, y);
    this.pos2 = this.pos.copy();
    this.pos2.limit(1);
    this.vel = createVector(vx, vy);
    this.vel.div(0.1);
    this.vel.limit(5);
    this.acc = createVector();

    this.mass = m;
    this.r = sqrt(this.mass) * 2;
  }

  update() {
    // this.diff += sin(this.fps + this.diff) * 10;
    this.vel.add(this.acc);
    this.pos.sub(this.vel);
    // this.pos.setMeg(30);
    this.acc.set(0, 0);
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

  display(frameCount) {
    push();
    translate(
      constrain(this.pos.x, 300, width - 300),
      constrain(this.pos.y, 200, height - 200)
    );
    //         noStroke(0);
    //         fill(map(cos(frameCount), 0, 1, 220, 255), 0, 0);

    //         for (let i = 0; i < 6; i++) {
    //             push();
    //             rotate(i * PI / 6 + frameCount);
    //             ellipse(0, 0, this.r * 4, 160);
    //             pop();
    //         }

    //         push();
    //         fill(0);
    //         circle(0, 0, this.r * 8);
    //         pop();

    push();
    rectMode(CENTER);
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    rotate(frameCount * 5);
    // push();
    // rotate(PI / 4);
    // rect(0, 0, this.r * 0.6, this.r * 5);
    // pop();
    rect(0, 0, this.r * 0.6, frameCount * 10);
    pop();

    push();
    noFill();
    stroke(255);
    strokeWeight(1);
    rotate(frameCount * 5);
    for (let i = 0; i < 6; i++) {
      push();
      rotate((i * PI) / 6 + frameCount);
      ellipse(0, 10, this.r * 0.2, 5 * frameCount * 0.5);
      pop();
    }

    pop();

    // push();
    // translate(constrain(this.pos2, 200, width - 200), constrain(this.pos2, 100, height - 100));
    // noStroke(0);
    // fill(map(cos(frameCount), 0, 1, 220, 255), 0, 0);
    // ellipse(0, 0, this.r);
    // pop();

    pop();
  }
}
