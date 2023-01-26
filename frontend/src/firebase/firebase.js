// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpq-8rO9deWeg8oKDigsiGmkVZoOSAymQ",
  authDomain: "aps-file-storage.firebaseapp.com",
  projectId: "aps-file-storage",
  storageBucket: "aps-file-storage.appspot.com",
  messagingSenderId: "869725596902",
  appId: "1:869725596902:web:728003eb8cff06ab55df27",
  measurementId: "G-3F4BDZQE7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();

export default app