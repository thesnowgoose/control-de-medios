import moment from 'moment';
import
    { query, getDocs, collection,
      addDoc, deleteDoc, limit,
      doc, updateDoc, orderBy }
from "firebase/firestore";
import { db } from '../firebase';

// const MEDIO_TYPES = ["MET", "XLD", "VB", "HK", "Regan Lowe", "Lauril (S)", "SB", "Sb"  ];

// const MEDIO_TYPES = [
//  "A.Arginina", "A.DNA", "A.DNAse", "A.Movilidad", "A.Neutralizante", "A.Nutritivo", "A.Purificado", "A.Sangre", "A.T1N1",
//  "A.Urea", "A.Urea+NaCl", "APA", "APA Doble", "APA 0.1%", "APM", "Astel", "BAB", "Biggy", "BG", "BHI", "BP", "BRV", "C. Arginina",
//  "CEC", "Cefalexina", "Citrato", "CCC", "CGPB", "Charcoal", "C.Mucato", "C.Neutralizante", "CPA", "CPA 1%", "C. Sorbitol", "CST",
//  "CST+Fe", "CST+K2SO3", "CVB", "D-Fraser", "EMB", "EMB-L", "EMJH", "Fosfatos", "Fraser", "GHL", "Lauril (s)", "Lauril (1.5)", "Lauril (3)",
//  "Lauril-Mug", "LIA", "LIA+NaCl", "Malonato", "Métodos", "Mck/XLD", "Mck", "Mck-S", "MIO", "MIO+NaCL", "MMGB", "MRVP", "Mkttn", "OXA",
//  "Palcam", "PBS", "PDA", "PM", "RVS", "SSP", "SM", "Solución salina 0.85%", "TBX", "T1N0", "T1N1", "T1N3", "T1N6",
//  "T1N8", "T1N10", "T1N12", "TCBS", "Tetra", "Triples", "TSA", "TSA+NaCl", "TSI", "TSI+NacL", "VB/SB"
// ];

// const addMediosTypes = async () => {
//     try {
//         MEDIO_TYPES.forEach(async code => {
//             await addDoc(collection(db, "medios"), {
//                 code ,
//             });
//         });
//     } catch (error) {
//         console.log({error});
//     }
// }

export const readMediosTypes = async (setState) => {
    const q = query(collection(db, "medios"),  orderBy("code"));
    const doc = await getDocs(q);
    const mediosTypes = doc.docs.map(medio => ({ id: medio.id, code: medio.data().code }));
    setState((prev) => ({ ...prev, mediosTypes }));
}

export async function readMediosRequests(setState) {
    const q = query(collection(db, "mediosRequests"), orderBy("createdDate", "desc"), orderBy("createdHour", "desc"), limit(70));
    const doc = await getDocs(q);
    if (doc.docs.length === 0) return;
    const mediosRequests = doc.docs.map(buildMedio);
    setState((prev) => ({ ...prev, mediosRequests }));
}

export function refresh(setState) {
    setState((prev) => ({ ...prev, mediosRequests: [] }));
    readMediosRequests(setState);
}

export async function addMedio(user, setState, { code, date, amount, details }) {
    const now = moment(new Date());
    const createdDate = now.format('yyyy-MM-DD');
    const createdHour = now.format('HH:mm');
    const expectedDate = moment(date).format('yyyy-MM-DD');
    const medio = {
        code, amount,
        details,
        expectedDate,
        createdDate,
        createdHour,
        createdBy: user.name
    };

    const medioRef = await addDoc(collection(db, "mediosRequests"), medio);
    medio.id = medioRef.id;
    await updateDoc(medioRef, {
        uid: medioRef.id
    });

    setState((prev) => {
        const mediosRequests = [medio, ...prev.mediosRequests];
        return { ...prev, mediosRequests };
    });
}

export async function updateMedio(user, medio, updated, setState) {
    const { amount, date } = updated;
    const medioRef = doc(db, 'mediosRequests', medio.id);
    const data = {
        deliverAmount: amount,
        deliverDate: moment(date).format('yyyy-MM-DD'),
        deliverBy: user.name
    };
    await updateDoc(medioRef, data);

    setState((prev) => {
        const current = prev.mediosRequests.find(m => m.id === medio.id);
        const index = prev.mediosRequests.indexOf(current);
        const mediosRequests = prev.mediosRequests;
        if (index === -1 ) return prev;
        mediosRequests[index] = { ...current, ...data };
        return { ...prev, mediosRequests };
    });
}

export function exportMedios(medios) {
    exportJSONToCSV(medios);
}

export function removeMedios(completedMedios, setGlobalState) {
    const remove = async (medio) => {
        const medioRef = doc(db, 'mediosRequests', medio.id);
        await deleteDoc(medioRef);
    }
    completedMedios.forEach(remove);
    refresh(setGlobalState);
}

const buildMedio = (res) => {
    const { code, amount, expectedDate, createdDate, createdHour,
        createdBy, uid, deliverBy, deliverDate, deliverAmount, details } = res.data();
    return {
        id: uid,
        code, amount,
        details,
        expectedDate,
        createdDate,
        createdHour,
        createdBy,
        deliverBy, deliverDate, deliverAmount 
    }
}

function exportJSONToCSV(objArray) {
const today = moment(new Date()).format('DD-MMM-yyyy');
const arr = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
const str =
    `${Object.keys(arr[0])
    .map((value) => `"${value}"`)
    .join(',')}` + '\r\n';

const csvContent = arr.reduce((st, next) => {
    st +=
    `${Object.values(next)
        .map((value) => `"${value}"`)
        .join(',')}` + '\r\n';
    return st;
}, str);
var element = document.createElement('a');
element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
element.target = '_blank';
element.download = `${today}.csv`;
element.click();
}