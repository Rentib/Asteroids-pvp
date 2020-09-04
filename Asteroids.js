function Asteroid(){
	this.lvl = round(random(0, 2));
	this.pos = createVector(random(width), random(height));
	this.v = p5.Vector.random2D();
	this.r = 10;
  	this.n = round(random(7, 13));
  	this.shape = generateVerticies(this.r * (this.lvl + 1), this.r * (this.lvl + 1), random(3,10));

  	this.render = function() {
    	push();
    	stroke(255);
    	noFill();
    	translate(this.pos.x, this.pos.y);
    	
    	beginShape();
	    for(var i = 0;i < this.shape.length;i++)
	    	vertex(this.shape[i].x, this.shape[i].y);
	    endShape(CLOSE);

    	pop();
  	};

	this.update = function(){
		this.pos.add(this.v);
	};
	
	this.edges = function() {
	    if (this.pos.x > width + this.r) { this.pos.x = -this.r; } 
	    else if (this.pos.x < -this.r) { this.pos.x = width + this.r; }
	    if (this.pos.y > height + this.r) { this.pos.y = -this.r; } 
	    else if (this.pos.y < -this.r) { this.pos.y = height + this.r; }
	};

	this.collision = function(spaceShip){
		var d = dist(spaceShip.pos.x, spaceShip.pos.y, this.pos.x, this.pos.y);
    	if (d < spaceShip.r +  this.r * (this.lvl + 1)) {
      		return true;
    	} else {
      		return false;
    	}
	};
}

function generateVerticies(minSize, maxSize, amount){
    let verticies = [];
    let spread = 2*PI/(amount+1);
  
    for(let i = 0; i < amount; i++){
      verticies.push(p5.Vector.fromAngle(random(i*spread, (i+1)*spread)).mult(random(minSize, maxSize)));
    }
    return verticies;
}

function splitAsteroid(szajsCoSieDalZniszczyc, index){
	var x = szajsCoSieDalZniszczyc.pos.x;
	var y = szajsCoSieDalZniszczyc.pos.y;
	var lvl = szajsCoSieDalZniszczyc.lvl;
	asteroids.splice(index, 1);
	if(lvl < 1) return;
	var rock1 = new Asteroid();
	var rock2 = new Asteroid();
	rock1.lvl = lvl - 1;
	rock2.lvl = lvl - 1;
	rock1.pos = createVector(x, y);
	rock2.pos = createVector(x, y);
	asteroids.push(rock1);
	asteroids.push(rock2);
}