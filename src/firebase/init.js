// Import Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXQInwCT-rvg9z6SJEBb-GWE8g88LX2ss",
  authDomain: "efolio-b0bc3.firebaseapp.com",
  projectId: "efolio-b0bc3",
  storageBucket: "efolio-b0bc3.appspot.com",
  messagingSenderId: "585648243558",
  appId: "1:585648243558:web:e9e0b7483c004a521c3ea7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

// 使用命名导出导出实例
export { db, auth };
