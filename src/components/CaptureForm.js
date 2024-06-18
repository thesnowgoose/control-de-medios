import React from 'react';

export function CaptureForm() {
    return (
        <div id="capture__form" className='d-flex justify-content-between py-4 mx-4'>
            <div className='d-flex justify-content-between mr-4'>
                <input type="text" placeholder='Seleccione Medio'/>
                {/* <input type="text" placeholder='Fecha' readOnly/>
                <input type="text" placeholder='Hora' readOnly/> */}
                {/* <input type="text" placeholder='Creado Por'/> */}
                <input type="number" placeholder='Cantidad'/>
                <input type="text" placeholder='Fecha de entrega'/>
            </div>
            <button className='login__btn__sec'>Agregar Medio</button>
        </div>
    )
}