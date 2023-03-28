class Glowworm {
  constructor(x) {
    this.pos = x;
    this.vel = createVector(0, random(10, 20));
    this.acc = createVector();
    this.freq = random(0, 1);
    this.size = random(1, 6);
    this.mass = random(2, 55);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();

    fill(
      map(mouseX, 0, width, 255, 246),
      map(mouseX, 0, width, 243, 107),
      map(mouseX, 0, width, 140, 14),
      sin(frameCount * 0.05 * this.freq) * 255
    );
    circle(0, 0, this.size);
    pop();
  }
  slowDown() {
    this.vel.mult(0.97); //-3%
  }

  applyWind(f) {
    let force = f.copy();
    force.div(this.mass);
    this.acc.add(force);
    this.acc.mult(0.5);
  }

  applyForce(f) {
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force);
  }

  attractedTo(target) {
    let vector = p5.Vector.sub(target, this.pos);
    vector.mult(0.01);
    this.applyForce(vector);
  }

  checkBoundaries() {
    // x
    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = -this.vel.x;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.vel.x = -this.vel.x;
    }
    // y
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.vel.y = -this.vel.y;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.vel.y = -this.vel.y;
    }
  }
}

// for the linter
