import React, { useState } from 'react';
import moment from 'moment'
import Datepicker from 'react-datepicker';
import { addMedio } from '../services/medios';

const emptyState = {
    code: '',
    amount: '',
    date: '',
    details: '',
}

export const TODAY = moment().toDate();

export function CaptureForm({ mediosTypes, setGlobalState, user }) {
    const [state, setState] = useState(emptyState);
    const buttonDisabled = !state.code || !state.amount || !state.date;
    const createRecord = () => {
        addMedio(user, setGlobalState, state);
        setState(emptyState);
    }
    const updateField = ({ target }) => {
        const { name, value } = target;
        setState(prev => ({ ...prev, [name]: value }));
    }
    const updateDate = date => setState(prev => ({ ...prev, date }));
    return (
        <div id="capture__form" className='d-flex justify-content-between align-items-center py-4 me-4'>
            <div className='d-flex flex-column'>
                <div className='d-flex justify-content-between mb-2'>
                    <select name="code" id="medios-select" value={state.code} onChange={updateField}>
                        <option value="" selected disabled>Seleccione Medio</option>
                        { mediosTypes.map((type, index) =>  <option key={index} value={type.code}>{type.code}</option>) }
                    </select>
                    <input type="number" placeholder='Cantidad' name="amount" value={state.amount} onChange={updateField}/>
                    <Datepicker
                        placeholderText='Fecha de entrega'
                        dateFormat="dd/MM/yyyy"
                        minDate={TODAY}
                        selected={state.date}
                        onChange={updateDate}
                        onFocus={e => e.target.blur()}
                        onKeyDown={(e) => {
                            e.preventDefault();
                        }}
                    />
                </div>
                <input type="text" placeholder='Observaciones' className='w-100' name="details" onChange={updateField} />
            </div>
            <button onClick={createRecord} className='login__btn__sec' disabled={buttonDisabled}>Agregar</button>
        </div>
    )
}