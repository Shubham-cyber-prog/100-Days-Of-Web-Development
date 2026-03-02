export default class ToolManager {
    constructor() {
        this.activeTool = 'place';
    }

    init() {
        const tools = document.querySelectorAll('.tool');
        tools.forEach(t => {
            t.addEventListener('click', () => {
                tools.forEach(tool => tool.classList.remove('active'));
                t.classList.add('active');
                this.activeTool = t.dataset.tool;
                console.log(`TOOL_CHANGE: ${this.activeTool}`);
            });
        });
    }
}
