import { query, getDocs, collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const medios = ["MET", "XLD", "VB", "HK", "Regan Lowe", "Lauril (S)", "SB", "Sb"  ];

const addMedios = async () => {
    try {
        medios.forEach(async code => {
            await addDoc(collection(db, "medios"), {
                code ,
            });
        });
    } catch (error) {
        console.log({error});
    }
}

export const readMedios = async (setState) => {
    const q = query(collection(db, "medios"));
    const doc = await getDocs(q);
    const medios = doc.docs.map(medio => ({ id: medio.id, code: medio.data().code }));
    setState((prev) => ({ ...prev, medios }));
}