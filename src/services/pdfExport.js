import jsPDF from "jspdf";
import moment from "moment";
import { autoTable } from 'jspdf-autotable';

const columns = ['Medio', 'Fecha de solicitud', 'Pedido / Entregado', 'Observaciones'];
const columnStyles = { 0: { cellWidth: 25 }, 1: { cellWidth: 30 } };

export function exportToPDF(completedMedios) {
    const records = completedMedios.map(({ id, ...rest }) => ({ ...rest }));
    const fileName = moment(new Date()).format('DD-MMM-yyyy');
    const pdfFile = new jsPDF();

    const rows = [];
    records.forEach(element => {      
        const temp = formatRows(element);
        rows.push(temp);
    });

    autoTable(pdfFile, {
        head: [columns],
        body: rows,
        startY: 25,
        theme: "striped",
        columnStyles
    });

    pdfFile.save(`${fileName}.pdf`);
}

const formatRows = (element) => {
    const requested = `${element.amount} el ${element.expectedDate} por ${element.createdBy} / `;
    const delivered = `${element.deliverAmount} el ${element.deliverDate} por ${element.deliverBy}`;
    return [element.code, `${element.createdDate}`, `${requested}\r\n${delivered}`, element.details]
}
