export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 40;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpPower = 12;
        this.gravity = 0.5;
        this.onGround = false;
        this.health = 3;
        this.invincible = false;
        this.invincibleTime = 0;
        this.coins = 0;
        this.facing = 1; // 1 = right, -1 = left
    }

    update(keys, platforms) {
        // Horizontal movement
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            this.velocityX = -this.speed;
            this.facing = -1;
        } else if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            this.velocityX = this.speed;
            this.facing = 1;
        } else {
            this.velocityX *= 0.8; // Friction
        }

        // Jumping
        if ((keys[' '] || keys['ArrowUp'] || keys['w'] || keys['W']) && this.onGround) {
            this.velocityY = -this.jumpPower;
            this.onGround = false;
        }

        // Apply gravity
        this.velocityY += this.gravity;

        // Terminal velocity
        if (this.velocityY > 15) this.velocityY = 15;

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Check platform collisions
        this.onGround = false;
        for (const platform of platforms) {
            if (this.checkCollision(platform)) {
                // Landing on top of platform
                if (this.velocityY > 0 && this.y + this.height - this.velocityY <= platform.y) {
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.onGround = true;
                }
                // Hitting bottom of platform
                else if (this.velocityY < 0 && this.y - this.velocityY >= platform.y + platform.height) {
                    this.y = platform.y + platform.height;
                    this.velocityY = 0;
                }
                // Side collisions
                else {
                    if (this.velocityX > 0) {
                        this.x = platform.x - this.width;
                    } else if (this.velocityX < 0) {
                        this.x = platform.x + platform.width;
                    }
                    this.velocityX = 0;
                }
            }
        }

        // Update invincibility
        if (this.invincible) {
            this.invincibleTime--;
            if (this.invincibleTime <= 0) {
                this.invincible = false;
            }
        }

        // Death by falling
        if (this.y > 600) {
            this.takeDamage();
            this.respawn();
        }
    }

    checkCollision(rect) {
        return this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y;
    }

    takeDamage() {
        if (!this.invincible) {
            this.health--;
            this.invincible = true;
            this.invincibleTime = 120; // 2 seconds at 60fps
            return true;
        }
        return false;
    }

    respawn() {
        this.x = 100;
        this.y = 300;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    collectCoin() {
        this.coins++;
    }

    heal() {
        if (this.health < 3) this.health++;
    }
}

export class Enemy {
    constructor(x, y, type, range) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 25;
        this.type = type; // walker, jumper, flyer
        this.range = range;
        this.startX = x;
        this.velocityX = type === 'flyer' ? 1.5 : 2;
        this.velocityY = 0;
        this.active = true;
        this.jumpTimer = 0;
    }

    update(platforms) {
        if (!this.active) return;

        switch (this.type) {
            case 'walker':
                this.x += this.velocityX;
                if (Math.abs(this.x - this.startX) > this.range) {
                    this.velocityX *= -1;
                }
                // Apply gravity
                this.velocityY += 0.5;
                this.y += this.velocityY;

                // Platform collision
                for (const platform of platforms) {
                    if (this.checkCollision(platform) && this.velocityY > 0) {
                        this.y = platform.y - this.height;
                        this.velocityY = 0;
                    }
                }
                break;

            case 'jumper':
                this.x += this.velocityX;
                if (Math.abs(this.x - this.startX) > this.range) {
                    this.velocityX *= -1;
                }

                this.jumpTimer++;
                if (this.jumpTimer > 60) {
                    this.velocityY = -8;
                    this.jumpTimer = 0;
                }

                this.velocityY += 0.5;
                this.y += this.velocityY;

                for (const platform of platforms) {
                    if (this.checkCollision(platform) && this.velocityY > 0) {
                        this.y = platform.y - this.height;
                        this.velocityY = 0;
                    }
                }
                break;

            case 'flyer':
                this.x += this.velocityX;
                this.y += Math.sin(this.x * 0.05) * 2;
                if (Math.abs(this.x - this.startX) > this.range) {
                    this.velocityX *= -1;
                }
                break;
        }
    }

    checkCollision(rect) {
        return this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y;
    }
}

export class Collectible {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.type = type; // coin, powerup
        this.collected = false;
        this.bobOffset = Math.random() * Math.PI * 2;
        this.rotation = 0;
    }

    update() {
        if (!this.collected) {
            this.bobOffset += 0.05;
            this.rotation += 0.1;
        }
    }

    getBobY() {
        return this.y + Math.sin(this.bobOffset) * 5;
    }
}

export class Particle {
    constructor(x, y, color, velocityX, velocityY, life) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.life = life;
        this.maxLife = life;
        this.size = 3 + Math.random() * 3;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityY += 0.2; // Gravity
        this.life--;
    }

    isAlive() {
        return this.life > 0;
    }

    getAlpha() {
        return this.life / this.maxLife;
    }
}

export class Game {
    constructor(canvas, levelData, theme) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.levelData = levelData;
        this.theme = theme;

        this.player = new Player(100, 300);
        this.platforms = levelData.platforms.map(p => ({ ...p }));
        this.enemies = levelData.enemies.map(e => new Enemy(e.x, e.y, e.type, e.range));
        this.collectibles = levelData.collectibles.map(c => new Collectible(c.x, c.y, c.type));
        this.particles = [];

        this.camera = { x: 0, y: 0 };
        this.keys = {};
        this.score = 0;
        this.gameOver = false;
        this.victory = false;
        this.time = 0;

        this.setupControls();
    }

    setupControls() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    update() {
        if (this.gameOver || this.victory) return;

        this.time++;

        // Update player
        this.player.update(this.keys, this.platforms);

        // Update moving platforms
        this.platforms.forEach(platform => {
            if (platform.moving) {
                if (!platform.moveDirection) platform.moveDirection = 1;
                if (!platform.moveOffset) platform.moveOffset = 0;

                platform.moveOffset += platform.moveDirection * 1;
                if (Math.abs(platform.moveOffset) > platform.moveRange) {
                    platform.moveDirection *= -1;
                }
                platform.x = platform.originalX || platform.x;
                if (!platform.originalX) platform.originalX = platform.x;
                platform.x += platform.moveOffset;
            }
        });

        // Update enemies
        this.enemies.forEach(enemy => enemy.update(this.platforms));

        // Check enemy collisions
        this.enemies.forEach(enemy => {
            if (enemy.active && this.player.checkCollision(enemy)) {
                if (this.player.takeDamage()) {
                    this.createParticles(this.player.x + this.player.width / 2,
                        this.player.y + this.player.height / 2,
                        '#ff0000', 10);
                }
            }
        });

        // Check collectible collisions
        this.collectibles.forEach(collectible => {
            if (!collectible.collected && this.player.checkCollision(collectible)) {
                collectible.collected = true;
                if (collectible.type === 'coin') {
                    this.player.collectCoin();
                    this.score += 10;
                } else if (collectible.type === 'powerup') {
                    this.player.heal();
                    this.score += 50;
                }
                this.createParticles(collectible.x, collectible.y, this.theme.colors.particle, 15);
            }
            collectible.update();
        });

        // Check goal collision
        if (this.player.checkCollision({
            x: this.levelData.goal.x,
            y: this.levelData.goal.y,
            width: 40,
            height: 60
        })) {
            this.victory = true;
            this.score += 100 + (this.player.health * 50);
        }

        // Update particles
        this.particles = this.particles.filter(p => {
            p.update();
            return p.isAlive();
        });

        // Update camera
        this.updateCamera();

        // Check game over
        if (this.player.health <= 0) {
            this.gameOver = true;
        }
    }

    updateCamera() {
        // Smooth camera follow
        const targetX = this.player.x - this.canvas.width / 3;
        this.camera.x += (targetX - this.camera.x) * 0.1;

        // Keep camera in bounds
        this.camera.x = Math.max(0, this.camera.x);
        this.camera.y = 0;
    }

    createParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 2 + Math.random() * 3;
            this.particles.push(new Particle(
                x, y, color,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                30 + Math.random() * 30
            ));
        }
    }

    getState() {
        return {
            player: this.player,
            score: this.score,
            gameOver: this.gameOver,
            victory: this.victory,
            time: this.time
        };
    }
}
