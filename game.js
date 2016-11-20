/*

         Realswipe
        By IliasHDZ

*/

var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");

ctx.font = "50px Verdana";
ctx.fillText("Loading...", 0, 40)
var img = {
	playerIdle: new Image(),
	playerMove: new Image(),
	brick: new Image(),
	grass: new Image(),
	fist: new Image(),
	pistol: new Image(),
	unknown: new Image(),
	bullet: new Image()
}

img.playerIdle.src = "Assets/PlayerIdle.png";
img.playerMove.src = "Assets/PlayerMove.png";
img.brick.src = "Assets/Brick.png";
img.grass.src = "Assets/Grass.png";
img.fist.src = "Assets/Fist.png";
img.pistol.src = "Assets/Pistol.png";
img.unknown.src = "Assets/Unknown.png";
img.bullet.src = "Assets/Bullet.png";

var frame = 0;
var animSpd = 100;
var Version = "Alpha 0.11";

var player = {
	x: 70,
	y: 70,
	xSpd: 0,
	ySpd: 0,
	anim: 0,
	move: false,
	face: 0,
	hp: 100,
	name: "Neysso",
	holding: "Fist",
	angle: 0,
	mX: 0,
	mY: 0
}

bullets = {}

document.onkeydown = function(event){
	if(event.keyCode === 68)        //d
		player.xSpd = 1;
	else if(event.keyCode === 83)   //s
		player.ySpd = 1;
	else if(event.keyCode === 81) //q
        player.xSpd = -1;
	else if(event.keyCode === 90) //z
		player.ySpd = -1;
}
		 
document.onkeyup = function(event){
	if(event.keyCode === 68)        //d
		player.xSpd = 0;
	else if(event.keyCode === 83)   //s
		player.ySpd = 0;
	else if(event.keyCode === 81) //q
		player.xSpd = 0;
	else if(event.keyCode === 90) //z
    	player.ySpd = 0;
}
document.onkeypress = function(event){
	if(event.keyCode === 97) { //a
		if (player.holding == "Fist"){
			player.holding = "Pistol";
		}else if (player.holding == "Pistol"){
			player.holding = "Fist";
		}
	}
}

document.onmousedown = function(){
	if (player.holding == "Pistol"){
		newbullet(Math.random(), player)
	}
}

document.onmousemove = function(mouse){
	var mouseX = mouse.clientX - player.x;
	var mouseY = mouse.clientY - player.y;

	player.mY = mouse.clientY;
	player.mX = mouse.clientX;

	player.angle = Math.atan2(mouseY,mouseX);
	// / Math.PI * 180
}

updatePlayer = function(){
	player.x = player.x + player.xSpd;
	player.y = player.y + player.ySpd;

	if (player.ySpd != 0){
		player.move = true;
		animSpd = 25;
	}else if (player.xSpd > 0){
		player.move = true;
		animSpd = 25;
		player.face = 0;
	}else if (player.xSpd < 0){
		player.move = true;
		animSpd = 25;
		player.face = 1;
	}

	if (frame < animSpd) {
		player.anim = 0;
	} else if (frame < animSpd*2) {
		player.anim = 1;
	} else if (frame < animSpd*3){
		player.anim = 2;
	}else if (frame < animSpd*4){
		player.anim = 3;
	}else{
		frame = 0;
	}
	if (player.move){
		ctx.drawImage(img.playerMove, player.anim*100, player.face*100, 100, 100, player.x, player.y, 100, 100);
	}else{
		ctx.drawImage(img.playerIdle, player.anim*100, player.face*100, 100, 100, player.x, player.y, 100, 100);
	}

	ctx.fillStyle = "#0F0";
	ctx.font = "15px Verdana";
	ctx.fillRect(player.x, player.y, player.hp, 5);
	ctx.fillStyle = "#000";
	ctx.fillText(player.name, player.x, player.y-3);

	player.move = false;
	animSpd = 100;
}

var drawBlock = function(x, y, type) {
	if (type == "brick") {
		ctx.drawImage(img.brick, x*100, y*100);
	}else if (type == "grass") {
		ctx.drawImage(img.grass, x*100, y*100);
	}
}

var drawMap = function() {
	drawBlock(0, 0, "grass");
	drawBlock(1, 0, "grass");
}

var drawGui = function(){
	//Version
	ctx.font = "10px Verdana";
	ctx.fillStyle = "#b7b7b7";
	ctx.fillText("Realswipe " + Version, canvas.width-110, canvas.height-5);

	//Holding
	if (player.holding == "Fist"){
		ctx.drawImage(img.fist, canvas.width-66, 2);
	}else if (player.holding == "Pistol"){
		ctx.drawImage(img.pistol, canvas.width-66, 2);
	}else{
		ctx.drawImage(img.unknown, canvas.width-66, 2)
	}
}

var updateBullet = function(bullet){
	bullet.x = bullet.x + bullet.xSpd;
	bullet.y = bullet.y + bullet.ySpd;

	ctx.drawImage(img.bullet, bullet.x, bullet.y);
}

var newbullet = function(id, plr){
	bullets[id] = {
		x: plr.x+50,
		y: plr.y+50,
		xSpd: Math.cos(plr.angle)*5,
		ySpd: Math.sin(plr.angle)*5
	}
	///180*Math.PI
}

//Update
setInterval(function () {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawMap();
	for (var key in bullets){
		updateBullet(bullets[key]);
	}
	updatePlayer();

	drawGui();
	frame = frame + 1;
}, 1)