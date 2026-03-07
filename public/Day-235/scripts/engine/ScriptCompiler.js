export default class ScriptCompiler {
    constructor(ui) {
        this.ui = ui;
        this.currentScript = [];
    }

    addStep(action) {
        if (this.currentScript.length >= 5) return; // Limit to 5 steps
        this.currentScript.push(action);
        this.ui.renderScript(this.currentScript);
    }

    getScript() {
        return this.currentScript;
    }

    reset() {
        this.currentScript = [];
        this.ui.renderScript(this.currentScript);
    }
}
