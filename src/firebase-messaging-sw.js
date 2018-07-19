importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyDfHYz3IsP_vaUIHPtsJIoAQP2tuXt4Y3o",
  authDomain: "callcenter2-79faf.firebaseapp.com",
  databaseURL: "https://callcenter2-79faf.firebaseio.com",
  projectId: "callcenter2-79faf",
  storageBucket: "callcenter2-79faf.appspot.com",
  messagingSenderId: "437377487737"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();