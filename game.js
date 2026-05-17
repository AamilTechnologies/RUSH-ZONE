console.log("NEW GAME JS");

const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

/* SCORE */

const scoreEl =
document.getElementById("score");

/* PLAYER */

const player = {

x:80,
y:canvas.height - 170,

width:60,
height:90,

velocityY:0,

gravity:0.8,

jumpForce:-16,

grounded:true

};

/* GAME */

let score = 0;

let speed = 8;

let gameRunning = true;

/* OBSTACLES */

const obstacles = [];

/* PARTICLES */

const particles = [];

/* STARS */

const stars = [];

for(let i=0;i<100;i++){

stars.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

size:Math.random()*2

});

}

/* DRAW BG */

function drawStars(){

stars.forEach(star=>{

ctx.fillStyle =
"rgba(255,255,255,0.4)";

ctx.fillRect(
star.x,
star.y,
star.size,
star.size
);

star.x -= 0.3;

if(star.x < 0){

star.x = canvas.width;

}

});

}

/* PLAYER */

function drawPlayer(){

ctx.save();

ctx.shadowBlur = 25;
ctx.shadowColor = "#00d4ff";

/* HEAD */

ctx.fillStyle = "#00d4ff";

ctx.beginPath();

ctx.arc(
player.x + 30,
player.y + 20,
18,
0,
Math.PI * 2
);

ctx.fill();

/* BODY */

const bodyGradient =
ctx.createLinearGradient(
player.x,
player.y,
player.x + 60,
player.y + 90
);

bodyGradient.addColorStop(0,"#00d4ff");
bodyGradient.addColorStop(1,"#7c3aed");

ctx.fillStyle =
bodyGradient;

ctx.beginPath();

ctx.roundRect(
player.x + 16,
player.y + 38,
28,
34,
10
);

ctx.fill();

/* ARMS */

ctx.strokeStyle = "#00d4ff";
ctx.lineWidth = 6;

ctx.beginPath();

ctx.moveTo(player.x + 16, player.y + 46);
ctx.lineTo(player.x + 2, player.y + 58);

ctx.moveTo(player.x + 44, player.y + 46);
ctx.lineTo(player.x + 58, player.y + 58);

ctx.stroke();

/* LEGS */

ctx.beginPath();

ctx.moveTo(player.x + 24, player.y + 72);
ctx.lineTo(player.x + 16, player.y + 92);

ctx.moveTo(player.x + 36, player.y + 72);
ctx.lineTo(player.x + 44, player.y + 92);

ctx.stroke();

/* EYES */

ctx.fillStyle = "#ffffff";

ctx.beginPath();

ctx.arc(
player.x + 24,
player.y + 18,
2,
0,
Math.PI * 2
);

ctx.arc(
player.x + 36,
player.y + 18,
2,
0,
Math.PI * 2
);

ctx.fill();

/* ENERGY */

ctx.beginPath();

ctx.arc(
player.x + 30,
player.y + 54,
4,
0,
Math.PI * 2
);

ctx.fill();

ctx.restore();

}

/* OBSTACLE */

function spawnObstacle(){

obstacles.push({

x:canvas.width,

y:canvas.height - 120,

width:40,

height:40

});

}

setInterval(spawnObstacle,1400);

/* DRAW OBSTACLES */

function drawObstacles(){

obstacles.forEach((obs,index)=>{

obs.x -= speed;

ctx.save();

ctx.shadowBlur = 20;

ctx.shadowColor =
"#ff004c";

ctx.fillStyle =
"#ff004c";

ctx.beginPath();

ctx.moveTo(obs.x, obs.y + obs.height);

ctx.lineTo(obs.x + obs.width/2, obs.y);

ctx.lineTo(obs.x + obs.width, obs.y + obs.height);

ctx.closePath();

ctx.fill();

ctx.restore();

/* REMOVE */

if(obs.x + obs.width < 0){

obstacles.splice(index,1);

score++;

scoreEl.innerText =
score;

}

/* COLLISION */

if(

player.x <
obs.x + obs.width &&

player.x + player.width >
obs.x &&

player.y <
obs.y + obs.height &&

player.y + player.height >
obs.y

){

gameRunning = false;

alert("Game Over");

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

drawStars();

/* GROUND */

ctx.fillStyle =
"#ff004c";

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

if(player.y >=
canvas.height - 170){

player.y =
canvas.height - 170;

player.grounded = true;

}

/* DRAW */

drawPlayer();

drawObstacles();

if(gameRunning){

requestAnimationFrame(update);

}

}

update();

/* JUMP */

function jump(){

if(player.grounded){

player.velocityY =
player.jumpForce;

player.grounded = false;

}

}

document.addEventListener(
"touchstart",
jump
);

document.addEventListener(
"keydown",
(e)=>{

if(e.code === "Space"){

jump();

}

});