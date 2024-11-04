import React from 'react';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgb(34,34,34)',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    maxHeight: '80%', // Set maximum height for the modal
    width: '90%',
    overflowY: 'auto', // Enable vertical scrolling if content overflows
    padding: '20px', // Optional: add some padding
    borderRadius: '8px' // Optional: add rounded corners
};

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
};

export default function Modal({ isOpen, onClose, children }) { // Destructure props
    return (
        <>
            {isOpen && (
                <>
                    <div style={OVERLAY_STYLES} onClick={onClose} />
                    <div style={MODAL_STYLES}>
                        <button className='btn bg-danger fs-4 ' style={{ marginLeft: "90%", marginTop: "-15px" }} onClick={onClose}> X </button>
                        {children}
                    </div>
                </>
            )}
        </>
    );
}
