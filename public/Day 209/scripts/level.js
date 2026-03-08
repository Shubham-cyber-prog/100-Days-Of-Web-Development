/**
 * Level Data and Generation
 */

export const LEVELS = [
    {
        id: 1,
        name: 'Getting Started',
        width: 1600,
        height: 600,
        spawn: { x: 50, y: 400 },
        platforms: [
            { x: 0, y: 550, width: 400, height: 50, type: 'ground' },
            { x: 500, y: 450, width: 200, height: 30, type: 'platform' },
            { x: 800, y: 350, width: 200, height: 30, type: 'platform' },
            { x: 1100, y: 450, width: 200, height: 30, type: 'platform' },
            { x: 1400, y: 550, width: 200, height: 50, type: 'ground' }
        ],
        coins: [
            { x: 600, y: 400 },
            { x: 900, y: 300 },
            { x: 1200, y: 400 }
        ],
        spikes: [],
        movingPlatforms: [],
        checkpoints: [
            { x: 800, y: 300 }
        ],
        goal: { x: 1500, y: 500 }
    },
    {
        id: 2,
        name: 'Jump Challenge',
        width: 2000,
        height: 600,
        spawn: { x: 50, y: 400 },
        platforms: [
            { x: 0, y: 550, width: 300, height: 50, type: 'ground' },
            { x: 400, y: 480, width: 150, height: 20, type: 'platform' },
            { x: 650, y: 400, width: 150, height: 20, type: 'platform' },
            { x: 900, y: 320, width: 150, height: 20, type: 'platform' },
            { x: 1150, y: 400, width: 150, height: 20, type: 'platform' },
            { x: 1400, y: 480, width: 150, height: 20, type: 'platform' },
            { x: 1650, y: 550, width: 350, height: 50, type: 'ground' }
        ],
        coins: [
            { x: 475, y: 430 },
            { x: 725, y: 350 },
            { x: 975, y: 270 },
            { x: 1225, y: 350 },
            { x: 1475, y: 430 }
        ],
        spikes: [
            { x: 350, y: 530, width: 40, height: 20 },
            { x: 600, y: 530, width: 40, height: 20 }
        ],
        movingPlatforms: [],
        checkpoints: [
            { x: 900, y: 270 }
        ],
        goal: { x: 1900, y: 500 }
    },
    {
        id: 3,
        name: 'Moving Platforms',
        width: 2400,
        height: 600,
        spawn: { x: 50, y: 400 },
        platforms: [
            { x: 0, y: 550, width: 300, height: 50, type: 'ground' },
            { x: 500, y: 450, width: 150, height: 20, type: 'platform' },
            { x: 1000, y: 450, width: 150, height: 20, type: 'platform' },
            { x: 1500, y: 450, width: 150, height: 20, type: 'platform' },
            { x: 2000, y: 550, width: 400, height: 50, type: 'ground' }
        ],
        coins: [
            { x: 750, y: 350 },
            { x: 1250, y: 250 },
            { x: 1750, y: 350 }
        ],
        spikes: [
            { x: 350, y: 530, width: 40, height: 20 },
            { x: 450, y: 530, width: 40, height: 20 },
            { x: 1850, y: 530, width: 40, height: 20 },
            { x: 1950, y: 530, width: 40, height: 20 }
        ],
        movingPlatforms: [
            { x: 700, y: 400, width: 120, height: 20, startX: 700, endX: 900, speed: 2, axis: 'x' },
            { x: 1200, y: 300, width: 120, height: 20, startY: 200, endY: 400, speed: 1.5, axis: 'y' },
            { x: 1700, y: 400, width: 120, height: 20, startX: 1700, endX: 1900, speed: 2, axis: 'x' }
        ],
        checkpoints: [
            { x: 1200, y: 250 }
        ],
        goal: { x: 2300, y: 500 }
    }
];

export class LevelManager {
    constructor() {
        this.currentLevelIndex = 0;
        this.currentLevel = null;
    }

    /**
     * Load a level by index
     */
    loadLevel(index) {
        if (index < 0 || index >= LEVELS.length) {
            return null;
        }

        this.currentLevelIndex = index;
        this.currentLevel = JSON.parse(JSON.stringify(LEVELS[index])); // Deep copy

        // Initialize moving platforms
        if (this.currentLevel.movingPlatforms) {
            this.currentLevel.movingPlatforms.forEach(platform => {
                platform.velocityX = 0;
                platform.velocityY = 0;
                platform.direction = 1;
            });
        }

        return this.currentLevel;
    }

    /**
     * Get next level
     */
    nextLevel() {
        return this.loadLevel(this.currentLevelIndex + 1);
    }

    /**
     * Check if there are more levels
     */
    hasNextLevel() {
        return this.currentLevelIndex < LEVELS.length - 1;
    }

    /**
     * Reset to first level
     */
    reset() {
        return this.loadLevel(0);
    }

    /**
     * Update moving platforms
     */
    updateMovingPlatforms(deltaTime) {
        if (!this.currentLevel || !this.currentLevel.movingPlatforms) {
            return;
        }

        this.currentLevel.movingPlatforms.forEach(platform => {
            if (platform.axis === 'x') {
                platform.velocityX = platform.speed * platform.direction * deltaTime;
                platform.x += platform.velocityX;

                if (platform.x <= platform.startX || platform.x >= platform.endX) {
                    platform.direction *= -1;
                    platform.x = Math.max(platform.startX, Math.min(platform.endX, platform.x));
                }
            } else if (platform.axis === 'y') {
                platform.velocityY = platform.speed * platform.direction * deltaTime;
                platform.y += platform.velocityY;

                if (platform.y <= platform.startY || platform.y >= platform.endY) {
                    platform.direction *= -1;
                    platform.y = Math.max(platform.startY, Math.min(platform.endY, platform.y));
                }
            }
        });
    }
}
