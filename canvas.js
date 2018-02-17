var canvas = document.getElementById("myCanvas");
var c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

var mouse = {x:undefined,y:undefined};
var key = false;
var key2 = false;

window.addEventListener('mousemove',
	function(event){
		mouse.x=event.x;
		mouse.y=event.y;
		key2= false;
	})
window.addEventListener('mousedown',
	function(mysz){
		key = true;
	}
	)
window.addEventListener('mouseup',
	function(mysz){
		key = false;
		
	}
	)
	
function Circle(x,y,dx,dy,r,rgb){
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.r=r;
	this.rgb=rgb;
	
	this.draw = function(){
		c.strokeStyle = rgb;
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, 2 * Math.PI ,false);
		c.stroke();
		c.fillStyle = this.rgb;
		c.fill();
	}
	this.update= function(){	
	(this.x+r>innerWidth)? this.dx=-this.dx:this.dx=this.dx;
	(this.x+r>300 && this.x<301 && this.y+r>200 && this.y-r<400)? this.dx=-this.dx:this.dx=this.dx;
	(this.x-r<500 && this.x>501 && this.y+r>200 && this.y-r<400)? this.dx=-this.dx:this.dx=this.dx;
	(this.x+r>300 && this.x-r<500 && this.y+r>200 && this.y<200)? this.dy=-this.dy:this.dy=this.dy;
	(this.x+r>300 && this.x-r<500 && this.y-r<400 && this.y>401)? this.dy=-this.dy:this.dy=this.dy;
	(this.x-r<0)? this.dx=-this.dx:this.dx=this.dx;
	(this.y+r>innerHeight)? this.dy=-this.dy:this.dy=this.dy;
	(this.y-r<0)? this.dy=-this.dy:this.dy=this.dy;

	this.x+=this.dx;
	this.y+=this.dy;
	
	//interactivity
	
	if (key == true && mouse.x - this.x < 50 && mouse.x - this.x >-50 
		&& mouse.y - this.y < 50 && mouse.y - this.y >-50){
		this.r+=1;}
	else if (this.r >= 10){
		this.r-=0.2;}
	this.draw();	
	}
}

var circleArray=[];
for (i=0;i<600;i++){
	var x= r + Math.random()*(innerWidth - r * 2);
	var y= r+ Math.random()*(innerHeight - r * 2);
	var dy=(5+(Math.random()-0.5)*2)*(Math.random()-0.5);
	var dx=(5+(Math.random()-0.5)*2.2)*(Math.random()-0.5);
	var r=4+(Math.random()*50);

	var red=Math.random() * 255;
	var g=Math.random() * 255;
	var b=Math.random() * 255;
	if (x+r>=300 && x-r<=500 && y+r>=200 && y-r<=400){
		x=Math.random()*299;
		y=Math.random()*200;
	}
	rgb='rgb'+'('+red.toFixed(0)+','+g.toFixed(0)+','+b.toFixed(0)+')';

	circleArray.push(new Circle(x,y,dx,dy,r,rgb));
}
console.log(circleArray);

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	c.fillStyle = "rgba(255,0,100,0.2)";
	c.fillRect(300,200,200,200);
	
	for(i=0;i<circleArray.length;i++){
		circleArray[i].update();
	}

}
animate();


