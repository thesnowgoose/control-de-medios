import React, { useState } from 'react';
import moment from 'moment';
import { Modal } from './Modal';
import {  getPermissions } from '../utils';

export function RecordsList({ user, mediosRequests, setGlobalState }) {
    const [medioSelected, setMedioSelected] = useState(null);

    if (!mediosRequests.length) return (
        <div id="empty__list" className='d-flex align-self-center flex-column mt-5 pt-5'>
            <img src={`${process.env.PUBLIC_URL}/ensayo.png`} alt="logo" />
            <h3 className='mt-3'>No hay medios agregados</h3>
        </div>
    )

    return (
        <>
            <table id="requests__list" className='px-3 mt-3'>
                <TableHeader />
                <tbody>
                    {mediosRequests.map((medio, index) => (
                        <TableRow
                            key={`${medio.code}_${index}`}
                            medio={medio}
                            user={user}
                            setMedioSelected={setMedioSelected}
                        />
                    ))}
                </tbody>
            </table>
            <Modal user={user} medio={medioSelected} setMedioSelected={setMedioSelected} setGlobalState={setGlobalState} />
        </>
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
                <th className=''>Estatus</th>
            </tr>
        </thead>
    )
}

const TableRow = ({ medio, user, setMedioSelected }) => {
    const { canDeliver } = getPermissions(user);
    const isDelivered = !!medio.deliverDate;
    const showEdit = !isDelivered && canDeliver|| isDelivered;
    const showDetails = medio.details;
    const buttonText = isDelivered ? 'Completado' : 'Pendiente';
    const btnClass = isDelivered ? 'success__btn' : 'fail__btn';
    const { expectedDate, createdDate } = getFormatedDates(medio);
    return (
        <tr>
            <td className='record-item'>{medio.code}</td>
            <td className='record-item'>{medio.amount}</td>
            <td className='record-item'>{expectedDate}</td>
            <td className='record-item'>{`${createdDate} a las ${medio.createdHour}`}</td>
            <td className='record-item'>
                <span>{medio.createdBy}</span>
                { showDetails && <button onClick={() => setMedioSelected({ ...medio, isDetailsView: true})} className='fa fa-eye login__btn__sec p-1 px-2 ms-3'><i /></button> }
            </td>
            <td className='record-item'>
                { showEdit ? <button onClick={() => setMedioSelected(medio)} className={`login__btn__sec ${btnClass} p-1 px-2`}>{buttonText}</button> : 
                <button disabled className='login__btn__sec p-1 px-2'>Pendiente</button>}
            </td>
        </tr>
    )
}

const getFormatedDates = (medio) => {
    const { expectedDate, createdDate } = medio;
    const a = moment(expectedDate, 'yyyy-MM-DD').format('DD/MM/yyyy');
    const b = moment(createdDate, 'yyyy-MM-DD').format('DD/MM/yyyy');
    return {
        expectedDate: a,
        createdDate: b,
    }
}