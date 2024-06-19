// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAVXpvFN71MEIQQoQpmhUDWYqQOR-qYIwE",
    authDomain: "chat-app-b5328.firebaseapp.com",
    projectId: "chat-app-b5328",
    storageBucket: "chat-app-b5328.appspot.com",
    messagingSenderId: "779341024025",
    appId: "1:779341024025:web:d30d8035836ba09fec9388",
    measurementId: "G-6KLK6ZL743"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
