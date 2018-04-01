import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const addUserMessages = functions.database.ref(`/messages/{messageId}`)
    .onWrite(event => {
        const messageKey = event.data.key;
        const messageValue = event.data.val();

        admin.database().ref(`/user-messages/${messageValue.userFromId}/${messageValue.userToId}`)
            .child(messageKey).set(1)
            .catch(err => console.error(err));
        admin.database().ref(`/user-messages/${messageValue.userToId}/${messageValue.userFromId}`)
            .child(messageKey).set(1)
            .catch(err => console.error(err));;
    });

export const generateLastMessage = functions.database.ref(`/messages/{messageId}`)
    .onWrite(event => {
        const messageKey = event.data.key;
        const messageValue = event.data.val();

        admin.database().ref(`/last-messages/${messageValue.userFromId}/${messageValue.userToId}`)
            .child('key').set(messageKey)
            .catch(err => console.error(err));
        admin.database().ref(`/last-messages/${messageValue.userToId}/${messageValue.userFromId}`)
            .child('key').set(messageKey)
            .catch(err => console.error(err));
    })