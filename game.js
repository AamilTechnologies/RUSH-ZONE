/* ===== PLAYER STYLE ===== */

function drawPlayer(){

ctx.save();

ctx.shadowBlur = 35;

ctx.shadowColor =
"#00d4ff";

/* PLAYER BODY */

const gradient =
ctx.createLinearGradient(
player.x,
player.y,
player.x + player.width,
player.y + player.height
);

gradient.addColorStop(0,"#00d4ff");
gradient.addColorStop(1,"#7c3aed");

ctx.fillStyle = gradient;

/* ROUNDED PLAYER */

ctx.beginPath();

ctx.roundRect(
player.x,
player.y,
player.width,
player.height,
14
);

ctx.fill();

/* EYE */

ctx.fillStyle = "#fff";

ctx.beginPath();

ctx.arc(
player.x + 42,
player.y + 18,
5,
0,
Math.PI*2
);

ctx.fill();

ctx.restore();

}

/* ===== OBSTACLE STYLE ===== */

function drawObstacles(){

obstacles.forEach((obs,index)=>{

obs.x -= speed;

/* GLOW */

ctx.save();

ctx.shadowBlur = 30;

ctx.shadowColor =
"#ff004c";

/* OBSTACLE */

const obsGradient =
ctx.createLinearGradient(
obs.x,
obs.y,
obs.x + obs.width,
obs.y + obs.height
);

obsGradient.addColorStop(0,"#ff004c");
obsGradient.addColorStop(1,"#ff7b00");

ctx.fillStyle =
obsGradient;

/* SPIKE */

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

/* SPEED */

if(score % 5 === 0){

speed += 0.6;

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
"#ff004c"
);

gameOver();

}

});

}

/* ===== BETTER PARTICLES ===== */

function createParticles(x,y,color){

for(let i=0;i<25;i++){

particles.push({

x,
y,

radius:
Math.random()*5+2,

color,

velocityX:
(Math.random()-0.5)*10,

velocityY:
(Math.random()-0.5)*10,

alpha:1

});

}

}

/* ===== SPEED LINES ===== */

function drawSpeedLines(){

for(let i=0;i<20;i++){

ctx.fillStyle =
"rgba(255,255,255,0.05)";

ctx.fillRect(

Math.random()*canvas.width,

Math.random()*canvas.height,

Math.random()*120,

2

);

}

}

/* ===== UPDATE ===== */

function update(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

/* BG */

drawStars();

drawSpeedLines();

/* GROUND */

const groundGradient =
ctx.createLinearGradient(
0,
canvas.height-90,
0,
canvas.height
);

groundGradient.addColorStop(
0,
"#111827"
);

groundGradient.addColorStop(
1,
"#ff004c"
);

ctx.fillStyle =
groundGradient;

ctx.fillRect(

0,
canvas.height-90,

canvas.width,
90

);

/* PLAYER PHYSICS */

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