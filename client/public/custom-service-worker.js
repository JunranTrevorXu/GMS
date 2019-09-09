self.addEventListener("install", function(event) {
  // Perform install steps
  console.log("installing ", event);
});

self.addEventListener("activate", function(event) {
  console.log("activate");
});

self.addEventListener("push", function(event) {
  console.log(event);
  setTimeout(() => {
    self.registration.showNotification("new message " + navigator.onLine, {
      body: "body"
    });
  }, 100);
  if (event.data) {
    console.log("This push event with data: ", event.data.text());
  } else {
    console.log("This push event has no data.");
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
