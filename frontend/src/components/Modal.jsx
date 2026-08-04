import React from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, title, onClose, children }) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="bg-white rounded-xl shadow-xl z-10 w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-lg font-bold text-secondary">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-danger">
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
