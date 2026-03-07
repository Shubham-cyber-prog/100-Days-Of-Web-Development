class MapExporter {
    static exportToJSON(mapData, filename = 'map.json') {
        const data = JSON.stringify(mapData, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }

    static exportToPNG(canvas, filename = 'map.png') {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    }

    static async exportHighResPNG(renderFn, width, height, filename = 'map_highres.png') {
        const offscreen = document.createElement('canvas');
        offscreen.width = width;
        offscreen.height = height;
        const ctx = offscreen.getContext('2d');

        await renderFn(ctx, width, height);

        this.exportToPNG(offscreen, filename);
    }
}

window.MapExporter = MapExporter;
