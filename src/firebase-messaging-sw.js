
importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js")


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDfHYz3IsP_vaUIHPtsJIoAQP2tuXt4Y3o",
    authDomain: "callcenter2-79faf.firebaseapp.com",
    databaseURL: "https://callcenter2-79faf.firebaseio.com",
    projectId: "callcenter2-79faf",
    storageBucket: "callcenter2-79faf.appspot.com",
    messagingSenderId: "437377487737"
};
var myapp = firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.onMessage(function (payload) {
    console.log('Message received. ', payload);

    // ...
});
// initToken();
// async function initToken() {
//   var token = await messaging.getToken();
//   console.log(token);
// }

messaging.requestPermission().then(function () {
    console.log('Notification permission granted.');
    // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // ...
}).catch(function (err) {
    console.log('Unable to get permission to notify.', err);
});

messaging.getToken().then(function (currentToken) {
    if (currentToken) {
        console.log(currentToken);
        // sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
    } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        // setTokenSentToServer(false);
    }
}).catch(function (err) {
    console.log('An error occurred while retrieving token. ', err);
    // showToken('Error retrieving Instance ID token. ', err);
    // setTokenSentToServer(false);
});

function subscribeTokenToTopic(token, topic) {
    fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'key=' + config.apiKey
        })
    }).then(response => {
        if (response.status < 200 || response.status >= 400) {
            throw 'Error subscribing to topic: ' + response.status + ' - ' + response.text();
        }
        console.log('Subscribed to "' + topic + '"');
    }).catch(error => {
        console.error(error);
    })
}
