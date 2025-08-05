import { Dialog } from '@headlessui/react';
import { useEffect } from 'react';
import { FiXCircle } from 'react-icons/fi';

export default function PaymentModal({ isOpen, setIsOpen }: any) {
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
            <div className="fixed inset-0" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full p-4 mx-auto max-w-sm rounded bg-red text-white relative">
                    <Dialog.Title className="font-bold text-lg">Pagamento Negado</Dialog.Title>
                    <Dialog.Description>Tente novamente ou altere a forma de pagamento</Dialog.Description>
                    <div className='absolute top-[-20px] right-[-20px] text-red text-lg cursor-pointer' onClick={() => setIsOpen(false)}>
                        <FiXCircle />
                    </div>    
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}