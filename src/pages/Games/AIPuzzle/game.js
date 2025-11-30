import { Renderer } from './renderer.js';
import { LevelGenerator } from './levelGenerator.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.renderer = new Renderer(this.canvas);
        this.generator = new LevelGenerator();

        this.state = {
            level: null,
            player: { x: 0, y: 0 },
            moves: 0,
            levelNum: 1,
            theme: 'cyberpunk',
            fuzzleMode: false,
            isGenerating: false,
            gameOver: false
        };

        this.setupEventListeners();
        this.showThemeModal();

        // Start render loop
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    setupEventListeners() {
        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            if (this.state.isGenerating || this.state.gameOver) return;

            switch (e.key) {
                case 'ArrowUp': case 'w': this.move(0, -1); break;
                case 'ArrowDown': case 's': this.move(0, 1); break;
                case 'ArrowLeft': case 'a': this.move(-1, 0); break;
                case 'ArrowRight': case 'd': this.move(1, 0); break;
                case 'r': this.restartLevel(); break;
                case 'h': this.showHint(); break;
            }
        });

        // UI Buttons
        document.getElementById('start-custom-btn').addEventListener('click', () => {
            const customTheme = document.getElementById('custom-theme-input').value;
            if (customTheme) this.startLevel(customTheme);
        });

        document.getElementById('next-level-btn').addEventListener('click', () => {
            document.getElementById('win-overlay').classList.add('hidden');
            this.state.levelNum++;
            this.showThemeModal();
        });

        document.getElementById('fuzzle-toggle').addEventListener('change', (e) => {
            this.state.fuzzleMode = e.target.checked;
            const badge = document.querySelector('.fuzzle-badge');
            if (this.state.fuzzleMode) badge.classList.remove('hidden');
            else badge.classList.add('hidden');
        });
    }

    showThemeModal() {
        const modal = document.getElementById('theme-modal');
        const grid = document.querySelector('.theme-grid');
        grid.innerHTML = '';

        // Generate theme cards
        Object.entries(this.generator.themes).forEach(([key, theme]) => {
            const card = document.createElement('div');
            card.className = 'theme-card';
            card.innerHTML = `
                <span class="theme-icon">🎨</span>
                <div class="theme-name">${theme.name}</div>
            `;
            card.onclick = () => this.startLevel(key);
            grid.appendChild(card);
        });

        modal.classList.add('active');
    }

    async startLevel(themeKey) {
        document.getElementById('theme-modal').classList.remove('active');
        document.getElementById('loading-overlay').classList.remove('hidden');

        this.state.isGenerating = true;
        this.state.theme = themeKey;

        // Update renderer theme
        const themeData = this.generator.themes[themeKey] || this.generator.themes['cyberpunk'];
        this.renderer.setTheme(themeData.colors);
        document.getElementById('level-theme').textContent = themeData.name;

        // Generate Level
        const levelData = await this.generator.generateLevel(
            themeKey,
            this.state.levelNum,
            this.state.fuzzleMode
        );

        this.initLevel(levelData);

        document.getElementById('loading-overlay').classList.add('hidden');
        this.state.isGenerating = false;
    }

    initLevel(levelData) {
        this.state.level = {
            ...levelData,
            grid: levelData.grid.map(row => row.map(cell => ({ type: cell }))) // Deep copy for state
        };

        // Find player start
        for (let y = 0; y < levelData.height; y++) {
            for (let x = 0; x < levelData.width; x++) {
                if (levelData.grid[y][x] === 'start') {
                    this.state.player = { x, y };
                }
            }
        }

        this.state.moves = 0;
        this.state.gameOver = false;
        this.updateUI();
    }

    move(dx, dy) {
        const newX = this.state.player.x + dx;
        const newY = this.state.player.y + dy;
        const level = this.state.level;

        // Bounds check
        if (newX < 0 || newX >= level.width || newY < 0 || newY >= level.height) return;

        const targetCell = level.grid[newY][newX];

        // Collision check
        if (targetCell.type === 'wall') return;

        // Move player
        this.state.player.x = newX;
        this.state.player.y = newY;
        this.state.moves++;

        // Particle effect
        this.renderer.addParticle(
            newX * this.renderer.cellSize + this.renderer.cellSize / 2,
            newY * this.renderer.cellSize + this.renderer.cellSize / 2,
            this.renderer.theme.player,
            3
        );

        // Check Win
        if (targetCell.type === 'goal') {
            this.handleWin();
        }

        // Check Hazard
        if (targetCell.type === 'pit') {
            this.handleDeath();
        }

        // Fuzzle Logic
        if (this.state.fuzzleMode) {
            this.handleFuzzleMechanics();
        }

        this.updateUI();
    }

    handleFuzzleMechanics() {
        // Example: Every 5 moves, shift a random wall
        if (this.state.moves % 5 === 0) {
            const level = this.state.level;
            // Find a random floor and make it a wall
            let x, y;
            do {
                x = Math.floor(Math.random() * level.width);
                y = Math.floor(Math.random() * level.height);
            } while (
                level.grid[y][x].type !== 'floor' ||
                (x === this.state.player.x && y === this.state.player.y)
            );

            level.grid[y][x].type = 'wall';
            this.renderer.addParticle(
                x * this.renderer.cellSize + this.renderer.cellSize / 2,
                y * this.renderer.cellSize + this.renderer.cellSize / 2,
                '#ff00ff', 10
            );
        }
    }

    handleWin() {
        this.state.gameOver = true;
        document.getElementById('win-overlay').classList.remove('hidden');
        // Play sound (simulated)
    }

    handleDeath() {
        // Respawn
        this.initLevel(this.state.level); // Reset positions
    }

    restartLevel() {
        this.initLevel(this.state.level);
    }

    showHint() {
        const hintEl = document.getElementById('hint-overlay');
        document.getElementById('hint-text').textContent = this.state.level.hint || "No hint available.";
        hintEl.classList.remove('hidden');
    }

    updateUI() {
        document.getElementById('moves-display').textContent = this.state.moves;
        document.getElementById('level-display').textContent = this.state.levelNum;
    }

    loop() {
        this.renderer.render(this.state);
        requestAnimationFrame(this.loop);
    }
}

// Global helper for HTML onclick
window.hideHint = () => {
    document.getElementById('hint-overlay').classList.add('hidden');
};

// Start Game
new Game();
