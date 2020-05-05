import * as firebase from 'firebase'

export const fbApp = firebase.initializeApp({
  apiKey: process.env.DB_API_KEY,
  authDomain: "educode-90989.firebaseapp.com",
  databaseURL: "https://educode-90989.firebaseio.com",
  projectId: "educode-90989",
  storageBucket: "educode-90989.appspot.com",
  messagingSenderId: "658993579989",
  appId: "1:658993579989:web:e2ead98ff0ddf3e3681f5c"
})


/**
 * Database Collections definition
 * @typedef {Object} Collections
 * @property {firebase.firestore.CollectionReference<firebase.firestore.DocumentData>} users
 */
export const dbCollections = {
  users: fbApp.firestore().collection("users")
}