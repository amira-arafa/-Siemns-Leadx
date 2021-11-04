
self.addEventListener("notificationclick", function(event) {
});

importScripts("https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyDntFmJ2zyxaFkzmH-TnR4nTUSNNNpYB1Y",
  authDomain: "leadx-9cf70.firebaseapp.com",
  projectId: "leadx-9cf70",
  storageBucket: "leadx-9cf70.appspot.com",
  messagingSenderId: "144710243215",
  appId: "1:144710243215:web:5d8d0315941dea51a8b1fa",
  measurementId: "G-Y8B3NT5Q7W",
});
const messaging = firebase.messaging();

class CustomPushEvent extends Event {
  constructor(data) {
    super("push");

    Object.assign(this, data);
    this.custom = true;
  }
}

self.addEventListener("push", e => {
  if (e.custom) return;
  let oldData = e.data;
  let newEvent = new CustomPushEvent({
    data: {
      json() {
        let newData = oldData.json();
        newData._notification = newData.notification;
        delete newData.notification;
        return newData;
      }
    },
    waitUntil: e.waitUntil.bind(e)
  });
  e.stopImmediatePropagation();
  dispatchEvent(newEvent);
});

messaging.onBackgroundMessage(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});
