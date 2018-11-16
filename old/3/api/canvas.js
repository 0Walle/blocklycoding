var ctx;

function drawRect(x,y,w,h,stroke) {
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	ctx.fill();
	if (stroke) ctx.stroke();
	return "rect("+x+','+y+','+w+','+h+");";
}

function fillScreen(color) {
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.fillRect(0,0,640,480);
}

function drawCircle(x,y,radius,stroke) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.fill();
	if (stroke) ctx.stroke();
	return 'circle('+x+','+y+','+radius+');';
}

function drawText(text,x,y,font){
	ctx.font = font;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(text, x, y);
	return 'text('+x+','+y+');';
}

function sortCoord(){
	for (var i = 0; i < 20; i++) {
		x = Math.round(Math.random()*8);
		y = Math.round(Math.random()*6);

		console.log(x,y);

		//drawGrass(x,y);
		grasses[i][0] = x;
		grasses[i][1] = y;
	};
}

var grasses = [[0,0],[4,2],[4,3],[5,2],[5,3],[2,2],[0,1],[1,0],[2,0],[2,3],[2,4],[0,3],[1,5],[5,5],[4,5],[6,5],[7,5],[7,0],[7,2],[6,0],[4,0]];
//var grasses = [[5,3],[1,3],[3,1],[3,5]];
var Oapples = [[4,1],[5,1],[6,1],[6,2],[6,3],[6,4],[3,4],[4,4],[5,4],[3,2],[3,3],[3,1]];

var apples = Oapples.slice();

var Ay = 0;
function drawApples() {
	if (Ay>2*Math.PI){
		Ay = 0;
	}
	for (var i = 0; i < apples.length; i++) {
		drawApple(apples[i][0],apples[i][1],Ay);
	};
	Ay+= 0.1;
}

function drawApple(x,y,ay) {
	ctx.save();

	ctx.save();
	ctx.scale(1,0.5);

	ctx.globalAlpha = 0.1;
	ctx.fillStyle = '#000';
	ctx.beginPath();
	ctx.arc(x*50+25, (y*50+35)*2, 10, 0, Math.PI * 2);
	ctx.fill();

	ctx.restore();

	/*ctx.fillStyle = "#f00";
	ctx.strokeStyle = "#a00";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.lineTo(x,y);
    ctx.quadraticCurveTo(-20+x,-10+y,-10+x,20+y);
    ctx.quadraticCurveTo( -4+x, 22+y,  0+x,20+y);
    ctx.quadraticCurveTo(  4+x, 22+y, 10+x,20+y);
    ctx.quadraticCurveTo( 20+x,-10+y,  0+x, 0+y);
    ctx.fill();
    ctx.stroke();*/

	ctx.strokeStyle = "#0a0";
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(x*50+25,y*50+10);
	ctx.lineTo(x*50+20,y*50+(Math.sin(Ay)*2));
    ctx.stroke();

	ctx.fillStyle = "#f00";
	ctx.strokeStyle = "#a00";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(x*50+25, y*50+15+(Math.sin(Ay)*2), 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

function drawGrasses() {
	for (var i = 0; i < grasses.length; i++) {
		drawGrass(grasses[i][0],grasses[i][1]);
	};
}

function drawGrass(x,y) {
	ctx.save();

	ctx.save();
	ctx.scale(1,0.5);

	ctx.globalAlpha = 0.1;
	ctx.fillStyle = '#000';
	ctx.beginPath();
	ctx.arc(x*50+25, (y*50+30)*2, 20, 0, Math.PI * 2);
	ctx.fill();

	ctx.restore();

	ctx.fillStyle = "#f80";
	ctx.strokeStyle = "#f50";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.rect(x*50+20, y*50+20, 10, 12);
    ctx.fill();
    ctx.stroke();


	ctx.fillStyle = "#080";
	ctx.strokeStyle = "#050";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.arc(x*50+25, y*50+8, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

function drawGrid(){
	ctx.strokeStyle = "#aba";
	for (var i = 1; i < 8; i++) {
		ctx.beginPath();
		ctx.moveTo(i*50, 0);
		ctx.lineTo(i*50, 300);
		ctx.stroke();
	};
	for (var i = 1; i < 6; i++) {
		ctx.beginPath();
		ctx.moveTo(0, i*50);
		ctx.lineTo(400, i*50);
		ctx.stroke();
	};
	ctx.strokeStyle = "#000";
}

var player = {
	x: 1,
	y: 1,
	vx: 0,
	vy: 0,
	dir: 0,

	moving: false,

	draw: function(){
		this.x += this.vx;
		this.y += this.vy;

		this.vx *= 0.5;
		this.vy *= 0.5;

		for (var i = 0; i < apples.length; i++) {
			if (apples[i][0] == Math.round(this.x) && apples[i][1] == Math.round(this.y)){
				apples.splice(i,1);
				Collect.play();
			}
		}

		if (this.vx < 0.01 && this.vy < 0.01) this.moving = false;

		ctx.fillStyle = "#00a";
		ctx.beginPath();
		ctx.rect(this.x*50+12,this.y*50+18,25,25);
		ctx.fill();

		ctx.fillStyle = "#00f";
		ctx.beginPath();
		ctx.rect(this.x*50+12,this.y*50+2,25,23);
		ctx.fill();

		//ctx.beginPath();
		//ctx.arc(this.x*50+30,this.y*50+10,4,Math.PI,Math.PI/2);
		//ctx.moveTo(this.x*50+18,this.y*50+10);
		//ctx.arc(this.x*50+21,this.y*50+10,3,Math.PI,2*Math.PI);
		//ctx.fill();
	},

	drawPointer: function(){
		if (this.moving==false){
			ctx.save();
			ctx.globalAlpha = 0.5;
			if (this.dir == 1){
				ctx.fillStyle = "#f00";
				ctx.beginPath();
				ctx.moveTo(this.x*50+15,(this.y+1)*50+15);
				ctx.lineTo(this.x*50+25,(this.y+1)*50+35);
				ctx.lineTo(this.x*50+35,(this.y+1)*50+15);
				ctx.fill();
			}else if (this.dir == 0){
				ctx.fillStyle = "#f00";
				ctx.beginPath();
				ctx.moveTo((this.x+1)*50+15,this.y*50+15);
				ctx.lineTo((this.x+1)*50+35,this.y*50+25);
				ctx.lineTo((this.x+1)*50+15,this.y*50+35);
				ctx.fill();
			}else if (this.dir == 3){
				ctx.fillStyle = "#f00";
				ctx.beginPath();
				ctx.moveTo(this.x*50+15,(this.y-1)*50+35);
				ctx.lineTo(this.x*50+25,(this.y-1)*50+15);
				ctx.lineTo(this.x*50+35,(this.y-1)*50+35);
				ctx.fill();
			}else if (this.dir == 2){
				ctx.fillStyle = "#f00";
				ctx.beginPath();
				ctx.moveTo((this.x-1)*50+35,this.y*50+15);
				ctx.lineTo((this.x-1)*50+15,this.y*50+25);
				ctx.lineTo((this.x-1)*50+35,this.y*50+35);
				ctx.fill();
			}
			ctx.restore();
		}
	},

	move: function(){
		this.moving = true;
		switch(this.dir) {
		    case 0:
			    for (var i = 0; i < grasses.length; i++) {
			    	//console.log(grasses[i][0],Math.ceil(this.x+1));
			    	if (grasses[i][0] == Math.ceil(this.x+1) && grasses[i][1] == Math.ceil(this.y)){
			    		//console.log("colide");
			    		colide = true;
			    		break;
			    	}else{
			    		colide = false;
			    	}
			    }
			    if(colide == false) this.vx = 0.5;
			    else SColide.play();
		        break;
		    case 1:
		        for (var i = 0; i < grasses.length; i++) {
			    	//console.log(grasses[i][0],Math.ceil(this.x+1));
			    	if (grasses[i][0] == Math.ceil(this.x) && grasses[i][1] == Math.ceil(this.y+1)){
			    		//console.log("colide");
			    		colide = true;
			    		break;
			    	}else{
			    		colide = false;
			    	}
			    }
			    if(colide == false) this.vy = 0.5;
			    else SColide.play();
		        break;
		    case 2:
		        for (var i = 0; i < grasses.length; i++) {
			    	//console.log(grasses[i][0],Math.round(this.x-1));
			    	if (grasses[i][0] == Math.round(this.x-1) && grasses[i][1] == Math.round(this.y)){
			    		//console.log("colide");
			    		colide = true;
			    		break;
			    	}else{
			    		colide = false;
			    	}
			    }
			    if(colide == false) this.vx = -0.5;
			    else SColide.play();
		        break;
		    case 3:
		        for (var i = 0; i < grasses.length; i++) {
			    	//console.log(grasses[i][0],Math.ceil(this.x+1));
			    	if (grasses[i][0] == Math.round(this.x) && grasses[i][1] == Math.round(this.y-1)){
			    		//console.log("colide");
			    		colide = true;
			    		break;
			    	}else{
			    		colide = false;
			    	}
			    }
			    if(colide == false) this.vy = -0.5;
			    else SColide.play();
		        break;
		}
	},
	reset: function(){
		this.x = 1;
		this.y = 1;
		this.vx = 0;
		this.vy = 0;
		this.dir = 0;

		apples = Oapples.slice();;
	},
	turn: function(dir){
		if (dir == "left"){
			this.dir -= 1;
			if (this.dir < 0) this.dir = 3;
		}else if (dir == "right"){
			this.dir += 1;
			if (this.dir > 3) this.dir = 0;
		}
	}
}