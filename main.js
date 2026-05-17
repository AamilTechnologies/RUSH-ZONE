const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
x:100,
y:300,
velocityY:0,
gravity:0.8,
jump:-15,
grounded:false
};

const obstacles = [];

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

ctx.fillRect(
player.x + 12,
player.y + 38,
26,
32
);

/* ARMS */

ctx.strokeStyle = "#00d4ff";
ctx.lineWidth = 5;

ctx.beginPath();

ctx.moveTo(player.x + 12, player.y + 45);
ctx.lineTo(player.x, player.y + 58);

ctx.moveTo(player.x + 38, player.y + 45);
ctx.lineTo(player.x + 50, player.y + 58);

ctx.stroke();

/* LEGS */

ctx.beginPath();

ctx.moveTo(player.x + 20, player.y + 70);
ctx.lineTo(player.x + 12, player.y + 90);

ctx.moveTo(player.x + 30, player.y + 70);
ctx.lineTo(player.x + 38, player.y + 90);

ctx.stroke();

ctx.restore();

}

function createObstacle(){

obstacles.push({

x:canvas.width,
y:canvas.height - 120,

width:40,
height:40

});

}

setInterval(createObstacle,1500);

function drawObstacles(){

obstacles.forEach((obs,index)=>{

obs.x -= 8;

ctx.fillStyle = "#ff004c";

ctx.beginPath();

ctx.moveTo(obs.x, obs.y + obs.height);

ctx.lineTo(obs.x + obs.width/2, obs.y);

ctx.lineTo(obs.x + obs.width, obs.y + obs.height);

ctx.closePath();

ctx.fill();

if(obs.x < -50){

obstacles.splice(index,1);

}

});

}

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

player.velocityY += player.gravity;

player.y += player.velocityY;

if(player.y >= canvas.height - 170){

player.y = canvas.height - 170;

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

player.velocityY = player.jump;

player.grounded = false;

}

}

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