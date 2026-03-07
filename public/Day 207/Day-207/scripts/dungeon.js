/**
 * Procedural Dungeon Generator using Room-and-Corridor Algorithm
 */

export class DungeonGenerator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.rooms = [];
        this.tiles = [];
    }

    /**
     * Generate a new dungeon
     * @param {number} numRooms - Number of rooms to generate
     * @returns {object} - {tiles, rooms, startPos}
     */
    generate(numRooms = 8) {
        // Initialize with walls
        this.tiles = Array(this.height).fill(0).map(() =>
            Array(this.width).fill(1) // 1 = wall
        );
        this.rooms = [];

        // Generate rooms
        for (let i = 0; i < numRooms; i++) {
            const room = this.createRoom();

            if (!this.roomOverlaps(room)) {
                this.carveRoom(room);

                // Connect to previous room with corridor
                if (this.rooms.length > 0) {
                    this.createCorridor(
                        this.rooms[this.rooms.length - 1],
                        room
                    );
                }

                this.rooms.push(room);
            }
        }

        // Place stairs in last room
        const lastRoom = this.rooms[this.rooms.length - 1];
        const stairsPos = this.getRoomCenter(lastRoom);
        this.tiles[stairsPos.y][stairsPos.x] = 3; // 3 = stairs

        // Get starting position (center of first room)
        const startPos = this.getRoomCenter(this.rooms[0]);

        return {
            tiles: this.tiles,
            rooms: this.rooms,
            startPos
        };
    }

    /**
     * Create a random room
     * @returns {object} - {x, y, width, height}
     */
    createRoom() {
        const minSize = 4;
        const maxSize = 10;

        const width = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        const height = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;

        const x = Math.floor(Math.random() * (this.width - width - 2)) + 1;
        const y = Math.floor(Math.random() * (this.height - height - 2)) + 1;

        return { x, y, width, height };
    }

    /**
     * Check if room overlaps with existing rooms
     * @param {object} room
     * @returns {boolean}
     */
    roomOverlaps(room) {
        for (const other of this.rooms) {
            if (
                room.x < other.x + other.width + 1 &&
                room.x + room.width + 1 > other.x &&
                room.y < other.y + other.height + 1 &&
                room.y + room.height + 1 > other.y
            ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Carve out a room (set tiles to floor)
     * @param {object} room
     */
    carveRoom(room) {
        for (let y = room.y; y < room.y + room.height; y++) {
            for (let x = room.x; x < room.x + room.width; x++) {
                this.tiles[y][x] = 0; // 0 = floor
            }
        }
    }

    /**
     * Create corridor between two rooms
     * @param {object} room1
     * @param {object} room2
     */
    createCorridor(room1, room2) {
        const start = this.getRoomCenter(room1);
        const end = this.getRoomCenter(room2);

        // L-shaped corridor
        if (Math.random() < 0.5) {
            // Horizontal then vertical
            this.carveHorizontalCorridor(start.x, end.x, start.y);
            this.carveVerticalCorridor(start.y, end.y, end.x);
        } else {
            // Vertical then horizontal
            this.carveVerticalCorridor(start.y, end.y, start.x);
            this.carveHorizontalCorridor(start.x, end.x, end.y);
        }
    }

    /**
     * Carve horizontal corridor
     */
    carveHorizontalCorridor(x1, x2, y) {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);

        for (let x = minX; x <= maxX; x++) {
            if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
                this.tiles[y][x] = 0;
            }
        }
    }

    /**
     * Carve vertical corridor
     */
    carveVerticalCorridor(y1, y2, x) {
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        for (let y = minY; y <= maxY; y++) {
            if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
                this.tiles[y][x] = 0;
            }
        }
    }

    /**
     * Get center of a room
     * @param {object} room
     * @returns {object} - {x, y}
     */
    getRoomCenter(room) {
        return {
            x: Math.floor(room.x + room.width / 2),
            y: Math.floor(room.y + room.height / 2)
        };
    }

    /**
     * Get random floor position in a room
     * @param {object} room
     * @returns {object} - {x, y}
     */
    getRandomPosInRoom(room) {
        return {
            x: room.x + Math.floor(Math.random() * room.width),
            y: room.y + Math.floor(Math.random() * room.height)
        };
    }
}
