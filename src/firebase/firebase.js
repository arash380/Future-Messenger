import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDJ40dXxeQHPhTQ-SblEXD58FiIgrq6egU",
    authDomain: "future-messenger7.firebaseapp.com",
    databaseURL: "https://future-messenger7.firebaseio.com",
    projectId: "future-messenger7",
    storageBucket: "future-messenger7.appspot.com",
    messagingSenderId: "457247113638",
    appId: "1:457247113638:web:bfe9d998948c7a92848f67",
    measurementId: "G-181BLJX6W3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;