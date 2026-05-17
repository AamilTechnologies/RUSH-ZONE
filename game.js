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

/* ENERGY CORE */

ctx.fillStyle = "#ffffff";

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