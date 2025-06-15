import React, { useState } from 'react';
import { exportMedios, removeMedios } from '../../services/medios';

const EXPORT_STEP = 'EXPORT_STEP';
const REMOVE_STEP = 'REMOVE_STEP';

export function ExportModal({ setGlobalState, setIsOpen, mediosRequests}) {
    const [step, setStep] = useState(EXPORT_STEP)
    const completedRecords = mediosRequests.filter(record => !!record.deliverDate);

    if (step === EXPORT_STEP) return <ExportMedios completedRecords={completedRecords} setStep={setStep} setIsOpen={setIsOpen} />

    return <RemoveMedios completedRecords={completedRecords} setGlobalState={setGlobalState} setIsOpen={setIsOpen} />
    
}

const ExportMedios = ({ completedRecords, setStep, setIsOpen }) => {
    const allowBackup = !!completedRecords.length;
    const onClick = () => {
        if (allowBackup) {
            exportMedios(completedRecords);
            setStep(REMOVE_STEP);
        } else setIsOpen(false);
    }
    return (
        <div>
            {allowBackup ? (
                <span>Desea crear el respaldo de {completedRecords.length || 0} registros?</span>
            ) : (
                <span>No hay registros completados para respaldar.</span>
            )}
            <div>
                <button className='login__btn py-2 mt-4 w-100' onClick={onClick}>Aceptar</button>
            </div>
        </div>
    )
}

const RemoveMedios = ({ completedRecords, setIsOpen, setGlobalState }) => {
    const onClick = () => {
        removeMedios(completedRecords, setGlobalState);
        setIsOpen(false);
    }
    return (
        <div>
            <span>Ahora se eliminaran {completedRecords.length || 0} registros</span>
            <div>
                <button className='login__btn py-2 mt-4 w-100' onClick={onClick}>Aceptar</button>
            </div>
        </div>
    )
}