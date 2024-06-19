import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from '../firebase';

export const readLoggedUser = async (uid, setState) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const doc = await getDocs(q);
      const loggedUser = doc.docs[0]?.data();
      setState((prev) => ({ ...prev, loggedUser }));
    } catch (err) {
      alert("Error al traer datos del usuario");
    }
  };