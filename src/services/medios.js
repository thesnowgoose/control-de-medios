import moment from 'moment';
import { query, getDocs, collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const MEDIO_TYPES = ["MET", "XLD", "VB", "HK", "Regan Lowe", "Lauril (S)", "SB", "Sb"  ];

const addMediosTypes = async () => {
    try {
        MEDIO_TYPES.forEach(async code => {
            await addDoc(collection(db, "medios"), {
                code ,
            });
        });
    } catch (error) {
        console.log({error});
    }
}

export const readMediosTypes = async (setState) => {
    const q = query(collection(db, "medios"));
    const doc = await getDocs(q);
    const mediosTypes = doc.docs.map(medio => ({ id: medio.id, code: medio.data().code }));
    setState((prev) => ({ ...prev, mediosTypes }));
}

export async function readMediosRequests(setState) {
    const q = query(collection(db, "mediosRequests"));
    const doc = await getDocs(q);
    if (doc.docs.length === 0) return;
    const mediosRequests = doc.docs.map(buildMedio);
    setState((prev) => ({ ...prev, mediosRequests }));
}

export async function addMedio(user, setState, { code, date, amount }) {
    const now = moment(new Date());
    const createdDate = now.format('D/MM/yyyy');
    const createdHour = now.format('hh:mm A');
    const expectedDate = moment(date).format('D/MM/yyyy')
    const medio = {
        code, amount,
        expectedDate,
        createdDate,
        createdHour,
        createdBy: user.name
    };

    const medioRef = await addDoc(collection(db, "mediosRequests"), medio);
    medio.id = medioRef.id;

    setState((prev) => {
        const mediosRequests = [...prev.mediosRequests, medio];
        return { ...prev, mediosRequests };
    });
}

const buildMedio = (res) => {
    const { code, amount, expectedDate, createdDate, createdHour, createdBy } = res.data();
    return {
        code, amount,
        expectedDate,
        createdDate,
        createdHour,
        createdBy
    }
}