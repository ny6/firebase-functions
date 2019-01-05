const admin = require('firebase-admin');
const { https } = require('firebase-functions');
const createUser = require('./create_user');
const serviceAccount = require('./service.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://reactnative-auth-yk.firebaseio.com',
});


exports.createUser = https.onRequest(createUser);
