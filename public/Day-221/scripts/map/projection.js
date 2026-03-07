/**
 * Map Projection Utilities
 * 2D coordinate transformation and scaling
 */

export class MapProjection {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.minScale = 0.5;
        this.maxScale = 3;
    }

    /**
     * Convert screen coordinates to world coordinates
     */
    screenToWorld(screenX, screenY) {
        return {
            x: (screenX - this.offsetX) / this.scale,
            y: (screenY - this.offsetY) / this.scale
        };
    }

    /**
     * Convert world coordinates to screen coordinates
     */
    worldToScreen(worldX, worldY) {
        return {
            x: worldX * this.scale + this.offsetX,
            y: worldY * this.scale + this.offsetY
        };
    }

    /**
     * Zoom in/out
     */
    zoom(delta, centerX, centerY) {
        const oldScale = this.scale;
        this.scale *= (1 + delta * 0.1);
        this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.scale));

        // Adjust offset to zoom towards center point
        const scaleDiff = this.scale - oldScale;
        this.offsetX -= centerX * scaleDiff;
        this.offsetY -= centerY * scaleDiff;
    }

    /**
     * Pan the view
     */
    pan(dx, dy) {
        this.offsetX += dx;
        this.offsetY += dy;
    }

    /**
     * Reset view to default
     */
    reset() {
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    /**
     * Fit all nodes in view
     */
    fitNodes(nodes) {
        if (nodes.length === 0) return;

        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;

        nodes.forEach(node => {
            minX = Math.min(minX, node.x);
            minY = Math.min(minY, node.y);
            maxX = Math.max(maxX, node.x);
            maxY = Math.max(maxY, node.y);
        });

        const padding = 50;
        const rangeX = maxX - minX;
        const rangeY = maxY - minY;

        const scaleX = (this.width - 2 * padding) / rangeX;
        const scaleY = (this.height - 2 * padding) / rangeY;

        this.scale = Math.min(scaleX, scaleY, this.maxScale);
        this.offsetX = padding - minX * this.scale;
        this.offsetY = padding - minY * this.scale;
    }
}

/**
 * Geographic coordinate utilities
 */
export class GeoUtils {
    /**
     * Convert latitude/longitude to Mercator projection
     */
    static latLonToMercator(lat, lon, mapWidth, mapHeight) {
        const x = (lon + 180) * (mapWidth / 360);

        const latRad = lat * Math.PI / 180;
        const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
        const y = (mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI));

        return { x, y };
    }

    /**
     * Calculate great circle distance (Haversine formula)
     */
    static haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
