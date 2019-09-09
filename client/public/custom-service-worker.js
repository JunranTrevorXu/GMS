self.addEventListener("install", function(event) {
  // Perform install steps
  console.log("installing ", event);
});

self.addEventListener("activate", function(event) {
  console.log("activate");
});

self.addEventListener("push", function(event) {
  console.log(event);
  self.registration.showNotification("new message", { body: "body" });
  if (event.data) {
    console.log("This push event has data: ", event.data.text());
  } else {
    console.log("This push event has no data.");
  }
});

self.addEventListener("notificationclick", function(event) {
  console.log(event);
  event.notification.close();
  window.open("http://localhost:3000");
});

self.addEventListener("notificationclose", function(event) {
  console.log(event);
});
