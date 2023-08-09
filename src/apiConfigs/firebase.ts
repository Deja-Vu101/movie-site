import { initializeApp } from "firebase/app";

const API_KEY = "AIzaSyB6mIm8WVqsFZOHhVHydtnOUlYHdXvDxNg"
const AUTH_DOMAIN = "movie-site-9407d.firebaseapp.com"
const PROJECT_ID = "movie-site-9407d"
const STORAGE_BUCKET = "movie-site-9407d.appspot.com"
const MESSAGING_SENDER_ID = "686782914718"
const APP_ID = "1:686782914718:web:53b6e1c802410062645b8f"

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = initializeApp(firebaseConfig);
