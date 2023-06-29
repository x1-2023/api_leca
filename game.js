// Import thư viện random (không cần import pygame trong JavaScript)
// Đoạn mã Python sử dụng thư viện random nhưng không được sử dụng trong đoạn mã Python đã đưa ra
// Để tạo số ngẫu nhiên trong JavaScript, bạn có thể sử dụng hàm Math.random()
// Ví dụ: var randomNumber = Math.random(); - random từ 0 đến 1

// Define colors (Python-style constants không cần thiết trong JavaScript)
const BLACK = [0, 0, 0];
const WHITE = [255, 255, 255];
const RED = [255, 0, 0];
const GREEN = [0, 255, 0];
const BLUE = [0, 0, 255];

// Initialize canvas
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
document.title = 'Flappy Bird with Gun';

// Load images (không cần sử dụng pygame.image.load() trong JavaScript)
// Hãy chắc chắn rằng các hình ảnh đã được tải lên và được tham chiếu bằng đúng đường dẫn

// Set up player
class Player {
    constructor() {
        this.image = new Image();
        this.image.src = 'bird.png';
        this.x = 50;
        this.y = canvas.height / 2;
        this.speed = 0;
    }

    update() {
        // Xử lý các sự kiện bàn phím
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') {
                this.speed = -10;
            }
        });

        // Cập nhật vị trí của player
        this.speed += 0.5;
        this.y += this.speed;
        if (this.y < 0) {
            this.y = 0;
            this.speed = 0;
        } else if (this.y > canvas.height - 50) {
            this.y = canvas.height - 50;
            this.speed = 0;
            state = 'over';
        }
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

// Set up bullet
class Bullet {
    constructor() {
        this.image = new Image();
        this.image.src = 'bullet.png';
        this.x = 0;
        this.y = 0;
        this.speed = 10;
        this.active = false;
    }

    update() {
        if (this.active) {
            this.x += this.speed;
            if (this.x > canvas.width) {
                this.active = false;
            }
        }
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

// Set up obstacle
class Obstacle {
    constructor() {
        this.image = new Image();
        this.image.src = 'chim.png';
        this.x = canvas.width;
        this.y = Math.floor(Math.random() * (canvas.height - 100));
        this.width = 50;
        this.height = 100;
        this.speed = 5;
    }

    update() {
        this.x -= this.speed;
        if (this.x < -this.width) {
            this.x = canvas.width;
            this.y = Math.floor(Math.random() * (canvas.height - 100));
        }
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y);
    }
}

// Set up font (không cần font trong JavaScript)

// Set up game objects
const player = new Player();
const bullet = new Bullet();
const obstacle = new Obstacle();
const allSprites = [player, bullet, obstacle];

// Set up variables
let score = 0;
let state = 'waiting';
let running = true;
const clock = new Clock();

// Draw waiting screen
function drawWaitingScreen() {
    ctx.drawImage(backgroundImg, 0, 0);
    ctx.fillText('Press Arrow Up to play', canvas.width / 2, canvas.height / 2);
}

// Game loop
function gameLoop() {
    if (!running) return;

    // Xử lý các sự kiện
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            running = false;
        }
    });

    // Cập nhật trạng thái và vẽ đồ họa
    if (state === 'playing') {
        allSprites.forEach((sprite) => {
            sprite.update();
        });

        // Xử lý va chạm
        if (checkCollision(player, obstacle)) {
            state = 'over';
        }
        if (checkCollision(bullet, obstacle)) {
            obstacle.x = canvas.width;
            obstacle.height = Math.floor(Math.random() * 400) + 100;
            bullet.active = false;
            bullet.x = -100;
            score += 10;
        }

        // Vẽ điểm
        ctx.drawImage(backgroundImg, 0, 0);
        allSprites.forEach((sprite) => {
            sprite.draw();
        });
        ctx.fillText('Score: ' + score, canvas.width - 10, 10);

        // Vẽ màn hình game over nếu trò chơi kết thúc
        if (state === 'over') {
            ctx.fillText('Game Over! Press R to restart', canvas.width / 2, canvas.height / 2);
        }
    } else if (state === 'waiting') {
        drawWaitingScreen();
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
