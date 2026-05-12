importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB7gYAmy_DNY8lJMjXMyekvbuAsqcIisr8",
  authDomain: "desmo-carta.firebaseapp.com",
  projectId: "desmo-carta",
  storageBucket: "desmo-carta.firebasestorage.app",
  messagingSenderId: "776883046319",
  appId: "1:776883046319:web:724b812cde1b3ec32ad15a",
  databaseURL: "https://desmo-carta-default-rtdb.firebaseio.com"
});

const messaging = firebase.messaging();

// Notificación cuando el panel está en segundo plano o cerrado
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title || '🛒 DESMO', {
    body: body || 'Nuevo pedido recibido',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    data: payload.data,
    actions: [
      { action: 'ver', title: '👀 Ver pedido' }
    ]
  });
});

// Al tocar la notificación abre el panel
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('panel') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/panel.html');
    })
  );
});
