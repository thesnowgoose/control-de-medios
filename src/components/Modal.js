import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import Datepicker from 'react-datepicker';
import { TODAY } from './CaptureForm';

ReactModal.setAppElement('#root');

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px'
    },
};

const emptyState = {};

export function Modal({ setMedioSelected, medio }) {
    const [state, setState] = useState(emptyState);
    const closeModal = () => setMedioSelected(null);

    const updateDate = date => setState(prev => ({ ...prev, date }));
    const updateAmount = ({ target }) => setState(prev => ({ ...prev, amount: target.value }));

    const onClick = () => {
        setMedioSelected(null)
    };

    return (
        <ReactModal
            isOpen={!!medio}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div className='d-flex justify-content-between'>
                <h3>Entregar</h3>
                <span className='close__btn' onClick={closeModal}>X</span>
            </div>
            <div id="requests__list" className=''>
                <TableHeader />
                <tr>
                    <td className='record-item'>{medio?.code}</td>
                    <td className='record-item'>{medio?.amount}</td>
                    <td className='record-item'>{medio?.expectedDate}</td>
                </tr>
            </div>
            <div className='d-flex flex-column mt-5'>
                <div className='d-flex flex-row justify-content-between'>
                    <input type="number" placeholder='Cantidad a entregar' name="amount" value={state.amount} onChange={updateAmount}/>
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
                <button className='login__btn py-2 mt-4' onClick={onClick}>Aceptar</button>
            </div>
      </ReactModal>
    )
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