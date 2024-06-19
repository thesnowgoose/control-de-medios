import React from 'react';

export function RecordsList({ user, mediosRequests }) {
    if (!mediosRequests.length) return 'Empty';

    return (
        <table id="requests__list" className='px-3 mt-3'>
            <TableHeader />
            {mediosRequests.map((medio, index) => (
                <TableRow key={`${medio.code}_${index}`} medio={medio} />
            ))}
        </table>
    );
}

const TableHeader = () => {
    return (
        <tr>
            <th className=''>Medio</th>
            <th className=''>Cantidad</th>
            <th className=''>Fecha esperada</th>
            <th className=''>Registro Creado</th>
            <th className=''>Creado por</th>
        </tr>
    )
}

const TableRow = ({ medio }) => {
    return (
        <tr>
            <td className='record-item'>{medio.code}</td>
            <td className='record-item'>{medio.amount}</td>
            <td className='record-item'>{medio.expectedDate}</td>
            <td className='record-item'>{`${medio.createdDate} a las ${medio.createdHour}`}</td>
            <td className='record-item'>{medio.createdBy}</td>
        </tr>
    )
}