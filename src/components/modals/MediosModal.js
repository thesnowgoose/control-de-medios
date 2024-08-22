import React, { useState } from 'react';
import moment from 'moment';
import Datepicker from 'react-datepicker';
import { TODAY } from '../CaptureForm';
import { updateMedio } from '../../services/medios';

const emptyState = {};

export function MediosModal({ setGlobalState, medio, user, setIsOpen }) {
    const [state, setState] = useState(emptyState);
    const isDetailsView = !!medio?.isDetailsView;
    const isDelivered = !!medio?.deliverDate || isDetailsView;

    const updateDate = date => setState(prev => ({ ...prev, date }));
    const updateAmount = ({ target }) => setState(prev => ({ ...prev, amount: target.value }));

    const onClick = () => {
        if (!isDelivered) updateMedio(user, medio, state, setGlobalState);
        setIsOpen(false);
    };

    const expDate = medio && moment(medio.expectedDate, 'yyyy-MM-DD').format('DD/MM/yyyy');
    return (
        <div>
            <div id="requests__list" className=''>
                <TableHeader />
                <tbody>
                    <tr>
                        <td className='record-item'>{medio?.code}</td>
                        <td className='record-item'>{medio?.amount}</td>
                        <td className='record-item'>{expDate}</td>
                    </tr>
                </tbody>
            </div>
            <div>
            { isDetailsView ? <DetailsView medio={medio} /> : 
            (
                <>
                    { isDelivered ? (
                        <>
                            <DetailsView medio={medio} />
                            <CompletedTab medio={medio} />
                        </> ): (
                        <div className='d-flex flex-column mt-5'>
                            <div className='d-flex flex-row justify-content-between'>
                                <input type="number" placeholder='Cantidad a entregar' name="amount" value={state.amount} onChange={updateAmount}/>
                                <Datepicker
                                    placeholderText='Fecha de entrega'
                                    dateFormat="dd/MM/yyyy"
                                    portalId="root-portal"
                                    minDate={TODAY}
                                    selected={state.date}
                                    onChange={updateDate}
                                    onFocus={e => e.target.blur()}
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </>
            )
             }
            
            <button className='login__btn py-2 mt-4 w-100' onClick={onClick}>Aceptar</button>
            </div>
      </div>
    );
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th className='py-0 px-3'>Medio</th>
                <th className='py-0 px-3'>Cantidad</th>
                <th className='py-0 px-3'>Fecha esperada</th>
            </tr>
        </thead>
    )
}

const CompletedTab = ({ medio }) => {
    const deliverDate = medio?.deliverDate && moment(medio.deliverDate, 'yyyy-MM-DD').format('DD/MM/yyyy');
    return (
        <>
            <h4 className='mt-4'>Datos de entrega:</h4>
            <table id="requests__list" className='mt-2'>
                <thead>
                    <tr>
                        <th className='py-0 px-3'>Fecha</th>
                        <th className='py-0 px-3'>Cantidad</th>
                        <th className='py-0 px-3'>Entregado por</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='record-item'>{deliverDate}</td>
                        <td className='record-item'>{medio?.deliverAmount}</td>
                        <td className='record-item'>{medio?.deliverBy}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

const DetailsView = ({ medio }) => {
    return (
        <>
            <div className='mt-3 h4'>Observaciones:</div>
            <div>{medio.details}</div>
        </>
    );
}