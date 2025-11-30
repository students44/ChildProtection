import Groq from 'groq-sdk';

export class LevelGenerator {
    constructor() {
        // Initialize Groq SDK
        // Note: In production, this should be proxied via backend
        this.groq = new Groq({
            apiKey: import.meta.env.VITE_GROQ_API_KEY,
            dangerouslyAllowBrowser: true
        });

        this.themes = {
            'cyberpunk': {
                name: 'Neon City',
                description: 'High-tech logic puzzles in a glitchy metropolis.',
                colors: { background: '#020617', grid: '#1e293b', wall: '#0ea5e9', floor: '#0f172a', player: '#d946ef', goal: '#22c55e' }
            },
            'forest': {
                name: 'Ancient Woods',
                description: 'Organic paths through overgrown ruins.',
                colors: { background: '#052e16', grid: '#14532d', wall: '#15803d', floor: '#064e3b', player: '#fbbf24', goal: '#4ade80' }
            },
            'minimalist': {
                name: 'Zen Garden',
                description: 'Pure logic in a stark, white void.',
                colors: { background: '#f8fafc', grid: '#e2e8f0', wall: '#475569', floor: '#ffffff', player: '#3b82f6', goal: '#ef4444' }
            },
            'retro': {
                name: '8-Bit Dungeon',
                description: 'Old-school pixel puzzles.',
                colors: { background: '#000000', grid: '#333333', wall: '#ffffff', floor: '#111111', player: '#ff0000', goal: '#ffff00' }
            }
        };
    }

    async generateLevel(theme, difficulty, isFuzzle) {
        const prompt = this.createPrompt(theme, difficulty, isFuzzle);

        try {
            const completion = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: `You are a world-class puzzle designer. Create a grid-based puzzle level in JSON format.
                        The grid should be 10x10.
                        Cell types: "floor", "wall", "start", "goal", "pit".
                        Ensure there is a valid path from start to goal.
                        Output ONLY valid JSON. No markdown.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.7,
                max_tokens: 2000
            });

            const jsonStr = completion.choices[0]?.message?.content || '';
            const cleanJson = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
            const levelData = JSON.parse(cleanJson);

            return this.validateAndFix(levelData);

        } catch (error) {
            console.error('AI Generation failed:', error);
            return this.generateFallbackLevel(difficulty);
        }
    }

    createPrompt(theme, difficulty, isFuzzle) {
        let fuzzleInstruction = "";
        if (isFuzzle) {
            fuzzleInstruction = `
            FUZZLE MODE ACTIVE:
            Include a "fuzzleRule" field describing a dynamic rule change.
            Examples: "Every 5 steps, walls shift", "Gravity reverses every 3 moves".
            The layout should support this rule.
            `;
        }

        return `
        Theme: ${theme}
        Difficulty: ${difficulty} (1-10)
        ${fuzzleInstruction}
        
        Generate a JSON object with:
        - width: 10
        - height: 10
        - grid: 2D array of strings
        - hint: A subtle clue for the player
        - winCondition: "Reach the goal"
        - flavorText: A short atmospheric description matching the theme
        `;
    }

    validateAndFix(levelData) {
        // Basic validation
        if (!levelData.grid || !Array.isArray(levelData.grid)) {
            throw new Error('Invalid grid data');
        }

        // Ensure start and goal exist
        let hasStart = false;
        let hasGoal = false;

        for (let row of levelData.grid) {
            for (let cell of row) {
                if (cell === 'start') hasStart = true;
                if (cell === 'goal') hasGoal = true;
            }
        }

        if (!hasStart) levelData.grid[0][0] = 'start';
        if (!hasGoal) levelData.grid[levelData.height - 1][levelData.width - 1] = 'goal';

        return levelData;
    }

    generateFallbackLevel(difficulty) {
        // Simple procedural generation for fallback
        const width = 10;
        const height = 10;
        const grid = Array(height).fill().map(() => Array(width).fill('floor'));

        // Add walls randomly based on difficulty
        const wallChance = 0.1 + (difficulty * 0.02);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (Math.random() < wallChance) {
                    grid[y][x] = 'wall';
                }
            }
        }

        grid[1][1] = 'start';
        grid[8][8] = 'goal';

        return {
            width,
            height,
            grid,
            hint: "Pathfinding is key.",
            winCondition: "Reach the goal",
            flavorText: "The AI is offline, but the path remains."
        };
    }
}
