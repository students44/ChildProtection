export class Renderer {
    constructor(canvas, theme) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.theme = theme;
        this.backgroundOffset = 0;
    }

    render(game) {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background
        this.drawBackground(game.camera);

        // Save context for camera transform
        this.ctx.save();
        this.ctx.translate(-game.camera.x, -game.camera.y);

        // Draw platforms
        game.platforms.forEach(platform => this.drawPlatform(platform));

        // Draw collectibles
        game.collectibles.forEach(collectible => {
            if (!collectible.collected) {
                this.drawCollectible(collectible);
            }
        });

        // Draw enemies
        game.enemies.forEach(enemy => {
            if (enemy.active) {
                this.drawEnemy(enemy);
            }
        });

        // Draw goal
        this.drawGoal(game.levelData.goal);

        // Draw particles
        game.particles.forEach(particle => this.drawParticle(particle));

        // Draw player
        this.drawPlayer(game.player);

        // Restore context
        this.ctx.restore();

        // Draw UI (not affected by camera)
        this.drawUI(game);

        // Draw game over / victory screens
        if (game.gameOver) {
            this.drawGameOver(game);
        } else if (game.victory) {
            this.drawVictory(game);
        }
    }

    drawBackground(camera) {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, this.theme.colors.bg[0]);
        gradient.addColorStop(0.5, this.theme.colors.bg[1]);
        gradient.addColorStop(1, this.theme.colors.bg[2]);

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Parallax stars/particles in background
        this.backgroundOffset += 0.5;
        for (let i = 0; i < 50; i++) {
            const x = (i * 157 + this.backgroundOffset * 0.3) % this.canvas.width;
            const y = (i * 73) % this.canvas.height;
            const size = (i % 3) + 1;

            this.ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + (i % 3) * 0.2})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawPlatform(platform) {
        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(platform.x + 5, platform.y + 5, platform.width, platform.height);

        // Platform gradient
        const gradient = this.ctx.createLinearGradient(
            platform.x, platform.y,
            platform.x, platform.y + platform.height
        );
        gradient.addColorStop(0, this.lightenColor(this.theme.colors.platform, 20));
        gradient.addColorStop(1, this.theme.colors.platform);

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

        // Highlight
        this.ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;
        this.ctx.fillRect(platform.x, platform.y, platform.width, 3);

        // Border
        this.ctx.strokeStyle = this.theme.colors.accent;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
    }

    drawPlayer(player) {
        this.ctx.save();
        this.ctx.translate(player.x + player.width / 2, player.y + player.height / 2);

        // Flip if facing left
        if (player.facing === -1) {
            this.ctx.scale(-1, 1);
        }

        // Invincibility flicker
        if (player.invincible && Math.floor(player.invincibleTime / 5) % 2 === 0) {
            this.ctx.globalAlpha = 0.5;
        }

        // Body
        const bodyGradient = this.ctx.createLinearGradient(0, -player.height / 2, 0, player.height / 2);
        bodyGradient.addColorStop(0, this.theme.colors.accent);
        bodyGradient.addColorStop(1, this.darkenColor(this.theme.colors.accent, 30));

        this.ctx.fillStyle = bodyGradient;
        this.ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);

        // Eyes
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(-8, -15, 6, 6);
        this.ctx.fillRect(2, -15, 6, 6);

        // Pupils
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(-6, -13, 3, 3);
        this.ctx.fillRect(4, -13, 3, 3);

        // Outline
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(-player.width / 2, -player.height / 2, player.width, player.height);

        this.ctx.restore();

        // Jump trail effect
        if (!player.onGround) {
            this.ctx.fillStyle = `${this.theme.colors.particle}33`;
            this.ctx.fillRect(player.x + 5, player.y + player.height, player.width - 10, 3);
        }
    }

    drawEnemy(enemy) {
        const colors = {
            walker: '#ff4444',
            jumper: '#ff8844',
            flyer: '#ff44ff'
        };

        // Shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(enemy.x + enemy.width / 2 + 3, enemy.y + enemy.height + 3, enemy.width / 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Body
        const gradient = this.ctx.createRadialGradient(
            enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 0,
            enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2
        );
        gradient.addColorStop(0, this.lightenColor(colors[enemy.type], 30));
        gradient.addColorStop(1, colors[enemy.type]);

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.width / 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Eyes
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(enemy.x + enemy.width / 2 - 5, enemy.y + enemy.height / 2 - 3, 3, 0, Math.PI * 2);
        this.ctx.arc(enemy.x + enemy.width / 2 + 5, enemy.y + enemy.height / 2 - 3, 3, 0, Math.PI * 2);
        this.ctx.fill();

        // Pupils
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(enemy.x + enemy.width / 2 - 5, enemy.y + enemy.height / 2 - 3, 1.5, 0, Math.PI * 2);
        this.ctx.arc(enemy.x + enemy.width / 2 + 5, enemy.y + enemy.height / 2 - 3, 1.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Type indicator
        if (enemy.type === 'flyer') {
            // Wings
            this.ctx.fillStyle = `${colors[enemy.type]}88`;
            this.ctx.beginPath();
            this.ctx.ellipse(enemy.x, enemy.y + enemy.height / 2, 8, 4, Math.PI / 4, 0, Math.PI * 2);
            this.ctx.ellipse(enemy.x + enemy.width, enemy.y + enemy.height / 2, 8, 4, -Math.PI / 4, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawCollectible(collectible) {
        const y = collectible.getBobY();

        this.ctx.save();
        this.ctx.translate(collectible.x + collectible.width / 2, y + collectible.height / 2);
        this.ctx.rotate(collectible.rotation);

        if (collectible.type === 'coin') {
            // Coin
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, collectible.width / 2);
            gradient.addColorStop(0, '#ffeb3b');
            gradient.addColorStop(0.7, '#ffc107');
            gradient.addColorStop(1, '#ff9800');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, collectible.width / 2, 0, Math.PI * 2);
            this.ctx.fill();

            // Shine
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.beginPath();
            this.ctx.arc(-3, -3, 4, 0, Math.PI * 2);
            this.ctx.fill();

            // Border
            this.ctx.strokeStyle = '#f57c00';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, collectible.width / 2, 0, Math.PI * 2);
            this.ctx.stroke();
        } else {
            // Power-up (heart)
            this.ctx.fillStyle = '#ff1744';
            this.ctx.beginPath();
            this.ctx.moveTo(0, 5);
            this.ctx.bezierCurveTo(-10, -5, -10, -10, 0, -3);
            this.ctx.bezierCurveTo(10, -10, 10, -5, 0, 5);
            this.ctx.fill();

            // Shine
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            this.ctx.beginPath();
            this.ctx.arc(-3, -3, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();

        // Glow effect
        this.ctx.fillStyle = `${this.theme.colors.particle}22`;
        this.ctx.beginPath();
        this.ctx.arc(collectible.x + collectible.width / 2, y + collectible.height / 2, collectible.width, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawGoal(goal) {
        // Flag pole
        this.ctx.fillStyle = '#8b4513';
        this.ctx.fillRect(goal.x + 18, goal.y, 4, 60);

        // Flag
        const gradient = this.ctx.createLinearGradient(goal.x, goal.y, goal.x + 40, goal.y + 30);
        gradient.addColorStop(0, this.theme.colors.accent);
        gradient.addColorStop(1, this.lightenColor(this.theme.colors.accent, 40));

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.moveTo(goal.x + 22, goal.y + 5);
        this.ctx.lineTo(goal.x + 55, goal.y + 20);
        this.ctx.lineTo(goal.x + 22, goal.y + 35);
        this.ctx.closePath();
        this.ctx.fill();

        // Flag outline
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(goal.x + 22, goal.y + 5);
        this.ctx.lineTo(goal.x + 55, goal.y + 20);
        this.ctx.lineTo(goal.x + 22, goal.y + 35);
        this.ctx.stroke();

        // Sparkles around goal
        const time = Date.now() * 0.003;
        for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i / 8) + time;
            const x = goal.x + 20 + Math.cos(angle) * 30;
            const y = goal.y + 20 + Math.sin(angle) * 30;

            this.ctx.fillStyle = this.theme.colors.particle;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawParticle(particle) {
        this.ctx.fillStyle = `${particle.color}${Math.floor(particle.getAlpha() * 255).toString(16).padStart(2, '0')}`;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawUI(game) {
        const padding = 20;

        // Score
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3;
        this.ctx.strokeText(`Score: ${game.score}`, padding, padding + 24);
        this.ctx.fillText(`Score: ${game.score}`, padding, padding + 24);

        // Coins
        this.ctx.strokeText(`🪙 ${game.player.coins}`, padding, padding + 54);
        this.ctx.fillText(`🪙 ${game.player.coins}`, padding, padding + 54);

        // Health
        const heartSize = 30;
        for (let i = 0; i < 3; i++) {
            const x = this.canvas.width - padding - (3 - i) * (heartSize + 10);
            const y = padding;

            if (i < game.player.health) {
                this.ctx.fillStyle = '#ff1744';
            } else {
                this.ctx.fillStyle = '#444444';
            }

            // Draw heart
            this.ctx.beginPath();
            this.ctx.moveTo(x + heartSize / 2, y + heartSize * 0.8);
            this.ctx.bezierCurveTo(
                x + heartSize / 2 - heartSize / 2, y,
                x, y,
                x + heartSize / 2, y + heartSize / 3
            );
            this.ctx.bezierCurveTo(
                x + heartSize, y,
                x + heartSize / 2 + heartSize / 2, y,
                x + heartSize / 2, y + heartSize * 0.8
            );
            this.ctx.fill();
        }

        // Level indicator
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.strokeText(`Level ${game.levelData.levelNumber || 1}`, this.canvas.width / 2, padding + 24);
        this.ctx.fillText(`Level ${game.levelData.levelNumber || 1}`, this.canvas.width / 2, padding + 24);
        this.ctx.textAlign = 'left';
    }

    drawGameOver(game) {
        // Overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Game Over text
        this.ctx.font = 'bold 60px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#ff4444';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 5;
        this.ctx.strokeText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 50);
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 50);

        // Score
        this.ctx.font = 'bold 30px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeText(`Final Score: ${game.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
        this.ctx.fillText(`Final Score: ${game.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);

        // Instruction
        this.ctx.font = '20px Arial';
        this.ctx.fillText('Press ENTER to try again', this.canvas.width / 2, this.canvas.height / 2 + 80);

        this.ctx.textAlign = 'left';
    }

    drawVictory(game) {
        // Overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Victory text
        this.ctx.font = 'bold 60px Arial';
        this.ctx.textAlign = 'center';

        const gradient = this.ctx.createLinearGradient(
            this.canvas.width / 2 - 200, 0,
            this.canvas.width / 2 + 200, 0
        );
        gradient.addColorStop(0, '#ffd700');
        gradient.addColorStop(0.5, '#ffed4e');
        gradient.addColorStop(1, '#ffd700');

        this.ctx.fillStyle = gradient;
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 5;
        this.ctx.strokeText('LEVEL COMPLETE!', this.canvas.width / 2, this.canvas.height / 2 - 50);
        this.ctx.fillText('LEVEL COMPLETE!', this.canvas.width / 2, this.canvas.height / 2 - 50);

        // Score
        this.ctx.font = 'bold 30px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeText(`Score: ${game.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
        this.ctx.fillText(`Score: ${game.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);

        // Instruction
        this.ctx.font = '20px Arial';
        this.ctx.fillText('Press ENTER for next level', this.canvas.width / 2, this.canvas.height / 2 + 80);

        this.ctx.textAlign = 'left';
    }

    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
    }
}
