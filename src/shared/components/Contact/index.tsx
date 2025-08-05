'use client';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorModal from '../ErrorModal';
import { sendContact } from '@core/shared/services/ContactService';
import SuccessModal from '../SuccessModal';

export default function Contact() {
    const { handleSubmit, register, reset, formState: { isSubmitting } } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);    

    const onSubmit = useCallback(async (data: any) => {
        try {
            const response = await sendContact(data);
            if(response !== 200)
                setIsError(true);
            else
                setIsSuccess(true);
            reset();

        } catch (e) {
            setIsError(true);
        }
    }, []);
    
    return (
        <form className='w-full flex flex-col items-center my-8'
            onSubmit={handleSubmit(onSubmit)}>
            <h3 className='text-2xl text-yellow font-bold mb-4'>CONTATO</h3>
            <div className='w-full max-w-[600px] flex flex-col gap-4'>
                <input {...register('name')} placeholder='Nome' className='text-sm rounded-sm px-4 py-2 font-bold focus:outline-none'/>
                <input {...register('telephone')} placeholder='Telefone' className='text-sm rounded-sm px-4 py-2 font-bold focus:outline-none'/>
                <input {...register('email')} placeholder='E-mail' className='text-sm rounded-sm px-4 py-2 font-bold focus:outline-none'/>
                <textarea {...register('message')} placeholder='Mensagem' className='text-sm rounded-sm px-4 py-2 font-bold focus:outline-none'></textarea>
            </div>
            <button className='w-[144px] py-2 rounded-sm bg-green text-white font-bold mt-8'
                type='submit'
                disabled={isSubmitting}
            >
                ENVIAR
            </button>
            <SuccessModal 
                isOpen={isSuccess} 
                setIsOpen={setIsSuccess} 
                title="Mensagem enviada"
                message="Sua mensagem foi enviada com sucesso"
            />
            <ErrorModal 
                isOpen={isError} 
                setIsOpen={setIsError} 
                title="Mensagem não enviada"
                message="Não foi possível enviar sua mensagem no momento"
            />
        </form>
    );
} 