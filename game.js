const canvas =
document.getElementById(
'gameCanvas'
);

const ctx =
canvas.getContext('2d');

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

/* SCORE */

const scoreEl =
document.getElementById(
'score'
);

/* PLAYER */

const player = {

x:120,

y:canvas.height - 220,

width:60,
height:120,

velocityY:0,

gravity:1,

jump:-20,

grounded:true

};

/* GAME */

let obstacles = [];

let score = 0;

let speed = 8;

let gameRunning = false;

/* CREATE OBSTACLE */

function createObstacle(){

obstacles.push({

x:canvas.width,

y:canvas.height - 120,

width:45,
height:45

});

}

setInterval(()=>{

if(gameRunning){

createObstacle();

}

},1400);

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

bodyGradient.addColorStop(
0,
"#00d4ff"
);

bodyGradient.addColorStop(
1,
"#7c3aed"
);

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

ctx.strokeStyle =
"#00d4ff";

ctx.lineWidth = 6;

ctx.beginPath();

ctx.moveTo(
player.x + 16,
player.y + 46
);

ctx.lineTo(
player.x + 2,
player.y + 58
);

ctx.moveTo(
player.x + 44,
player.y + 46
);

ctx.lineTo(
player.x + 58,
player.y + 58
);

ctx.stroke();

/* LEGS */

ctx.beginPath();

ctx.moveTo(
player.x + 24,
player.y + 72
);

ctx.lineTo(
player.x + 16,
player.y + 92
);

ctx.moveTo(
player.x + 36,
player.y + 72
);

ctx.lineTo(
player.x + 44,
player.y + 92
);

ctx.stroke();

/* EYES */

ctx.fillStyle =
"#ffffff";

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

ctx.restore();

}

/* OBSTACLES */

function drawObstacles(){

obstacles.forEach((obs,index)=>{

obs.x -= speed;

/* SPIKE */

ctx.save();

ctx.shadowBlur = 20;

ctx.shadowColor =
"#ff004c";

ctx.fillStyle =
"#ff004c";

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

gameOver();

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

/* GROUND */

if(
player.y >=
canvas.height - 220
){

player.y =
canvas.height - 220;

player.grounded =
true;

}

/* DRAW */

drawPlayer();

drawObstacles();

/* LOOP */

if(gameRunning){

requestAnimationFrame(
update
);

}

}

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

window.addEventListener(
'keydown',
(e)=>{

if(e.code === 'Space'){

jump();

}

}
);

window.addEventListener(
'touchstart',
()=>{

jump();

}
);

/* START */

function startGame(){

obstacles = [];

score = 0;

scoreEl.innerText = 0;

gameRunning = true;

document.getElementById(
'startScreen'
).style.display = 'none';

document.getElementById(
'gameOver'
).style.display = 'none';

update();

}

/* GAME OVER */

function gameOver(){

gameRunning = false;

document.getElementById(
'gameOver'
).style.display = 'flex';

}

/* BUTTONS */

document.getElementById(
'startBtn'
).onclick = startGame;

document.getElementById(
'restartBtn'
).onclick = startGame;

/* RESIZE */

window.addEventListener(
'resize',
()=>{

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

}
);