/**
 * JSON Parsing and Statistics Logic
 */

export class JsonParser {
    parse(text) {
        try {
            if (!text.trim()) return { success: false, error: 'Empty input' };
            const data = JSON.parse(text);
            return {
                success: true,
                data: data,
                stats: this.getStats(data)
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    getStats(data) {
        let nodes = 0;
        let depth = 0;
        const size = JSON.stringify(data).length; // Approximate

        const traverse = (obj, currentDepth) => {
            nodes++;
            depth = Math.max(depth, currentDepth);

            if (typeof obj === 'object' && obj !== null) {
                Object.values(obj).forEach(val => traverse(val, currentDepth + 1));
            }
        };

        traverse(data, 1);

        return { nodes, depth, size };
    }

    format(text) {
        try {
            const obj = JSON.parse(text);
            return JSON.stringify(obj, null, 4); // 4 space indent
        } catch (e) {
            return text; // Return original if invalid
        }
    }

    minify(text) {
        try {
            const obj = JSON.parse(text);
            return JSON.stringify(obj);
        } catch (e) {
            return text;
        }
    }
}
