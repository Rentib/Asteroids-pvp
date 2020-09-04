function Laser(spaceShip){
	var x = spaceShip.pos.x;
	var y = spaceShip.pos.y;
	var angle = spaceShip.angle - PI / 2;
	this.pos = createVector(x, y);
	this.v = p5.Vector.fromAngle(angle).mult(10);
	this.r = 5;
	this.red = 0;
	this.blue = 0;

	this.update = function(){
		this.pos.add(this.v);
	};

	this.render = function(){
		push();
	    fill(this.red, 0, this.blue)
	    ellipse(this.pos.x, this.pos.y, this.r, this.r);
	    rotate(angle - PI / 2);
	    pop();
	};
}