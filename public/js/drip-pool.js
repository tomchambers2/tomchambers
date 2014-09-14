var radius = 30;

var path = new Path();
path.strokeColor = 'black';

var height = view.bounds.height;
var width = view.bounds.width;

path.segments = [];
//bottom left to top left
//path.add(new Point(0, height));
path.add(new Point(0, height / 2));
//top left to right hand side
path.add(new Point(width / 3, height / 2));
path.add(new Point((width / 3) + (width / 3), height / 2));
path.add(new Point((width / 3) + (width / 3)*2, height / 2));
//from bottom right to bottom left
//path.add(new Point(width, height));

path.closed = true;
path.smooth();
path.fillColor = 'green';
//path.fullySelected = true;

var balls = [];
var lastBall = 0;

function onFrame(event) {
	for (var i=0;i<path.segments.length;i++) {
		if (path.segments[i].velocity > 0) {
			var sinSeed = event.count + i * 100;
			var sinHeight = Math.sin(sinSeed / 200) * 100;
			var movement = Math.sin(sinSeed / 100) * sinHeight + 100;
			path.segments[i].point.y += (movement);
			path.segments[i].velocity -= 1;	
		}
	}
	for (var i=0;i<balls.length;i++) {
		balls[i].position.y += balls[i].velocity;
		balls[i].velocity += 0.1;

		if (balls[i].bounds.bottom > view.bounds.height) {
			balls[i].remove();
		}
		var hitOptions = {
			fill: true,
			stroke: true,
			segments: true,
			tolerance: 30
		}

		var ballY = balls[i].bounds.bottom;
		var ballX = balls[i].bounds.left + (balls[i].bounds.width / 2);

		var hitResult = path.hitTest(new Point(ballX, ballY), hitOptions);
		if (hitResult) {
			console.log('new point');
			if (path.segments.length > 4){
				path.removeSegment([path.segments.length-1]);
			};
			path.add(hitResult.point);
			path.segments[path.segments.length-1].velocity = 100;
		}
	}
	if (Date.now() > lastBall + 4000) {
		var circle = new Path.Circle(new Point(300,-radius),radius);
		circle.fillColor = 'red';
		circle.velocity = 1;
		balls.push(circle);
		lastBall = Date.now();
	}

};

function onMouseMove(event) {
	mousePos = event.point;
	if (path.hitTest(event.point)) {
		path.add(mousePos);
	}
}