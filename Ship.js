function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 10;
  this.angle = 0;
  this.v = createVector(0, 0);
  this.isBoosting = 0;
  this.rotateBoost = 0;
  this.isRotating = 0;
  this.red = 0;
  this.blue = 0;

  this.edges = function(){
    if(this.pos.x < 0 - this.r) this.pos.x = width + this.r;
    if(this.pos.x > width + this.r) this.pos.x = 0 - this.r;
    if(this.pos.y < 0 - this.r) this.pos.y = height + this.r;
    if(this.pos.y > height + this.r) this.pos.y = 0 - this.r;
  };

  this.update = function() {
    this.pos.add(this.v);
    if(this.isBoosting == 1)
      this.v = p5.Vector.fromAngle(this.angle - PI / 2).mult(4);
    else
      this.v.mult(0.986);
    this.angle += this.rotateBoost;
    this.rotateBoost *= this.isRotating;
  };

  this.render = function() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    fill(0);
    stroke(this.red, 0, this.blue);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r * 2);
    pop();
  };

  this.collision = function(bullet){
    var d = dist(bullet.pos.x, bullet.pos.y, this.pos.x, this.pos.y);
      if (d * 1.4 < bullet.r +  this.r) {
          return true;
      } else {
          return false;
      }
  };

  this.destroy = function(){
    noLoop();
  }
}