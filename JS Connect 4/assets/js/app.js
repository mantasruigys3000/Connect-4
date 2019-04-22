window.onload = function () {
	c = document.getElementById('game');
	ctx = c.getContext('2d');

	///Sprites
	slot = document.getElementById("slot");
	blue = document.getElementById("blue");
	red = document.getElementById("red");


	document.addEventListener('keydown', keyPress);
	document.addEventListener('click',clicc);
	document.addEventListener('mousemove',curs);
	block = [];
	for(var i = 0; i < 7; i++){
		block[i] = new Array(6);
	}
	chips = [];
  chipcount = 0;
	turn = 0;
	canClick = true;
	tempchipcount = 654;
	createBlocks();
    gMouseX = 0;

	setInterval(game, 1000/30);
};


function game() {
    
	ctx.fillStyle = '#e5e5e5';
	ctx.fillRect(0,0, c.width, c.height);
	drawCurs();
	drawChip();
	drawBlocks();
};

function keyPress(evnt) {
	console.log(evnt.keyCode);
}



function setPos(a,b) {
	this.sprite = slot;
	this.x = a;
	this.y = b;
	this.state = null;
};



function createBlocks(){
	var i,j;
		for( i = 0; i < 6; i++){
			for( j = 0; j < 7; j++){
			block[j][i] = new setPos(j*96,i*96);
			}
		}
}

function drawBlocks(){
	for(var i = 0; i < 6; i++){
		for(var j = 0; j<7; j++){
			ctx.drawImage(block[j][i].sprite,block[j][i].x,block[j][i].y);
		}

	}
}

function findPoint(col){
	for(var i = 0; i < 6; i++){
		if(block[col][i].state != null){
			return (i-1)*96;
		}
		else if(i == 5){
			return (i*96);
		}
	}
}

function createChip(turn,mx){
	if(turn == 0){
		this.sprite = blue;
	} else{
		this.sprite = red;
	}
	this.x = mx*96;
	this.y = 0;
	this.breakpoint = findPoint(mx);
	console.log(this)


	}

function clicc(e){
	if(canClick){
	mx = Math.floor(e.pageX/96);
	console.log(mx);
	if (block[mx][0].state == null){
	chips[chipcount] = new createChip(turn,mx);
	chipcount += 1;
	turn = (turn == 0) ? 1: 0;
	canClick = false;
	}
}
}
///Lol dont even fucking ask
///Yeah thats right 4 for loops, what you gonna do about it?
function checkWin(){
	for(var l = 0; l < chips.length;l++){
		console.log("length is", chips.length,'l is',l);
		var tempstate = chips[l].sprite;
		var mx = (chips[l].x/96) ;
		var my = (chips[l].y/96) ;
		var winner = (chips[l].sprite == blue)? "Blue": "Red";
		var modx = 0;
		var moxy = 0;
		console.log("checking for", tempstate, "from" ,mx,my);

		for(var c = 0; c < 8; c++){
			mathes = 0;
			
			switch(c){
				case 0: modx = 1; mody = 0; break;
				case 1: modx = 0; mody = 1; break;
				case 2: modx = 1; mody = 1; break;
				case 3: modx = -1; mody = 0; break;
				case 4: modx = 0; mody = -1; break; // lol whats the point in this? i dont know lmao;
				case 5: modx = -1; mody = -1; break;
				case 6: modx = 1; mody = -1; break;
				case 7: modx = -1; mody = 1; break;
		    }
				console.log("modx is", modx,"mody is", mody,"c is ",c);


			for(var j = 1; j < 4; j++){
				if((j*modx) + mx > 6 || (j*mody) + my > 5 || (j*modx) + mx < 0|| (j*mody) + my < 0) {break;}
				console.log(modx,mody);
				console.log(mx,my);
				console.log("c is",c); ///as you can tell, i needed a lot of help.
				if(block[mx+(j*modx)][my+(j*mody)].state != tempstate){break;}
				if(block[mx+(j*modx)][my+(j*mody)].state == tempstate &&  j == 3){
					console.log(winner);
					return 0;
				}

			}


	}
}

console.log("This should run once");
}

///Baisically fucking magic
function drawChip(){
	for(var i = 0; i < chipcount; i++){
	ctx.drawImage(chips[i].sprite,chips[i].x,chips[i].y);
	if (chips[i].y< chips[i].breakpoint){
		chips[i].y += 16;
		
	}
	if(chips[i].y == chips[i].breakpoint){
		block[chips[i].x/96][chips[i].breakpoint/96].state = chips[i].sprite;

	}

if(tempchipcount != chipcount){
	if(chips[chipcount-1].y == chips[chipcount-1].breakpoint){
		canClick = true;
		checkWin();
		tempchipcount = chipcount;
	}

}
}
}
function curs(e){
	gMouseX = e.clientX;
}
function drawCurs(){
	if(canClick){
		var image = (turn == 0) ? blue: red;
		ctx.drawImage(image,Math.floor(gMouseX/96)*96,0);
	}
}
