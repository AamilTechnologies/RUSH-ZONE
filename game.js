function drawPlayer(){

/* ===== PLAYER IMAGE ===== */

const playerImg = new Image();

playerImg.src =
"https://i.imgur.com/9Xn4F6M.png";

/* ===== DRAW PLAYER ===== */

function drawPlayer(){

ctx.save();

ctx.shadowBlur = 25;

ctx.shadowColor =
"#00d4ff";

/* DRAW CHARACTER */

ctx.drawImage(

playerImg,

player.x,
player.y,

80,
80

);

ctx.restore();

}

/* BODY */

const bodyGradient =
ctx.createLinearGradient(
player.x,
player.y,
player.x + player.width,
player.y + player.height
);

bodyGradient.addColorStop(0,"#00d4ff");
bodyGradient.addColorStop(1,"#7c3aed");

ctx.fillStyle = bodyGradient;

/* HEAD */

ctx.beginPath();

ctx.arc(
player.x + 30,
player.y + 22,
18,
0,
Math.PI*2
);

ctx.fill();

/* BODY */

ctx.fillRect(
player.x + 18,
player.y + 38,
24,
34
);

/* ARMS */

ctx.lineWidth = 6;
ctx.strokeStyle = "#00d4ff";

ctx.beginPath();

ctx.moveTo(player.x + 18, player.y + 45);
ctx.lineTo(player.x + 5, player.y + 58);

ctx.moveTo(player.x + 42, player.y + 45);
ctx.lineTo(player.x + 55, player.y + 58);

ctx.stroke();

/* LEGS */

ctx.beginPath();

ctx.moveTo(player.x + 24, player.y + 72);
ctx.lineTo(player.x + 18, player.y + 92);

ctx.moveTo(player.x + 36, player.y + 72);
ctx.lineTo(player.x + 42, player.y + 92);

ctx.stroke();

/* EYES */

ctx.fillStyle = "#fff";

ctx.beginPath();

ctx.arc(
player.x + 24,
player.y + 20,
2,
0,
Math.PI*2
);

ctx.arc(
player.x + 36,
player.y + 20,
2,
0,
Math.PI*2
);

ctx.fill();

ctx.restore();

}