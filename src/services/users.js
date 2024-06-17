import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from '../firebase';

export const fetchUserName = async (user) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0]?.data();
    //   setName(data.name);
    console.log({ data });
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };