import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBAWsN9T9fAvXrW_xc1u7-7-0oYS4YQMHA",
  authDomain: "week7xinyuli.firebaseapp.com",
  projectId: "week7xinyuli",
  storageBucket: "week7xinyuli.appspot.com",
  messagingSenderId: "220600255992",
  appId: "1:220600255992:web:698d05c75044ef1501020d"
};

// initializeApp(firebaseConfig)
// const db = getFirestore()
const db = firebase.initializeApp(firebaseConfig);

// const db = ''
export default db
