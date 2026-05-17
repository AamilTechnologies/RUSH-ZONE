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