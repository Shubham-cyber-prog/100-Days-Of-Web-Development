/**
 * Blueprint Canvas Component - High-Performance Rendering Engine
 * HTML5 Canvas-based vector graphics renderer with pan/zoom support
 * @version 1.0.0
 */

export class BlueprintCanvas {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.shapes = [];
        this.selectedShapeId = null;
        this.tool = 'select'; // select, rectangle, circle, line, text, arrow
        this.listeners = [];
        
        // Transform state
        this.offset = { x: 0, y: 0 };
        this.scale = 1;
        this.isPanning = false;
        this.panStart = { x: 0, y: 0 };
        
        // Drawing state
        this.isDrawing = false;
        this.drawStart = { x: 0, y: 0 };
        this.tempShape = null;
        
        // Colors and styles
        this.primaryColor = options.primaryColor || '#58a6ff';
        this.secondaryColor = options.secondaryColor || '#ffffff';
        this.gridSize = 20;
        this.showGrid = options.showGrid !== false;
        
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.setupEventListeners();
        this.render();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.render();
    }

    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('wheel', this.handleWheel.bind(this));
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.handleMouseDown({ clientX: touch.clientX, clientY: touch.clientY });
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.handleMouseUp({});
        });
    }

    getCanvasPoint(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (clientX - rect.left - this.offset.x) / this.scale,
            y: (clientY - rect.top - this.offset.y) / this.scale
        };
    }

    handleMouseDown(e) {
        const point = this.getCanvasPoint(e.clientX, e.clientY);
        
        if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
            // Middle mouse or Ctrl+Left = Pan
            this.isPanning = true;
            this.panStart = { x: e.clientX - this.offset.x, y: e.clientY - this.offset.y };
            this.canvas.style.cursor = 'grabbing';
            return;
        }
        
        if (this.tool === 'select') {
            const clickedShape = this.getShapeAtPoint(point.x, point.y);
            this.selectedShapeId = clickedShape ? clickedShape.id : null;
            this.emit('shapeSelected', this.selectedShapeId);
        } else {
            // Start drawing
            this.isDrawing = true;
            this.drawStart = point;
            this.tempShape = this.createShape(this.tool, point.x, point.y, 0, 0);
        }
        
        this.render();
    }

    handleMouseMove(e) {
        const point = this.getCanvasPoint(e.clientX, e.clientY);
        
        if (this.isPanning) {
            this.offset.x = e.clientX - this.panStart.x;
            this.offset.y = e.clientY - this.panStart.y;
            this.render();
            return;
        }
        
        if (this.isDrawing && this.tempShape) {
            const width = point.x - this.drawStart.x;
            const height = point.y - this.drawStart.y;
            
            this.tempShape = this.createShape(
                this.tool,
                this.drawStart.x,
                this.drawStart.y,
                width,
                height
            );
            
            this.render();
        }
        
        // Update cursor
        this.emit('cursorMoved', point);
    }

    handleMouseUp(e) {
        if (this.isPanning) {
            this.isPanning = false;
            this.canvas.style.cursor = 'default';
            return;
        }
        
        if (this.isDrawing && this.tempShape) {
            // Finalize shape
            if (Math.abs(this.tempShape.width) > 5 || Math.abs(this.tempShape.height) > 5) {
                this.emit('shapeCreated', this.tempShape);
            }
            this.tempShape = null;
            this.isDrawing = false;
            this.render();
        }
    }

    handleWheel(e) {
        e.preventDefault();
        
        const point = this.getCanvasPoint(e.clientX, e.clientY);
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(0.1, Math.min(5, this.scale * delta));
        
        // Zoom towards cursor
        this.offset.x -= point.x * (newScale - this.scale);
        this.offset.y -= point.y * (newScale - this.scale);
        this.scale = newScale;
        
        this.render();
    }

    createShape(type, x, y, width, height) {
        const baseShape = {
            type,
            x, y, width, height,
            strokeColor: this.primaryColor,
            fillColor: 'transparent',
            strokeWidth: 2
        };
        
        switch (type) {
            case 'rectangle':
                return { ...baseShape };
            case 'circle':
                return { ...baseShape, radius: Math.max(Math.abs(width), Math.abs(height)) / 2 };
            case 'line':
                return { ...baseShape, x2: x + width, y2: y + height };
            case 'arrow':
                return { ...baseShape, x2: x + width, y2: y + height, arrowSize: 10 };
            case 'text':
                return { ...baseShape, text: 'Text', fontSize: 16, fontFamily: 'Arial' };
            default:
                return baseShape;
        }
    }

    getShapeAtPoint(x, y) {
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            const shape = this.shapes[i];
            if (this.isPointInShape(x, y, shape)) {
                return shape;
            }
        }
        return null;
    }

    isPointInShape(x, y, shape) {
        switch (shape.type) {
            case 'rectangle':
                return x >= shape.x && x <= shape.x + shape.width &&
                       y >= shape.y && y <= shape.y + shape.height;
            case 'circle':
                const dx = x - (shape.x + shape.radius);
                const dy = y - (shape.y + shape.radius);
                return Math.sqrt(dx * dx + dy * dy) <= shape.radius;
            default:
                return false;
        }
    }

    setShapes(shapes) {
        this.shapes = shapes;
        this.render();
    }

    setTool(tool) {
        this.tool = tool;
        this.selectedShapeId = null;
        this.canvas.style.cursor = tool === 'select' ? 'default' : 'crosshair';
    }

    render() {
        const ctx = this.ctx;
        
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Save context
        ctx.save();
        
        // Apply transform
        ctx.translate(this.offset.x, this.offset.y);
        ctx.scale(this.scale, this.scale);
        
        // Draw grid
        if (this.showGrid) {
            this.drawGrid(ctx);
        }
        
        // Draw shapes
        this.shapes.forEach(shape => {
            this.drawShape(ctx, shape, shape.id === this.selectedShapeId);
        });
        
        // Draw temp shape
        if (this.tempShape) {
            this.drawShape(ctx, this.tempShape, false);
        }
        
        // Restore context
        ctx.restore();
    }

    drawGrid(ctx) {
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 0.5;
        
        const startX = Math.floor(-this.offset.x / this.scale / this.gridSize) * this.gridSize;
        const startY = Math.floor(-this.offset.y / this.scale / this.gridSize) * this.gridSize;
        const endX = startX + this.canvas.width / this.scale + this.gridSize;
        const endY = startY + this.canvas.height / this.scale + this.gridSize;
        
        for (let x = startX; x < endX; x += this.gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
            ctx.stroke();
        }
        
        for (let y = startY; y < endY; y += this.gridSize) {
            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.stroke();
        }
    }

    drawShape(ctx, shape, isSelected) {
        ctx.strokeStyle = shape.strokeColor || this.primaryColor;
        ctx.fillStyle = shape.fillColor || 'transparent';
        ctx.lineWidth = shape.strokeWidth || 2;
        
        if (isSelected) {
            ctx.strokeStyle = '#ffa500';
            ctx.lineWidth = 3;
        }
        
        ctx.beginPath();
        
        switch (shape.type) {
            case 'rectangle':
                ctx.rect(shape.x, shape.y, shape.width, shape.height);
                break;
            case 'circle':
                ctx.arc(
                    shape.x + shape.radius,
                    shape.y + shape.radius,
                    shape.radius,
                    0,
                    Math.PI * 2
                );
                break;
            case 'line':
                ctx.moveTo(shape.x, shape.y);
                ctx.lineTo(shape.x2, shape.y2);
                break;
            case 'arrow':
                this.drawArrow(ctx, shape.x, shape.y, shape.x2, shape.y2, shape.arrowSize || 10);
                break;
            case 'text':
                ctx.font = `${shape.fontSize}px ${shape.fontFamily}`;
                ctx.fillStyle = shape.strokeColor;
                ctx.fillText(shape.text, shape.x, shape.y);
                return;
        }
        
        if (shape.fillColor && shape.fillColor !== 'transparent') {
            ctx.fill();
        }
        ctx.stroke();
    }

    drawArrow(ctx, x1, y1, x2, y2, arrowSize) {
        const angle = Math.atan2(y2 - y1, x2 - x1);
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        
        ctx.lineTo(
            x2 - arrowSize * Math.cos(angle - Math.PI / 6),
            y2 - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(x2, y2);
        ctx.lineTo(
            x2 - arrowSize * Math.cos(angle + Math.PI / 6),
            y2 - arrowSize * Math.sin(angle + Math.PI / 6)
        );
    }

    emit(eventName, data) {
        this.listeners
            .filter(l => l.eventName === eventName)
            .forEach(l => l.callback(data));
    }

    on(eventName, callback) {
        this.listeners.push({ eventName, callback });
        return () => {
            this.listeners = this.listeners.filter(
                l => l.eventName !== eventName || l.callback !== callback
            );
        };
    }

    destroy() {
        this.listeners = [];
    }
}
