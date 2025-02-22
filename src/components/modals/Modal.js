import React from 'react';
import ReactModal from 'react-modal';

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

export function Modal({ Content, title, isOpen, ...props }) {
    const closeModal = () => props.setIsOpen(false);
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div className='d-flex justify-content-between'>
                <h4>{title}</h4>
                <span className='close__btn' onClick={closeModal}>X</span>
            </div>
            <Content {...props} />
        </ReactModal>
    )
};

export const openModal = ({ setGlobalState, Content, ...props }) => {
    setGlobalState((prevState) => {
        return { ...prevState, modalContent: { setGlobalState, Content, isOpen: true, ...props } }
    })
};