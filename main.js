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

const particles = [];

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

/* PARTICLES */

function createParticles(){

for(let i=0;i<12;i++){

particles.push({

x:player.x + 30,

y:player.y + 70,

size:Math.random()*6 + 2,

speedX:(Math.random()-0.5)*4,

speedY:Math.random()*-3,

life:30

});

}

}

function drawParticles(){

particles.forEach((p,index)=>{

p.x += p.speedX;

p.y += p.speedY;

p.life--;

ctx.fillStyle =
`rgba(0,212,255,${
p.life / 30
})`;

ctx.beginPath();

ctx.arc(
p.x,
p.y,
p.size,
0,
Math.PI*2
);

ctx.fill();

if(p.life <= 0){

particles.splice(index,1);

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

/* CYBER BACKGROUND */

const skyGradient =
ctx.createLinearGradient(
0,
0,
0,
canvas.height
);

skyGradient.addColorStop(
0,
"#08111f"
);

skyGradient.addColorStop(
1,
"#050816"
);

ctx.fillStyle =
skyGradient;

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

/* STARS */

for(let i=0;i<80;i++){

ctx.fillStyle =
"rgba(255,255,255,0.4)";

ctx.beginPath();

ctx.arc(

(i * 40 + Date.now()*0.02 % canvas.width),

(i * 25) % canvas.height,

Math.random()*2,

0,

Math.PI*2

);

ctx.fill();

}

/* CYBER CITY */

for(let i=0;i<12;i++){

const buildingX =
i * 140 -
(Date.now()*0.08 % 140);

const buildingHeight =
180 + Math.sin(i)*80;

const buildingGradient =
ctx.createLinearGradient(
0,
canvas.height - buildingHeight,
0,
canvas.height
);

buildingGradient.addColorStop(
0,
"rgba(0,212,255,0.15)"
);

buildingGradient.addColorStop(
1,
"rgba(124,58,237,0.4)"
);

ctx.fillStyle =
buildingGradient;

ctx.fillRect(

buildingX,

canvas.height -
buildingHeight - 80,

90,

buildingHeight

);

/* WINDOWS */

for(let y=0;y<buildingHeight;y+=20){

ctx.fillStyle =
"rgba(0,212,255,0.4)";

ctx.fillRect(

buildingX + 15,

canvas.height -
buildingHeight -
60 + y,

8,

8

);

ctx.fillRect(

buildingX + 45,

canvas.height -
buildingHeight -
60 + y,

8,

8

);

}

}

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