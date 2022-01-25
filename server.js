
/**
 * You get this file from:
 * https://console.firebase.google.com/u/0/project/YOUR PROJECT ID HERE/settings/serviceaccounts/adminsdk
 * And hit the "Generate new private key" blue button at the bottom.
 */
const serviceAccount = require('./serviceAccountKey.json');
const DATABASE_URL = "https://sendbird-push-9c7e5.firebaseio.com";

//////////////////////////////////////////////
// CODE
//////////////////////////////////////////////

const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const firebase = require("firebase-admin");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: DATABASE_URL
});

app.get('/:token', async (req, res) => {

    const firebaseToken = req.params.token;

    var message = {
        data: {
            title: 'Notification Title',
            body: 'This is an example notification',
        }
    };

    const options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24, // 1 day
    };

    firebase.messaging().sendToDevice(firebaseToken, message, options);
    res.send('Push sent');
});

app.listen(3002, () => console.log('Firebase send push demo server is listening on port 3002!'));
