// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
// import "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
const config = {
  apiKey: "AIzaSyDvvVWlzTNclQQYycE77dltr5Chl1vlg7Y",
  authDomain: "chat-app-6cdca.firebaseapp.com",
  projectId: "chat-app-6cdca",
  storageBucket: "chat-app-6cdca.appspot.com",
  messagingSenderId: "667380827103",
  appId: "1:667380827103:web:fcce78362430333779fa6a",
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
