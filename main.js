const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* PLAYER */

const player = {

x:120,

y:canvas.height - 220,

width:60,
height:120,

velocityY:0,

gravity:0.8,

jump:-16,

grounded:true

};

/* OBSTACLES */

const obstacles = [];

/* DRAW PLAYER */

function drawPlayer(){

ctx.save();

ctx.shadowBlur = 20;
ctx.shadowColor = "#00d4ff";

/* HEAD */

ctx.fillStyle = "#00d4ff";

ctx.beginPath();

ctx.arc(
player.x + 25,
player.y + 20,
16,
0,
Math.PI * 2
);

ctx.fill();

/* BODY */

ctx.fillStyle = "#7c3aed";

ctx.beginPath();

ctx.roundRect(
player.x + 10,
player.y + 38,
30,
36,
10
);

ctx.fill();

/* ARMS */

ctx.strokeStyle = "#00d4ff";
ctx.lineWidth = 5;

ctx.beginPath();

ctx.moveTo(player.x + 10, player.y + 45);
ctx.lineTo(player.x - 4, player.y + 58);

ctx.moveTo(player.x + 40, player.y + 45);
ctx.lineTo(player.x + 54, player.y + 58);

ctx.stroke();

/* LEGS */

ctx.beginPath();

ctx.moveTo(player.x + 18, player.y + 74);
ctx.lineTo(player.x + 10, player.y + 98);

ctx.moveTo(player.x + 32, player.y + 74);
ctx.lineTo(player.x + 40, player.y + 98);

ctx.stroke();

/* EYES */

ctx.fillStyle = "#ffffff";

ctx.beginPath();

ctx.arc(
player.x + 20,
player.y + 18,
2,
0,
Math.PI * 2
);

ctx.arc(
player.x + 30,
player.y + 18,
2,
0,
Math.PI * 2
);

ctx.fill();

ctx.restore();

}

/* CREATE OBSTACLE */

function createObstacle(){

obstacles.push({

x:canvas.width,

y:canvas.height - 120,

width:40,
height:40

});

}

setInterval(()=>{

createObstacle();

},1500);

/* DRAW OBSTACLES */

function drawObstacles(){

obstacles.forEach((obs,index)=>{

obs.x -= 8;

ctx.shadowBlur = 20;
ctx.shadowColor = "#ff004c";

ctx.fillStyle = "#ff004c";

ctx.beginPath();

ctx.moveTo(
obs.x,
obs.y + obs.height
);

ctx.lineTo(
obs.x + obs.width/2,
obs.y
);

ctx.lineTo(
obs.x + obs.width,
obs.y + obs.height
);

ctx.closePath();

ctx.fill();

/* REMOVE */

if(obs.x < -50){

obstacles.splice(index,1);

}

/* COLLISION */

if(

player.x <
obs.x + obs.width &&

player.x + 40 >
obs.x &&

player.y + 20 <
obs.y + obs.height &&

player.y + 100 >
obs.y

){

location.reload();

}

});

}

/* UPDATE */

function update(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

/* BG */

ctx.fillStyle = "#050816";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

/* GROUND */

ctx.fillStyle = "#ff004c";

ctx.fillRect(
0,
canvas.height - 80,
canvas.width,
4
);

/* PHYSICS */

player.velocityY +=
player.gravity;

player.y +=
player.velocityY;

/* GROUND COLLISION */

if(
player.y >=
canvas.height - 220
){

player.y =
canvas.height - 220;

player.grounded = true;

}

/* DRAW */

drawPlayer();

drawObstacles();

requestAnimationFrame(update);

}

update();

/* JUMP */

function jump(){

if(player.grounded){

player.velocityY =
player.jump;

player.grounded =
false;

}

}

/* CONTROLS */

document.addEventListener(
"keydown",
(e)=>{

if(e.code === "Space"){

jump();

}

});

document.addEventListener(
"touchstart",
jump
);