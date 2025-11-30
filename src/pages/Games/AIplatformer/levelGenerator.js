import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

export class LevelGenerator {
    constructor() {
        this.themes = {
            forest: {
                name: '🌲 Forest Adventure',
                colors: {
                    bg: ['#1a4d2e', '#2d5a3d', '#4a7c59'],
                    platform: '#8b4513',
                    accent: '#90ee90',
                    particle: '#7cfc00'
                },
                description: 'Lush green platforms among ancient trees'
            },
            mountain: {
                name: '🏔️ Mountain Peak',
                colors: {
                    bg: ['#4a5568', '#718096', '#a0aec0'],
                    platform: '#8b8989',
                    accent: '#e0f2fe',
                    particle: '#bfdbfe'
                },
                description: 'Rocky platforms reaching for the sky'
            },
            ocean: {
                name: '🌊 Ocean Depths',
                colors: {
                    bg: ['#0c4a6e', '#075985', '#0369a1'],
                    platform: '#1e40af',
                    accent: '#7dd3fc',
                    particle: '#67e8f9'
                },
                description: 'Floating platforms above crystal waters'
            },
            volcanic: {
                name: '🔥 Volcanic Chaos',
                colors: {
                    bg: ['#7c2d12', '#991b1b', '#b91c1c'],
                    platform: '#44403c',
                    accent: '#fb923c',
                    particle: '#fbbf24'
                },
                description: 'Dangerous platforms over molten lava'
            },
            space: {
                name: '🌌 Space Odyssey',
                colors: {
                    bg: ['#0f172a', '#1e1b4b', '#312e81'],
                    platform: '#4c1d95',
                    accent: '#c084fc',
                    particle: '#e9d5ff'
                },
                description: 'Zero-gravity platforms among the stars'
            },
            medieval: {
                name: '🏰 Medieval Castle',
                colors: {
                    bg: ['#44403c', '#57534e', '#78716c'],
                    platform: '#6b7280',
                    accent: '#fbbf24',
                    particle: '#fde047'
                },
                description: 'Stone platforms in ancient fortresses'
            },
            cyberpunk: {
                name: '🌆 Cyberpunk City',
                colors: {
                    bg: ['#1a1a2e', '#16213e', '#0f3460'],
                    platform: '#e94560',
                    accent: '#00d9ff',
                    particle: '#ff00ff'
                },
                description: 'Neon-lit platforms in a digital world'
            },
            mushroom: {
                name: '🍄 Mushroom Kingdom',
                colors: {
                    bg: ['#fef3c7', '#fde68a', '#fcd34d'],
                    platform: '#dc2626',
                    accent: '#f87171',
                    particle: '#fca5a5'
                },
                description: 'Bouncy organic platforms in a magical realm'
            }
        };
    }

    async generateLevel(theme, levelNumber) {
        const difficulty = this.calculateDifficulty(levelNumber);

        const prompt = `You are a platformer game level designer. Generate a challenging but fair level layout.

Theme: ${this.themes[theme].name}
Level Number: ${levelNumber}
Difficulty: ${difficulty.description}

Requirements:
- Create ${difficulty.platformCount} platforms
- Platform width range: ${difficulty.minPlatformWidth}-${difficulty.maxPlatformWidth} units
- Vertical spacing: ${difficulty.minGap}-${difficulty.maxGap} units
- Horizontal spacing: ${difficulty.minHorizontalGap}-${difficulty.maxHorizontalGap} units
- Include ${difficulty.enemyCount} enemies
- Include ${difficulty.collectibleCount} collectibles
- Add ${difficulty.hazardCount} hazards
- ${difficulty.movingPlatforms} platforms should move
- Level length: approximately ${difficulty.levelLength} units

Generate a JSON object with this EXACT structure (no markdown, no explanation, ONLY valid JSON):
{
  "platforms": [
    {"x": number, "y": number, "width": number, "height": 20, "moving": boolean, "moveRange": number}
  ],
  "enemies": [
    {"x": number, "y": number, "type": "walker|jumper|flyer", "range": number}
  ],
  "collectibles": [
    {"x": number, "y": number, "type": "coin|powerup"}
  ],
  "hazards": [
    {"x": number, "y": number, "width": number, "type": "spike|pit|fire"}
  ],
  "goal": {"x": number, "y": number}
}

Important rules:
1. First platform MUST be at x:100, y:400 (starting position)
2. Each platform must be reachable from previous platforms (max jump: 150 horizontal, 120 vertical)
3. No platforms should overlap
4. Goal should be at the end of the level
5. Y coordinates: 200-500 (lower Y = higher position)
6. Make the layout interesting with varied heights and gaps
7. Theme: ${this.themes[theme].description}`;

        try {
            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are a game level designer that outputs ONLY valid JSON. Never include markdown formatting or explanations.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                model: 'llama-3.3-70b-versatile',
                temperature: 0.8,
                max_tokens: 2000
            });

            let levelData = response.choices[0].message.content.trim();

            // Remove markdown code blocks if present
            levelData = levelData.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            const parsedLevel = JSON.parse(levelData);

            // Validate and fix the level
            return this.validateAndFixLevel(parsedLevel, theme, difficulty);

        } catch (error) {
            console.error('Error generating level:', error);
            // Fallback to procedural generation
            return this.generateFallbackLevel(theme, levelNumber, difficulty);
        }
    }

    calculateDifficulty(levelNumber) {
        const base = {
            1: {
                description: 'Easy - Wide platforms, simple jumps',
                platformCount: 12,
                minPlatformWidth: 150,
                maxPlatformWidth: 250,
                minGap: 80,
                maxGap: 120,
                minHorizontalGap: 100,
                maxHorizontalGap: 200,
                enemyCount: 0,
                collectibleCount: 5,
                hazardCount: 0,
                movingPlatforms: 0,
                levelLength: 2000
            },
            2: {
                description: 'Medium - Narrower platforms, some enemies',
                platformCount: 15,
                minPlatformWidth: 120,
                maxPlatformWidth: 200,
                minGap: 90,
                maxGap: 140,
                minHorizontalGap: 120,
                maxHorizontalGap: 250,
                enemyCount: 2,
                collectibleCount: 8,
                hazardCount: 1,
                movingPlatforms: 2,
                levelLength: 2500
            },
            3: {
                description: 'Hard - Precise jumps, more enemies',
                platformCount: 18,
                minPlatformWidth: 100,
                maxPlatformWidth: 180,
                minGap: 100,
                maxGap: 160,
                minHorizontalGap: 140,
                maxHorizontalGap: 280,
                enemyCount: 4,
                collectibleCount: 10,
                hazardCount: 3,
                movingPlatforms: 3,
                levelLength: 3000
            }
        };

        // Scale difficulty for levels beyond 3
        if (levelNumber <= 3) {
            return base[levelNumber];
        } else {
            const scaleFactor = 1 + (levelNumber - 3) * 0.15;
            return {
                description: `Very Hard - Level ${levelNumber}`,
                platformCount: Math.floor(18 * scaleFactor),
                minPlatformWidth: Math.max(80, 100 - (levelNumber - 3) * 5),
                maxPlatformWidth: Math.max(120, 180 - (levelNumber - 3) * 10),
                minGap: 100 + (levelNumber - 3) * 10,
                maxGap: 160 + (levelNumber - 3) * 15,
                minHorizontalGap: 140 + (levelNumber - 3) * 10,
                maxHorizontalGap: 280 + (levelNumber - 3) * 20,
                enemyCount: 4 + (levelNumber - 3),
                collectibleCount: 10 + (levelNumber - 3) * 2,
                hazardCount: 3 + (levelNumber - 3),
                movingPlatforms: Math.min(3 + (levelNumber - 3), 8),
                levelLength: 3000 + (levelNumber - 3) * 500
            };
        }
    }

    validateAndFixLevel(level, theme, difficulty) {
        // Ensure first platform is at starting position
        if (!level.platforms || level.platforms.length === 0) {
            level.platforms = [];
        }

        level.platforms[0] = {
            x: 100,
            y: 400,
            width: 200,
            height: 20,
            moving: false,
            moveRange: 0
        };

        // Ensure all platforms have required properties
        level.platforms = level.platforms.map(p => ({
            x: p.x || 0,
            y: Math.max(200, Math.min(500, p.y || 400)),
            width: p.width || 150,
            height: 20,
            moving: p.moving || false,
            moveRange: p.moveRange || 0
        }));

        // Ensure enemies have required properties
        level.enemies = (level.enemies || []).map(e => ({
            x: e.x || 0,
            y: e.y || 400,
            type: e.type || 'walker',
            range: e.range || 100
        }));

        // Ensure collectibles exist
        level.collectibles = (level.collectibles || []).map(c => ({
            x: c.x || 0,
            y: c.y || 400,
            type: c.type || 'coin'
        }));

        // Ensure hazards exist
        level.hazards = (level.hazards || []).map(h => ({
            x: h.x || 0,
            y: h.y || 500,
            width: h.width || 50,
            type: h.type || 'spike'
        }));

        // Ensure goal exists
        if (!level.goal) {
            const lastPlatform = level.platforms[level.platforms.length - 1];
            level.goal = {
                x: (lastPlatform?.x || 2000) + 100,
                y: (lastPlatform?.y || 400) - 50
            };
        }

        level.theme = theme;
        level.levelNumber = difficulty.levelLength;

        return level;
    }

    generateFallbackLevel(theme, levelNumber, difficulty) {
        const platforms = [];
        const enemies = [];
        const collectibles = [];
        const hazards = [];

        let currentX = 100;
        let currentY = 400;

        // Generate platforms procedurally
        for (let i = 0; i < difficulty.platformCount; i++) {
            const width = difficulty.minPlatformWidth +
                Math.random() * (difficulty.maxPlatformWidth - difficulty.minPlatformWidth);

            platforms.push({
                x: currentX,
                y: currentY,
                width: width,
                height: 20,
                moving: i > 0 && i <= difficulty.movingPlatforms,
                moveRange: 50
            });

            // Add collectible on some platforms
            if (Math.random() < 0.4 && i > 0) {
                collectibles.push({
                    x: currentX + width / 2,
                    y: currentY - 40,
                    type: Math.random() < 0.8 ? 'coin' : 'powerup'
                });
            }

            // Add enemy on some platforms
            if (i > 2 && Math.random() < 0.3 && enemies.length < difficulty.enemyCount) {
                enemies.push({
                    x: currentX + width / 2,
                    y: currentY - 30,
                    type: ['walker', 'jumper'][Math.floor(Math.random() * 2)],
                    range: 100
                });
            }

            // Calculate next platform position
            currentX += width + difficulty.minHorizontalGap +
                Math.random() * (difficulty.maxHorizontalGap - difficulty.minHorizontalGap);
            currentY = 250 + Math.random() * 200; // Random height
        }

        return {
            platforms,
            enemies,
            collectibles,
            hazards,
            goal: {
                x: currentX + 100,
                y: currentY - 50
            },
            theme,
            levelNumber
        };
    }

    getTheme(themeName) {
        return this.themes[themeName] || this.themes.forest;
    }

    getAllThemes() {
        return Object.keys(this.themes).map(key => ({
            id: key,
            ...this.themes[key]
        }));
    }
}
