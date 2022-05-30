import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDi2G7VRs8z47yMM5R1Q-3h4JmK88ysrCQ",
  authDomain: "darzi-app-37fd8.firebaseapp.com",
  projectId: "darzi-app-37fd8",
  storageBucket: "darzi-app-37fd8.appspot.com",
  messagingSenderId: "713905177319",
  appId: "1:713905177319:web:db295040ca6cb6e1c9d842"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
export default app;