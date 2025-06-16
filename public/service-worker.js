self.addEventListener('push', event => {
    const data = event.data.json();
    const title = data.title || 'Birthday Reminder!';
    const options = {
        body: data.body || 'Someone has a birthday today!',
        icon: '/logo192.png',
        badge: '/logo192.png',
        data: {
            url: data.url || '/',
        }
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    const urlToOpen = event.notification.data.url || '/';
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});