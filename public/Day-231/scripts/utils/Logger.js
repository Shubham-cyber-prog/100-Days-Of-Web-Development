export default class Logger {
    static log(message, level = 'INFO') {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] [${level}] ZENITH_CORE: ${message}`);
    }

    static error(message) {
        this.log(message, 'ERROR');
    }
}
