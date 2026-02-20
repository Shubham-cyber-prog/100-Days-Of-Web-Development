export default class Notifications {
    static show(message) {
        const toast = document.getElementById('notif-toast');
        if (!toast) return;

        toast.textContent = message;
        toast.classList.remove('hidden');

        // Play feedback sound (optional placeholder)
        console.log(`[NETWORK_NOTIF]: ${message}`);

        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
}
