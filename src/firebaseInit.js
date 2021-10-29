import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
  apiKey: "AIzaSyDntFmJ2zyxaFkzmH-TnR4nTUSNNNpYB1Y",
  authDomain: "leadx-9cf70.firebaseapp.com",
  projectId: "leadx-9cf70",
  storageBucket: "leadx-9cf70.appspot.com",
  messagingSenderId: "144710243215",
  appId: "1:144710243215:web:5d8d0315941dea51a8b1fa",
  measurementId: "G-Y8B3NT5Q7W",
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        console.log("toktok",firebaseToken)
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
