import { Dialog } from '@headlessui/react';
import { useEffect } from 'react';
import { FiXCircle } from 'react-icons/fi';

export default function SuccessModal({ isOpen, setIsOpen, title, message }: any) {
    useEffect(() => {
        setTimeout(() => {
            setIsOpen(false);
        }, 4000);
    }, [setIsOpen]);

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full p-4 mx-auto max-w-sm rounded bg-green text-white relative">
                    <Dialog.Title className="font-bold text-lg">{title}</Dialog.Title>
                    <Dialog.Description>{message}</Dialog.Description>
                    <div className='absolute top-[-20px] right-[-20px] text-green text-lg cursor-pointer' onClick={() => setIsOpen(false)}>
                        <FiXCircle />
                    </div>    
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}