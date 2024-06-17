import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfvs1aro5pmn9HN6dh3eM68m420bJijE4",
  authDomain: "control-de-medios.firebaseapp.com",
  projectId: "control-de-medios",
  storageBucket: "control-de-medios.appspot.com",
  messagingSenderId: "565448934601",
  appId: "1:565448934601:web:d5a5e5b5cb18630854f918"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);