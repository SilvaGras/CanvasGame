const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let basketX = canvas.width / 2 - 40;
let basketY = canvas.height - 30;
const basketWidth = 80;
const basketHeight = 20;
const basketSpeed = 15;

let objectX = Math.random() * (canvas.width - 20);
let objectY = 0;
const objectWidth = 20;
const objectHeight = 20;
const objectSpeed = 4;

let score = 0;
let missed = 0;
const maxMissed = 5;

document.addEventListener('keydown', moveBasket);

function moveBasket(event) {
    if (event.key === 'ArrowLeft' && basketX > 0) {
        basketX -= basketSpeed;
    } else if (event.key === 'ArrowRight' && basketX < canvas.width - basketWidth) {
        basketX += basketSpeed;
    }
}

function drawBasket() {
    ctx.fillStyle = '#333';
    ctx.fillRect(basketX, basketY, basketWidth, basketHeight);
}

function drawObject() {
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(objectX, objectY, objectWidth, objectHeight);
}

function detectCollision() {
    if (
        objectY + objectHeight >= basketY &&
        objectX + objectWidth > basketX &&
        objectX < basketX + basketWidth
    ) {
        score++;
        resetObject();
    } else if (objectY > canvas.height) {
        missed++;
        resetObject();
    }
}

function resetObject() {
    objectX = Math.random() * (canvas.width - objectWidth);
    objectY = 0;
}

function drawScore() {
    ctx.fillStyle = '#333';
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
    ctx.fillText('Missed: ' + missed, canvas.width - 80, 20);
}

function gameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText('Game Over!', canvas.width / 2 - 60, canvas.height / 2);
    ctx.fillText('Final Score: ' + score, canvas.width / 2 - 60, canvas.height / 2 + 30);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawObject();
    drawScore();
    
    if (missed < maxMissed) {
        objectY += objectSpeed;
        detectCollision();
        requestAnimationFrame(update);
    } else {
        gameOver();
    }
}

update();
