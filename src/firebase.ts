import { initializeApp } from "firebase/app";

//const firebaseConfig = {
//  apiKey: JSON.stringify(import.meta.env.VITE_apiKey),
//  authDomain: JSON.stringify(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
//  projectId: JSON.stringify(import.meta.env.VITE_FIREBASE_PROJECT_ID),
//  storageBucket: JSON.stringify(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
//  messagingSenderId: JSON.stringify(
//    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
//  ),
//  appId: JSON.stringify(import.meta.env.VITE_FIREBASE_APP_ID),
//};

const firebaseConfig = {
  apiKey: "AIzaSyB6mIm8WVqsFZOHhVHydtnOUlYHdXvDxNg",
  authDomain: "movie-site-9407d.firebaseapp.com",
  projectId: "movie-site-9407d",
  storageBucket: "movie-site-9407d.appspot.com",
  messagingSenderId: "686782914718",
  appId: "1:686782914718:web:53b6e1c802410062645b8f"
};

const app = initializeApp(firebaseConfig);
