// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQWliQQRvSxNOWyDkr9nww3lJBUS1YgcA",
  authDomain: "explora-y-aprende-573dc.firebaseapp.com",
  projectId: "explora-y-aprende-573dc",
  storageBucket: "explora-y-aprende-573dc.firebasestorage.app",
  messagingSenderId: "892202090791",
  appId: "1:892202090791:web:6056bae61eff5675666902",
  measurementId: "G-13VJYSLSLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
