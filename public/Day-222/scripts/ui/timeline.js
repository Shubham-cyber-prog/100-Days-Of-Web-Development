/**
 * Timeline Controller
 * Variable time-step controls and time dilation management
 */

export class Timeline {
    constructor(simulation) {
        this.sim = simulation;
        this.playbackSpeed = 1.0;
        this.isPaused = true;
        this.currentTime = 0;
        this.recordedStates = [];
        this.maxRecordLength = 1000;
    }

    /**
     * Set playback speed (time dilation)
     */
    setSpeed(speed) {
        this.playbackSpeed = Math.max(0.1, Math.min(10, speed));
        this.sim.timeScale = this.playbackSpeed;
    }

    /**
     * Play simulation
     */
    play() {
        this.isPaused = false;
        this.sim.paused = false;
    }

    /**
     * Pause simulation
     */
    pause() {
        this.isPaused = true;
        this.sim.paused = true;
    }

    /**
     * Toggle play/pause
     */
    toggle() {
        if (this.isPaused) {
            this.play();
        } else {
            this.pause();
        }
    }

    /**
     * Step forward by one frame
     */
    stepForward() {
        this.pause();
        this.sim.update();
        this.sim.render();
    }

    /**
     * Record current state for playback
     */
    recordState() {
        const state = {
            time: this.currentTime,
            bodies: this.sim.bodies.map(body => ({
                position: { ...body.position },
                velocity: { ...body.velocity },
                mass: body.mass,
                radius: body.radius,
                color: body.color
            }))
        };

        this.recordedStates.push(state);

        if (this.recordedStates.length > this.maxRecordLength) {
            this.recordedStates.shift();
        }
    }

    /**
     * Seek to specific time in recording
     */
    seekTo(index) {
        if (index < 0 || index >= this.recordedStates.length) return;

        const state = this.recordedStates[index];
        this.currentTime = state.time;

        // Restore simulation state
        this.sim.bodies = state.bodies.map(bodyData => {
            const body = new (this.sim.bodies[0].constructor)(
                bodyData.position.x,
                bodyData.position.y,
                bodyData.velocity.x,
                bodyData.velocity.y,
                bodyData.mass,
                bodyData.radius,
                bodyData.color
            );
            return body;
        });
    }

    /**
     * Get current simulation time in human-readable format
     */
    getFormattedTime() {
        const seconds = Math.floor(this.currentTime);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
}
