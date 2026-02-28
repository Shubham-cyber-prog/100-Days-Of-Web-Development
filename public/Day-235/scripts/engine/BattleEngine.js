export default class BattleEngine {
    constructor(ui, sfx, compiler) {
        this.ui = ui;
        this.sfx = sfx;
        this.compiler = compiler;

        this.player = { hp: 5, maxHp: 5, name: "PLAYER" };
        this.enemy = { hp: 5, maxHp: 5, name: "ENEMY_X" };

        this.ui.initHP(this.player, 'player');
        this.ui.initHP(this.enemy, 'enemy');
    }

    async executePlayerTurn() {
        const script = this.compiler.getScript();
        if (script.length === 0) return this.ui.log("ERROR: NULL_SCRIPT_EXCEPTION");

        this.ui.log(">>> EXECUTING_USER_SCRIPT...");

        for (const action of script) {
            await this.performAction(action, this.player, this.enemy);
            if (this.enemy.hp <= 0) return this.victory();
            await new Promise(r => setTimeout(r, 800));
        }

        this.compiler.reset();
        setTimeout(() => this.executeEnemyTurn(), 1000);
    }

    async executeEnemyTurn() {
        this.ui.log("<<< ENEMY_INTERRUPT: CALCULATING...");
        await new Promise(r => setTimeout(r, 1000));

        const action = Math.random() > 0.3 ? 'ATTACK' : 'DEFEND';
        await this.performAction(action, this.enemy, this.player);

        if (this.player.hp <= 0) return this.defeat();
    }

    async performAction(action, source, target) {
        this.sfx.playAction(action);

        if (action === 'ATTACK') {
            target.hp--;
            this.ui.log(`${source.name} :: EXECUTE_ATTACK -> ${target.name}`);
            this.ui.updateHP(target, target === this.player ? 'player' : 'enemy');
        } else if (action === 'HEAL') {
            source.hp = Math.min(source.maxHp, source.hp + 1);
            this.ui.log(`${source.name} :: RESTORE_PROTOCOL_INIT`);
            this.ui.updateHP(source, source === this.player ? 'player' : 'enemy');
        } else {
            this.ui.log(`${source.name} :: ${action}_ROUTINE_ACTIVE`);
        }
    }

    victory() {
        this.ui.log("CRITICAL_SUCCESS: ENEMY_NEUTRALIZED");
        document.getElementById('victory-screen').classList.remove('hidden');
    }

    defeat() {
        this.ui.log("FATAL_ERROR: USER_DE-LINKED");
        alert("GEAR_OVER // SYSTEM_FAILURE");
        location.reload();
    }
}
