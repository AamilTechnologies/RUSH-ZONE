const canvas =
document.getElementById("gameCanvas");

const ctx =
canvas.getContext("2d");

/* CANVAS */

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

/* SCORE */

const scoreEl =
document.getElementById("score");

/* PLAYER */

const player = {

x:120,

y:canvas.height - 170,

width:60,
height:60,

color:"#00d4ff",

velocityY:0,

gravity:1,

jump:-20,

grounded:true

};

/* GAME */

let obstacles = [];

let particles = [];

let score = 0;

let speed = 8;

let gameRunning = false;

/* PARTICLES */

function createParticles(x,y,color){

for(let i=0;i<15;i++){

particles.push({

x,
y,

radius:
Math.random()*4+2,

color,

velocityX:
(Math.random()-0.5)*6,

velocityY:
(Math.random()-0.5)*6,

alpha:1

});

}

}

/* OBSTACLE */

function createObstacle(){

obstacles.push({

x:canvas.width,

y:canvas.height - 150,

width:50,
height:50,

color:"#ff4d6d"

});

}

/* SPAWN */

setInterval(()=>{

if(gameRunning){

createObstacle();

}

},1400);

/* PLAYER */

function drawPlayer(){

ctx.save();

ctx.shadowBlur = 25;

ctx.shadowColor =
"#00d4ff";

ctx.fillStyle =
player.color;

ctx.fillRect(

player.x,
player.y,

player.width,
player.height

);

ctx.restore();

}

/* OBSTACLES */

function drawObstacles(){

obstacles.forEach((obs,index)=>{

obs.x -= speed;

ctx.save();

ctx.shadowBlur = 25;

ctx.shadowColor =
"#ff4d6d";

ctx.fillStyle =
obs.color;

ctx.fillRect(

obs.x,
obs.y,

obs.width,
obs.height

);

ctx.restore();

/* REMOVE */

if(obs.x + obs.width < 0){

obstacles.splice(index,1);

score++;

scoreEl.innerText =
score;

/* SPEED UP */

if(score % 5 === 0){

speed += 0.5;

}

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

createParticles(
player.x,
player.y,
"#ff4d6d"
);

gameOver();

}

});

}

/* PARTICLES */

function drawParticles(){

particles.forEach((p,index)=>{

p.x += p.velocityX;

p.y += p.velocityY;

p.alpha -= 0.02;

ctx.save();

ctx.globalAlpha =
p.alpha;

ctx.fillStyle =
p.color;

ctx.beginPath();

ctx.arc(
p.x,
p.y,
p.radius,
0,
Math.PI*2
);

ctx.fill();

ctx.restore();

if(p.alpha <= 0){

particles.splice(index,1);

}

});

}

/* STARS */

function drawStars(){

for(let i=0;i<50;i++){

ctx.fillStyle =
"rgba(255,255,255,0.08)";

ctx.fillRect(

Math.random()*canvas.width,

Math.random()*canvas.height,

2,
2

);

}

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
"#111827";

ctx.fillRect(

0,
canvas.height-90,

canvas.width,
90

);

/* PHYSICS */

player.velocityY +=
player.gravity;

player.y +=
player.velocityY;

/* GROUND */

if(player.y >=
canvas.height - 170){

player.y =
canvas.height - 170;

player.grounded = true;

}

/* DRAW */

drawPlayer();

drawObstacles();

drawParticles();

/* LOOP */

if(gameRunning){

requestAnimationFrame(update);

}

}

/* JUMP */

function jump(){

if(player.grounded){

player.velocityY =
player.jump;

player.grounded =
false;

createParticles(
player.x + 20,
player.y + 40,
"#00d4ff"
);

}

}

/* KEYBOARD */

window.addEventListener(
"keydown",
(e)=>{

if(e.code === "Space"){

jump();

}

}
);

/* TOUCH */

window.addEventListener(
"touchstart",
()=>{

jump();

}
);

/* START */

function startGame(){

obstacles = [];

particles = [];

score = 0;

speed = 8;

scoreEl.innerText = 0;

gameRunning = true;

document.getElementById(
"startScreen"
).style.display = "none";

document.getElementById(
"gameOver"
).style.display = "none";

update();

}

/* GAME OVER */

function gameOver(){

gameRunning = false;

document.getElementById(
"gameOver"
).style.display = "flex";

}

/* BUTTONS */

document.getElementById(
"startBtn"
).onclick = startGame;

document.getElementById(
"restartBtn"
).onclick = startGame;

/* RESIZE */

window.addEventListener(
"resize",
()=>{

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

}
);