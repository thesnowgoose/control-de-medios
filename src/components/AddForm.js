import React from 'react';
import { addMedioType, removeMedioType } from '../services/medios';

export function AddForm({ mediosTypes, setGlobalState, user }) {
    return (
        <div>
            <CaptureForm setGlobalState={setGlobalState} />
            <div className='w-75'>
                <table id="requests__list" className='px-3 mt-3'>
                    <TableHeader />
                    <tbody>
                    {mediosTypes.map((medio, index) => (
                        <TableRow
                            key={`${medio.code}_${index}`}
                            medio={medio}
                            setGlobalState={setGlobalState}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th className=''>Medio</th>
            </tr>
        </thead>
    )
}

const TableRow = ({ medio, setGlobalState }) => {
    const removeMedio = () => removeMedioType(medio, setGlobalState);
    return (
        <tr>
            <td className='record-item'>
                <div className='d-flex justify-content-between'>
                    <span>{medio.code}</span>
                    <div>
                        {/* <button onClick={() => {}} className='fa fa-pencil login__btn__sec p-1 px-2 ms-3'><i /></button>  */}
                        <button onClick={removeMedio} className='fa fa-trash login__btn__sec p-1 px-2 me-2'><i /></button> 
                    </div>
                </div>
            </td>
        </tr>
    )
}

const CaptureForm = ({ setGlobalState }) => {
    const [code, setCode] = React.useState('');

    const addCode = () => {
        if (code === '') return;
        addMedioType(code, setGlobalState);
        setCode('');
    }
    return (
        <div id="capture__form" className='d-flex align-items-center py-4 mr-4 w-50'>
            <input type="text" className='w-50' placeholder='Nombre del medio' name="code" value={code} onChange={event => setCode(event.target.value)}/>
            <button onClick={addCode} className='login__btn__sec ms-3' disabled={!code}>Agregar</button>
        </div>
    )
}