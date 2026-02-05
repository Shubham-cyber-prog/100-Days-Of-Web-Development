/**
 * File Import/Export Utility
 */

export class FileHandler {
    static async readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    resolve(content);
                } catch (err) {
                    reject(err);
                }
            };

            reader.onerror = (e) => reject(new Error('File read error'));

            reader.readAsText(file);
        });
    }

    static downloadJSON(content, filename = 'data.json') {
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }
}
