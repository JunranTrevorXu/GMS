self.addEventListener("install", function(event) {
  // Perform install steps
  console.log("installing ", event);
});

self.addEventListener("activate", function(event) {
  console.log("activate");
});

self.addEventListener("push", async function(event) {
  const eventData = event.data.json();

  if (eventData.notification) {
    setTimeout(() => {
      self.registration.showNotification(
        eventData.message + ": " + eventData.nickname
      );
    }, 100);
  } else {
    self.clients.matchAll().then(async clients => {
      const clientId = clients[0].id;
      const client = await self.clients.get(clientId);
      if (client)
        client.postMessage({
          msg: eventData.message
        });
    });
  }
});

self.addEventListener("notificationclick", function(event) {
  console.log(event);
  event.notification.close();
  clients.openWindow("http://localhost:3000");
});

self.addEventListener("notificationclose", function(event) {
  console.log(event);
});
