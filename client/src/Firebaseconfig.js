import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHfjTf5ifpu8qbAO2ZqercPS1FCi0IgBA",
  authDomain: "npk-gfg.firebaseapp.com",
  projectId: "npk-gfg",
  storageBucket: "npk-gfg.appspot.com",
  messagingSenderId: "636391408051",
  appId: "1:636391408051:web:38aa1788f99c60fe300bc6",
  measurementId: "G-D3NXKK8STW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;