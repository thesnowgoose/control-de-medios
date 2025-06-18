import jsPDF from "jspdf";
import moment from "moment";
import { autoTable } from 'jspdf-autotable';

export function exportToPDF(completedMedios) {
    const records = completedMedios.map(({ id, ...rest }) => ({ ...rest }));
    const fileName = moment(new Date()).format('DD-MMM-yyyy');
    const pdfFile = new jsPDF();

    const columns = Object.keys(records[0]);
    const rows = [];

    records.forEach(element => {      
        const temp = Object.values(element);
        rows.push(temp);
    });

    autoTable(pdfFile, {
        head: [columns],
        body: rows,
        startY: 30,
        theme: "striped",
    });

    pdfFile.save(`${fileName}.pdf`);
}