const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

// Helper function to convert VAPID public key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export async function subscribeUserToPush() {
    if (!VAPID_PUBLIC_KEY) {
        console.error("VAPID public key is not defined. Please check your .env file and ensure it's prefixed with VITE_ (e.g., VITE_VAPID_PUBLIC_KEY)");
        return;
    }

    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn('Push messaging is not supported by this browser.');
        return;
    }

    try {
        const registration = await navigator.serviceWorker.ready; // Wait for SW to be active
        let subscription = await registration.pushManager.getSubscription();

        if (subscription === null) {
            const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });

            console.log('User subscribed:', subscription);

            await fetch(`${API_URL}/notifications/subscribe`, {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Subscription sent to server.');

        } else {
            console.log('User is already subscribed:', subscription);
        }
    } catch (error) {
        console.error('Error during push subscription:', error);
        if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied.');
        }
        throw error;
    }
}