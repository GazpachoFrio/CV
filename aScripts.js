const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Definir variables del juego
let shipSize = 20;
let asteroids = [];
let score = 0;
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let shipSpeed = 5;

// Crear nave
function drawShip() {
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.moveTo(shipX, shipY - shipSize);
    ctx.lineTo(shipX + shipSize, shipY + shipSize);
    ctx.lineTo(shipX - shipSize, shipY + shipSize);
    ctx.closePath();
    ctx.fill();
}

// Crear asteroides
function createAsteroids() {
    asteroids.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 30 + 15,
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 4 - 2
    });
}

// Dibujar asteroides
function drawAsteroids() {
    asteroids.forEach(asteroid => {
        ctx.beginPath();
        ctx.fillStyle = "#aaa";
        ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Mover nave
function moveShip(event) {
    mouseX = event.clientX - canvas.getBoundingClientRect().left;
    mouseY = event.clientY - canvas.getBoundingClientRect().top;
}
// Draw bullets
function drawBullets() {
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.fillStyle = "#f00";
        ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
}
// Fire bullets on click
function fireBullet() {
    bullets.push({ x: mouseX, y: mouseY });
}

// Move bullets
function moveBullets() {
    bullets.forEach(bullet => {
        bullet.y -= bulletSpeed;
    });
}

// Collision detection between bullets and asteroids
function checkBulletAsteroidCollision() {
    bullets.forEach(bullet => {
        asteroids.forEach((asteroid, asteroidIndex) => {
            const distance = Math.sqrt((bullet.x - asteroid.x)**2 + (bullet.y - asteroid.y)**2);
            if (distance < asteroid.radius) {
                bullets.splice(bullets.indexOf(bullet), 1);
                asteroids.splice(asteroidIndex, 1);
                score += 10;
            }
        });
    });
}
// Colisión entre nave y asteroides
function checkCollision() {
    asteroids.forEach(asteroid => {
        const distance = Math.sqrt((shipX - asteroid.x)**2 + (shipY - asteroid.y)**2);
        if (distance < shipSize + asteroid.radius) {
            alert("Game Over! Score: " + score);
            location.reload(); // Reiniciar juego
        }
    });
}

// Actualizar juego
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShip();
    drawAsteroids();
    checkCollision();
    score++;
    requestAnimationFrame(update);
}

// Iniciar juego
function startGame() {
    setInterval(createAsteroids, 1000); // Crear asteroides cada segundo
    document.addEventListener("keydown", moveShip);
    update();
}

startGame();
