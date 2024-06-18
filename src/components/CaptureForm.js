import React, { useState } from 'react';
import moment from 'moment'
import Datepicker from 'react-datepicker';
import { addMedio } from '../services/medios';

const emptyState = {
    code: '',
    amount: '',
    date: '',
}

const TODAY = moment().toDate();

export function CaptureForm({ medios }) {
    const [state, setState] = useState(emptyState);
    const createRecord = () => {
        addMedio(state);
        setState(emptyState);
    }
    const updateField = ({ target }) => {
        const { name, value } = target;
        setState(prev => ({ ...prev, [name]: value }));
    }
    const updateDate = date => setState(prev => ({ ...prev, date }));
    return (
        <div id="capture__form" className='d-flex justify-content-between py-4 mx-4'>
            <div className='d-flex justify-content-between mr-4'>
                <select name="code" id="medios-select" value={state.code} onChange={updateField}>
                    <option value="" selected disabled>Seleccione Medio</option>
                    { medios.map((medio, index) =>  <option key={index} value={medio.code}>{medio.code}</option>) }
                </select>
                {/* <input type="text" placeholder='Fecha' readOnly/>
                <input type="text" placeholder='Hora' readOnly/> */}
                {/* <input type="text" placeholder='Creado Por'/> */}
                <input type="number" placeholder='Cantidad' name="amount" value={state.amount} onChange={updateField}/>
                <Datepicker
                    placeholderText='Fecha de entrega'
                    dateFormat="dd/MM/yyyy"
                    minDate={TODAY}
                    selected={state.date}
                    onChange={updateDate}
                    onKeyDown={(e) => {
                        e.preventDefault();
                    }}
                />
            </div>
            <button onClick={createRecord} className='login__btn__sec'>Agregar Medio</button>
        </div>
    )
}