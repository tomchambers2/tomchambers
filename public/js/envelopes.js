var envelopeHeight = 100;
var fallRange = 8.5;
var fallMidpoint = 75;
var maxOnScreen = 6;
var frequency = 4500; //miliseconds of envelope falling
var initialVelocity = 0.2;

var gravity = 0.6;
var friction = 0.97;
var dampening = 2;

var lastEnvelope = 0;
var envelopes = [];

function onFrame() {
	var onScreen = 0;
	for (var i = 0; i < envelopes.length; i++) {
		if (!envelopes[i].dead) {
			onScreen++;
		}
		envelopes[i].updateSelf();
	}
	if (Date.now() > lastEnvelope + frequency && onScreen <= maxOnScreen) {
		var dropX = view.bounds.width * (((Math.random() * fallRange) + fallMidpoint) / 100);
		//var envelope = new Path.Rectangle(new Point(dropX, -envelopeHeight), envelopeWidth, envelopeHeight);
		var envelope = new Raster('gmail-icon');
		envelope.position = new Point(dropX, -envelopeHeight);
		envelope.fillColor = 'red';
		envelope.velocity = initialVelocity;
		envelope.removed = false;
		envelope.updateSelf = function() {
			if (this.bounds.bottom > view.bounds.height + 1000) {
				this.remove();
				envelopes.splice(i,1);
				return;
			};
			function bounce() {
				if (this.velocity > dampening) {
					this.velocity -= dampening;
					this.velocity = -this.velocity;
				} else {
					this.velocity = 0;
				}
				
			};			

			if (this.bounds.bottom >= view.bounds.height && !this.dead) {
				bounce.apply(this);
			}

			for (var i = 0;i<envelopes.length;i++) {
				var bottomLeft = new Point(this.bounds.left, this.bounds.bottom);
				var bottomRight = new Point(this.bounds.left + this.bounds.width, this.bounds.bottom);
				if (envelopes[i].hitTest(bottomLeft) && envelopes[i].id!=this.id) {
					bounce.apply(this);
				};
				if (envelopes[i].hitTest(bottomRight) && envelopes[i].id!=this.id) {
					bounce.apply(this);
				};
			}

			this.position.y += this.velocity;
			this.velocity += gravity;
			this.velocity *= friction;			
		}
		envelopes.push(envelope);
		lastEnvelope = Date.now();
	};
};

function onMouseDown() {
	console.log('got it')
	for (var i = 0;i<envelopes.length;i++) {
		envelopes[i].dead = true;
	}
}