
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-d5fad.firebaseapp.com",
  projectId: "loginonecart-d5fad",
  storageBucket: "loginonecart-d5fad.firebasestorage.app",
  messagingSenderId: "358162843897",
  appId: "1:358162843897:web:e53649947b562e4a4a7a28"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}
