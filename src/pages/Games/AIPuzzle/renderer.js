export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.cellSize = 60; // Base cell size
        this.offsetX = 0;
        this.offsetY = 0;

        // Visual state
        this.particles = [];
        this.animations = [];
        this.theme = this.getDefaultTheme();
        this.time = 0;
    }

    getDefaultTheme() {
        return {
            background: '#0f172a',
            grid: '#1e293b',
            wall: '#334155',
            floor: '#1e293b',
            player: '#6366f1',
            goal: '#10b981',
            hazard: '#ef4444',
            accent: '#ec4899'
        };
    }

    setTheme(themeData) {
        this.theme = { ...this.getDefaultTheme(), ...themeData };
    }

    resize() {
        // Responsive canvas handling could go here
    }

    // Main render loop
    render(gameState) {
        this.time += 0.016; // Approx 60fps

        // Clear canvas
        this.ctx.fillStyle = this.theme.background;
        this.ctx.fillRect(0, 0, this.width, this.height);

        if (!gameState.level) return;

        // Calculate centering offset
        const gridWidth = gameState.level.width * this.cellSize;
        const gridHeight = gameState.level.height * this.cellSize;
        this.offsetX = (this.width - gridWidth) / 2;
        this.offsetY = (this.height - gridHeight) / 2;

        // Draw Grid/Floor
        this.drawGrid(gameState.level);

        // Draw Entities
        this.drawEntities(gameState);

        // Draw Particles
        this.updateAndDrawParticles();

        // Draw Fuzzle Effects (if active)
        if (gameState.fuzzleMode) {
            this.drawFuzzleEffects(gameState);
        }
    }

    drawGrid(level) {
        this.ctx.save();
        this.ctx.translate(this.offsetX, this.offsetY);

        for (let y = 0; y < level.height; y++) {
            for (let x = 0; x < level.width; x++) {
                const cell = level.grid[y][x];
                const px = x * this.cellSize;
                const py = y * this.cellSize;

                // Draw Floor
                this.ctx.fillStyle = this.theme.floor;
                this.ctx.fillRect(px, py, this.cellSize, this.cellSize);

                // Grid lines
                this.ctx.strokeStyle = this.theme.grid;
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(px, py, this.cellSize, this.cellSize);

                // Draw Walls
                if (cell.type === 'wall') {
                    this.drawWall(px, py);
                } else if (cell.type === 'pit') {
                    this.drawPit(px, py);
                } else if (cell.type === 'goal') {
                    this.drawGoal(px, py);
                }
            }
        }
        this.ctx.restore();
    }

    drawWall(x, y) {
        this.ctx.fillStyle = this.theme.wall;
        // 3D effect
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
        this.ctx.fillStyle = this.adjustColor(this.theme.wall, -20);
        this.ctx.fillRect(x, y + this.cellSize - 10, this.cellSize, 10);

        // Top highlight
        this.ctx.fillStyle = this.adjustColor(this.theme.wall, 20);
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize - 10);
    }

    drawPit(x, y) {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(x + 5, y + 5, this.cellSize - 10, this.cellSize - 10);

        // Inner shadow
        const gradient = this.ctx.createRadialGradient(
            x + this.cellSize / 2, y + this.cellSize / 2, 5,
            x + this.cellSize / 2, y + this.cellSize / 2, this.cellSize / 2
        );
        gradient.addColorStop(0, '#000');
        gradient.addColorStop(1, this.theme.floor);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
    }

    drawGoal(x, y) {
        // Pulsing effect
        const pulse = Math.sin(this.time * 5) * 5;
        this.ctx.fillStyle = this.theme.goal;
        this.ctx.beginPath();
        this.ctx.arc(
            x + this.cellSize / 2,
            y + this.cellSize / 2,
            (this.cellSize / 3) + pulse,
            0, Math.PI * 2
        );
        this.ctx.fill();

        // Glow
        this.ctx.shadowColor = this.theme.goal;
        this.ctx.shadowBlur = 20;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }

    drawEntities(gameState) {
        this.ctx.save();
        this.ctx.translate(this.offsetX, this.offsetY);

        // Player
        const p = gameState.player;
        const px = p.x * this.cellSize;
        const py = p.y * this.cellSize;

        // Interpolation for smooth movement could be added here
        // For now, direct position

        this.ctx.fillStyle = this.theme.player;
        this.ctx.shadowColor = this.theme.player;
        this.ctx.shadowBlur = 15;

        // Player shape (rounded rect)
        this.roundRect(
            px + 10, py + 10,
            this.cellSize - 20, this.cellSize - 20,
            10, true, false
        );

        this.ctx.shadowBlur = 0;
        this.ctx.restore();
    }

    drawFuzzleEffects(gameState) {
        // Glitch effect occasionally
        if (Math.random() < 0.05) {
            const h = Math.random() * this.height;
            const y = Math.random() * this.height;
            const offset = (Math.random() - 0.5) * 20;

            this.ctx.drawImage(
                this.canvas,
                0, y, this.width, h,
                offset, y, this.width, h
            );
        }
    }

    updateAndDrawParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.life -= 0.02;
            p.x += p.vx;
            p.y += p.vy;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        }
    }

    addParticle(x, y, color, count = 5) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + this.offsetX,
                y: y + this.offsetY,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1.0,
                color: color,
                size: Math.random() * 4 + 2
            });
        }
    }

    // Utility
    roundRect(x, y, w, h, r, fill = true, stroke = false) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.arcTo(x + w, y, x + w, y + h, r);
        this.ctx.arcTo(x + w, y + h, x, y + h, r);
        this.ctx.arcTo(x, y + h, x, y, r);
        this.ctx.arcTo(x, y, x + w, y, r);
        this.ctx.closePath();
        if (fill) this.ctx.fill();
        if (stroke) this.ctx.stroke();
    }

    adjustColor(color, amount) {
        return color; // Placeholder for color manipulation logic
    }
}
