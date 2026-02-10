/**
 * Items and Loot System
 */

export class Item {
    constructor(x, y, type, value) {
        this.x = x;
        this.y = y;
        this.type = type; // 'potion', 'gold', etc.
        this.value = value;
        this.icon = this.getIcon(type);
        this.name = this.getName(type, value);
    }

    getIcon(type) {
        const icons = {
            potion: '🧪',
            gold: '💰',
            key: '🔑',
            sword: '⚔️',
            shield: '🛡️'
        };
        return icons[type] || '📦';
    }

    getName(type, value) {
        if (type === 'potion') {
            return `Health Potion (+${value} HP)`;
        } else if (type === 'gold') {
            return `${value} Gold`;
        }
        return 'Unknown Item';
    }

    draw(ctx, cameraX, cameraY, tileSize, explored) {
        // Only draw if explored
        if (!explored[this.y] || !explored[this.y][this.x]) {
            return;
        }

        const screenX = (this.x - cameraX) * tileSize;
        const screenY = (this.y - cameraY) * tileSize;

        // Draw item background
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.fillRect(screenX, screenY, tileSize, tileSize);

        // Draw icon (text emoji)
        ctx.font = `${tileSize - 8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.icon, screenX + tileSize / 2, screenY + tileSize / 2);
    }
}

/**
 * Item Manager
 */
export class ItemManager {
    /**
     * Spawn items in dungeon rooms
     */
    static spawnItems(rooms, floor) {
        const items = [];

        // Skip first and last room
        for (let i = 1; i < rooms.length - 1; i++) {
            if (Math.random() < 0.6) { // 60% chance per room
                const room = rooms[i];
                const x = room.x + Math.floor(Math.random() * room.width);
                const y = room.y + Math.floor(Math.random() * room.height);

                const itemType = Math.random() < 0.7 ? 'potion' : 'gold';
                const value = itemType === 'potion'
                    ? 20 + Math.floor(Math.random() * 30)
                    : 10 + Math.floor(Math.random() * 50);

                items.push(new Item(x, y, itemType, value));
            }
        }

        return items;
    }

    /**
     * Check if player is on an item
     */
    static checkPickup(player, items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.x === player.x && item.y === player.y) {
                items.splice(i, 1);
                return item;
            }
        }
        return null;
    }
}
