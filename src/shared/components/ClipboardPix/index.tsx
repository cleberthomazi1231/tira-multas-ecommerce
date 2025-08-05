'use client';
import { useCallback, useState } from 'react';
import { FiClipboard } from 'react-icons/fi';
import SuccessModal from '../SuccessModal';

export default function ClipboardPix({ mercadoPagoData }: any) {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCopyPixKey = useCallback(() => {
        navigator.clipboard
            .writeText(mercadoPagoData?.point_of_interaction?.transaction_data?.qr_code)
            .then(
                (success) => {
                    setIsSuccess(true); 
                    setTimeout(() => {
                        setIsSuccess(false);
                    }, 2000);
                },
                (err) => console.log('error copying text')
            );
    }, [mercadoPagoData?.point_of_interaction?.transaction_data?.qr_code]);

    return (
        <div className='flex justify-center uppercase mt-4'>
            <span>Chave Pix Copia e Cola: </span>
            <div className='w-full flex'>
                <span  className='text-green ml-2 underline' onClick={() => handleCopyPixKey()}>
                    {`${String(mercadoPagoData?.point_of_interaction?.transaction_data?.qr_code).substring(0, 16)}...`}
                </span>
                <FiClipboard title='Copiar Chave' onClick={() => handleCopyPixKey()}/>
            </div>
            <SuccessModal 
                isOpen={isSuccess} 
                setIsOpen={setIsSuccess} 
                title="Ação Realizada"
                message="Chave pix copiada com sucesso"
            />
        </div>
    );
}