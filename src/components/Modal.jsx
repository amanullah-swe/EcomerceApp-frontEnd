import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export function Modal({ message, onClose, duration }) {
    useEffect(() => {
        const time = setTimeout(() => {
            onClose();
        }, duration)
        return () => {
            clearTimeout(time);
        }
    }, [duration, onClose])
    return ReactDOM.createPortal(
        <div className="timed-alert w-full h-full/2 top-0 left-0 right-0 end-0 absolute bg-black flex items-center justify-center gap-1">
            <p>{message}</p>
            <button onClick={onClose} className='p-4 bg-red-300'>Close</button>
        </div>,
        document.getElementById('alert-root')
    );
}


