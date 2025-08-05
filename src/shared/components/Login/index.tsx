'use client';
import { authBuyer } from '@core/shared/services/BuyerService';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorModal from '../ErrorModal';
import { useAuth } from '@core/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Login() {
    const { setUser } = useAuth();
    const { handleSubmit, register, formState: { isSubmitting } } = useForm();
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const onSubmit = useCallback(async (data: any) => {
        try {
            const response = await authBuyer(data);
            if(!response) {
                setIsError(true);
                return;
            }
            localStorage.setItem('@ec-tiramulta:user', JSON.stringify(response.user));
            setUser(response.user);
            router.push('/meus-pedidos');
        } catch (e) {
            setIsError(true);
        }
    }, [router, setUser]);

    return(
        <form className='w-full flex flex-col md:flex-row gap-2 md:gap-8 mt-4'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='md:w-1/2 flex flex-col items-center border-[1px] border-gray px-4 py-2'>
                <span className='text-yellow font-bold'>Já tenho uma conta</span>
                <label className='w-full max-w-[400px] font-bold text-sm'>
                    E-mail
                    <input {...register('email')} className='w-full px-2 py-1 border-[1px] border-gray rounded-sm focus:outline-none'/>
                </label>
                <label className='w-full max-w-[400px] font-bold text-sm'>
                    Senha
                    <input {...register('password')} className='w-full px-2 py-1 border-[1px] border-gray rounded-sm focus:outline-none'/>
                </label>
                <button className='w-full max-w-[120px] py-2 bg-yellow text-white text-sm rounded-sm mt-4' 
                    type="submit"
                    disabled={isSubmitting}
                >
                    Login
                </button>
            </div>
            <div className='md:w-1/2 flex flex-col justify-center items-center border-[1px] border-gray px-4 py-2'>
                <Link className='w-full max-w-[120px] flex justify-center py-2 bg-green text-white text-sm rounded-sm mt-4'
                    href="/criar-conta"
                >
                    <span>Cadastra-se</span>
                </Link>
            </div>
            <ErrorModal 
                isOpen={isError} 
                setIsOpen={setIsError} 
                title="Falha no login"
                message="E-mail ou senha inválidos"
            />
        </form>
    );
}