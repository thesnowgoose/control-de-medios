import React from 'react';

export function RecordsList({ user, mediosRequests }) {
    if (!mediosRequests.length) return (
        <div id="empty__list" className='d-flex align-self-center flex-column mt-5 pt-5'>
            <img src={`${process.env.PUBLIC_URL}/ensayo.png`} alt="logo" />
            <h3 className='mt-3'>No hay medios agregados</h3>
        </div>
    )

    return (
        <table id="requests__list" className='px-3 mt-3'>
            <TableHeader />
            <tbody>
                {mediosRequests.map((medio, index) => (
                    <TableRow key={`${medio.code}_${index}`} medio={medio} user={user} />
                ))}
            </tbody>
        </table>
    );
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th className=''>Medio</th>
                <th className=''>Cantidad</th>
                <th className=''>Fecha esperada</th>
                <th className=''>Registro Creado</th>
                <th className=''>Creado por</th>
            </tr>
        </thead>
    )
}

const TableRow = ({ medio, user }) => {
    const showEdit = user?.rol === 'deliver';
    return (
        <tr>
            <td className='record-item'>{medio.code}</td>
            <td className='record-item'>{medio.amount}</td>
            <td className='record-item'>{medio.expectedDate}</td>
            <td className='record-item'>{`${medio.createdDate} a las ${medio.createdHour}`}</td>
            <td className='record-item d-flex justify-content-between'>{medio.createdBy}
                { showEdit && <button className='login__btn__sec p-1 px-2'>Entregar</button>}
            </td>
        </tr>
    )
}