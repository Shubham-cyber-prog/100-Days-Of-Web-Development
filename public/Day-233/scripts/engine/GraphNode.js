export default class GraphNode {
    constructor(id, type, x, y) {
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
        this.inputs = [];
        this.output = 0;
        this.radius = 40;
    }

    isPointInside(px, py) {
        return px >= this.x - this.radius &&
            px <= this.x + this.radius &&
            py >= this.y - 30 &&
            py <= this.y + 30;
    }
}
