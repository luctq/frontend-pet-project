// Click to pause on your favorite color
// #favColorParticlesWeekend -- https://codepen.io/tmrDevelops/blog/favcolour-celebration

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

var c = document.getElementById("canvas-club");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var maxParticles = 60;
var particles = [];
var hue = 183;

var colorPaused = false;

var mouse = {};

mouse.x = null;
mouse.y = null;

mouse.touches = function(e) {
	var touches = e.touches;
	if(touches){
		mouse.x = touches[0].clientX;
		mouse.y = touches[0].clientY;
	} else {
		mouse.x = e.clientX;
	  mouse.y = e.clientY;
	}
	e.preventDefault();
};




function random(min, max){
	return Math.random() * (max - min) + min;
}


function P(){}


P.prototype = {
	init: function(){
		this.x = mouse.x || w/2;
		this.y = mouse.y || h/2;
		this.size = random(5, 30);
		this.vx = random(-3, 3);
		this.vy = random(-5, 5);
		this.life = 0;
		this.maxLife = random(50, 150);
	},
	
	draw: function(){
		ctx.globalCompositeOperation = "lighter";
		ctx.strokeStyle = "hsla("+hue+", 100%, 50%, .8)";
		ctx.fillStyle = "hsla("+hue+", 100%, 50%, .5)";
		ctx.lineWidth = this.size/20;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size/2, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		this.update();
	},
	
	update: function(){
		
		if(this.life > this.maxLife || this.size < .1){
			this.init();
		} else {
			if(this.y + this.size >= h || this.y - this.size <= 0){
				this.vy *= -1;
			}
			if(this.x + this.size >= w || this.x - this.size <= 0){
				this.vx *= -1;
			}
			this.x += this.vx;
			this.y += this.vy;
			this.vx *= .99;
			this.size *= .99;
			this.life++;
			
		}
	}
}




window.addEventListener("mousemove", mouse.touches);
window.addEventListener("touchstart", mouse.touches);
window.addEventListener("touchmove", mouse.touches);

window.addEventListener("mouseout", function(){
	mouse.x = mouse.y = null;
});

window.addEventListener("resize", function(){
	w = c.width = window.innerWidth;
	h = c.height = window.innerHeight;
});

c.addEventListener("click", function(){
	colorPaused = colorPaused ? false : true;
});





function setup(){
	for(var i=0; i<maxParticles;i++){
		
		setTimeout(function(){
			var p = new P();
			p.init();
			particles.push(p);
		}, i * 20)
		
	}
}



function anim(){
	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgba(0,0,0,.3)";
	ctx.fillRect(0, 0, w, h);
	
	for(var i in particles){
		particles[i].draw();
	}
	
	if(!colorPaused){
		hue += .5;
	}
	
	window.requestAnimationFrame(anim);
}




setup();
anim();