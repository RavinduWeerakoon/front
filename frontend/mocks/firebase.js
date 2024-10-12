import firebase from 'firebase-mock';

const mockauth = new firebase.MockAuthentication();
const mockfirestore = new firebase.MockFirestore();

mockauth.autoFlush();
mockfirestore.autoFlush();

export default {
  auth: () => mockauth,
  firestore: () => mockfirestore,
};
