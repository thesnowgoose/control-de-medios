import {
    signInWithEmailAndPassword,
    signOut,
    // createUserWithEmailAndPassword
} from "firebase/auth";
import {
    query,
    getDocs,
    collection,
    where,
    // addDoc
} from "firebase/firestore";
import { db, auth } from '../firebase';

const DOMAIN = '@prepmedios.com';

export const logInWithUsernameAndPassword = async (name, password) => {
    const username = name.toLowerCase();
    const email = `${username}${DOMAIN}`;
    if (!username || !password) return;
    try {
        // await registerWithEmailAndPassword(username, email, password);
        const q = query(collection(db, "users"), where("email", "==", email));
        const docs = await getDocs(q);
        if (docs.docs.length) {
            await signInWithEmailAndPassword(auth, email, password);
        } else {
            alert('Usuario no encontrado');
        }
    } catch (err) {
      console.error(err);
      alert('Hubo un error. Intentar mas tarde.');
    }
  };

export const logout = () => {
    signOut(auth);
};
