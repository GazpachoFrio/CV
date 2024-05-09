const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Definir variables del juego
let shipX = canvas.width / 2;
let shipY = canvas.height / 2;
let shipSize = 20;
let asteroids = [];
let score = 0;

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
    const speed = 5;
    if (event.key === "ArrowUp" && shipY > 0) {
        shipY -= speed;
    } else if (event.key === "ArrowDown" && shipY < canvas.height) {
        shipY += speed;
    } else if (event.key === "ArrowLeft" && shipX > 0) {
        shipX -= speed;
    } else if (event.key === "ArrowRight" && shipX < canvas.width) {
        shipX += speed;
    }
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
