var ship;
var asteroids = [];
var lasers = [];
var lasers2 = [];
function setup(){
	var k = min(windowWidth, windowHeight) - 10;
	createCanvas(k, k);
	var przesun = createVector(100, 0);
	ship = new Ship();
	ship.red = 250;
	ship.pos.add(przesun);
	ship2 = new Ship();
	ship2.blue = 250;
	ship2.pos.add(przesun.mult(-1));
	while(asteroids.length < k / 100){
		asteroids.push(new Asteroid());
		var index = asteroids.length - 1;
		var d = dist(ship.pos.x, ship.pos.y, asteroids[index].pos.x, asteroids[index].pos.y);
		d = min(d, dist(ship2.pos.x, ship2.pos.y, asteroids[index].pos.x, asteroids[index].pos.y));
		if(d < 100)
			asteroids.splice(index, 1);
	}
}
function draw(){
	background(0);
	ship.render();
	ship.update();
	ship.edges();

	ship2.render();
	ship2.update();
	ship2.edges();

	for(var i = 0;i < lasers.length;i++){
		lasers[i].render();
		lasers[i].update();
		var x = lasers[i].pos.x;
		var y = lasers[i].pos.y;
		if(x < -width || x > 2 * width || y < -height || y > 2 * height)
			lasers.splice(i, 1);
		else if(ship2.collision(lasers[i]))
			ship2.destroy();
	}

	for(var i = 0;i < lasers2.length;i++){
		lasers2[i].render();
		lasers2[i].update();
		var x = lasers2[i].pos.x;
		var y = lasers2[i].pos.y;
		if(x < -width || x > 2 * width || y < -height || y > 2 * height)
			lasers2.splice(i, 1);
		else if(ship.collision(lasers2[i]))
			ship.destroy();
	}

	for(var i = 0;i < asteroids.length;i++){
		asteroids[i].render();
		asteroids[i].update();
		asteroids[i].edges();
		if(asteroids[i].collision(ship))
			ship.destroy();
		if(asteroids[i].collision(ship2))
			ship2.destroy();
		for(var j = 0;j < lasers.length;j++){
			if(asteroids[i].collision(lasers[j])){
				lasers.splice(j, 1);
				splitAsteroid(asteroids[i], i);
				return;
			}
		}
		for(var j = 0;j < lasers2.length;j++){
			if(asteroids[i].collision(lasers2[j])){
				lasers2.splice(j, 1);
				splitAsteroid(asteroids[i], i);
				return;
			}
		}
	}
}
function keyPressed(){
	if(keyCode === LEFT_ARROW){
		ship.rotateBoost = -0.1;
		ship.isRotating = 1;
	}
	if(keyCode === RIGHT_ARROW){
		ship.rotateBoost = 0.09;
		ship.isRotating = 1;
	}
	if(keyCode === UP_ARROW)
		ship.isBoosting = 1;
	if(keyCode === DOWN_ARROW || key == 'm'){
		lasers.push(new Laser(ship));
		lasers[lasers.length - 1].red = 250;
	}


	if(key == 'a'){
		ship2.rotateBoost = -0.1;
		ship2.isRotating = 1;
	}
	if(key == 'd'){
		ship2.rotateBoost = 0.09;
		ship2.isRotating = 1;
	}
	if(key == 'w')
		ship2.isBoosting = 1;
	if(key == 's' || key == 'q'){
		lasers2.push(new Laser(ship2));
		lasers2[lasers2.length - 1].blue = 250;
	}
}
function keyReleased(){
	if(keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW)
		ship.isRotating = 0.9;
	if(keyCode === UP_ARROW)
		ship.isBoosting = 0.99;

	if(key == 'a' || key == 'd')
		ship2.isRotating = 0.9;
	if(key == 'w')
		ship2.isBoosting = 0.99;
}
