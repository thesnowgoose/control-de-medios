import {
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    query,
    getDocs,
    collection,
    where,
} from "firebase/firestore";
import { db, auth } from '../firebase';

const DOMAIN = '@prepmedios.com';

export const logInWithUsernameAndPassword = async (name, password) => {
    const username = name.toLowerCase();
    const email = `${username}${DOMAIN}`;
    if (!username || !password) return;
    try {
        const q = query(collection(db, "users"), where("email", "==", email));
        const docs = await getDocs(q);
        console.log({ docs });
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
