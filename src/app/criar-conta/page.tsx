'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { BiHomeAlt } from 'react-icons/bi';

import { Form } from '@core/shared/components/Form';
import { useCallback, useEffect, useState } from 'react';
import StringUtils from '@core/shared/utils/StringUtils';
import { createBuyer } from '@core/shared/services/BuyerService';
import { useCart } from '@core/shared/hooks/useCart';
import { useAuth } from '@core/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import ErrorModal from '@core/shared/components/ErrorModal';

const createAccountSchema = z.object({
    name: z.string().nonempty({ 
        message: 'O nome é obrigatório',
    }),
    last_name: z.string().nonempty({
        message: 'Sobrenome é obrigatório'
    }),
    telephone: z.string().nonempty({
        message: 'Telefone é obrigatório'
    }),
    email: z.string().nonempty({
        message: 'E-mail é obrigatório'
    })
        .email({ message: 'Formato do e-mail é inválido'})
        .transform((email: string) => email.toLowerCase().trim()),
    password: z.string().nonempty({
        message: 'Senha é obrigatório'
    }),
    zipcode: z.string().nonempty({
        message: 'CEP é obrigatório'
    }),
    uf: z.string().nonempty({
        message: 'UF é obrigatório'
    }),
    city: z.string().nonempty({
        message: 'Cidade é obrigatória'
    }),
    neighborhood: z.string().nonempty({
        message: 'Bairro é obrigatório'
    }),
    street: z.string().nonempty({
        message: 'Rua é obrigatória'
    }),
    number: z.string().nonempty({
        message: 'Número do endereço é obrigatório'
    }),
    complement: z.string().optional()
});

type CreateAccount = z.infer<typeof createAccountSchema>;

export default function MultaDetalhesPage() {
    const { setUser, getUser } = useAuth();
    const [isError, setIsError] = useState(false);
    const { cart } = useCart();
    const router = useRouter();

    const form = useForm<CreateAccount>({
        resolver: zodResolver(createAccountSchema)
    });

    const { handleSubmit, watch, setValue, formState: { isSubmitting } } = form;
    const zipcode = watch('zipcode');

    const handleSearchZipcode = useCallback(async (value: string) => {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json`);
        if(response.status !== 200) return;
        const data = await response.json();
        if(data?.erro) return;
        setValue('uf', data.uf);
        setValue('city', data.localidade);
        setValue('street', data.logradouro);
        setValue('complement', data.complement);
    }, [setValue]);

    const handleCreateAccount = useCallback(async (data: any) => {
        const buyer = await createBuyer(data);
        if (!buyer) {
            setIsError(true);
            return;
        }
        localStorage.setItem('@ec-tiramulta:user', JSON.stringify(buyer));
        setUser(buyer);
        if(cart.items.length > 0)
            router.push('/checkout');
        else 
            router.push('/meus-pedidos');
    }, [cart.items.length, router, setUser]);
        

    useEffect(() => {
        if(getUser()) {
            if(cart.items.length > 0)
                router.push('/checkout');
            else 
                router.push('/meus-pedidos');
        }
        const value = StringUtils.onlyNumber(zipcode);
        if(value.length !== 8) return;
        handleSearchZipcode(value);
    }, [cart.items.length, getUser, handleSearchZipcode, router, zipcode]);
   
    return (
        <main className="flex flex-col">
            <div className='container w-full flex items-center gap-2 py-4 text-black text-xs'>
                <Link href="/"><BiHomeAlt className='mb-[2px]'/></Link>
                <span>{'>'}</span>
                <span>Criar Conta</span>
                <span>{'>'}</span>
                <Link href="/">Voltar</Link>
            </div>
            <div className="container w-full flex flex-col">
                <div className='w-full flex flex-col bg-white p-4'>
                    <h1 className='text-lg mb-4'>Criar uma Conta</h1>
                    <FormProvider {...form} >
                        <form className='w-full flex flex-col gap-1'
                            onSubmit={handleSubmit(handleCreateAccount)}>
                            <div className='w-full flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-between'>
                                <div className='w-full md:max-w-[48%] flex flex-col'>
                                    <Form.Label htmlFor='name'>Nome</Form.Label>
                                    <Form.Input name='name' />
                                </div>
                                <div className='w-full md:max-w-[48%] flex flex-col'>
                                    <Form.Label htmlFor='last_name'>Sobrenome</Form.Label>
                                    <Form.Input name='last_name' />
                                </div>
                                <div className='w-full md:max-w-[48%] flex flex-col'>
                                    <Form.Label htmlFor='telephone'>Telefone</Form.Label>
                                    <Form.InputMask name='telephone' mask="(99) 99999-9999"/>
                                </div>

                                <div className='w-full md:max-w-[48%] flex justify-between'>
                                    <div className='w-[48%] flex flex-col'>
                                        <Form.Label htmlFor='email'>Email</Form.Label>
                                        <Form.Input name='email' />
                                    </div>
                                    <div className='w-[48%] flex flex-col'>
                                        <Form.Label htmlFor='password'>Senha</Form.Label>
                                        <Form.Input name='password' type='password'  />
                                    </div>
                                </div>
                                
                                <div className='w-full md:max-w-[48%] flex justify-between'>
                                    <div className='w-[48%] flex flex-col'>
                                        <Form.Label htmlFor='zipcode'>CEP</Form.Label>
                                        <Form.InputMask name='zipcode' mask="99999-999"/>
                                    </div>
                                    <div className='w-[48%] flex flex-col'>
                                        <Form.Label htmlFor='uf'>UF</Form.Label>
                                        <Form.SelectStatesOfBrazil name='uf' />
                                    </div>
                                </div>
                                <div className='w-full md:max-w-[48%] flex justify-between'>
                                    <div className='w-[48%] flex flex-col'>
                                        <Form.Label htmlFor='city'>Cidade</Form.Label>
                                        <Form.Input name='city' />
                                    </div>
                                    <div className='w-[48%] flex flex-col'>
                                        <Form.Label htmlFor='neighborhood'>Bairro</Form.Label>
                                        <Form.Input name='neighborhood' />
                                    </div>
                                </div>
                                <div className='w-full md:max-w-[48%] flex flex-col'>
                                    <Form.Label htmlFor='street'>Rua</Form.Label>
                                    <Form.Input name='street' />
                                </div>
                                <div className='w-full md:max-w-[48%] flex justify-between'>
                                    <div className='w-[48%] flex flex-col'>
                                        <Form.Label htmlFor='number'>Nº</Form.Label>
                                        <Form.Input name='number' />
                                    </div>
                                    <div className='w-[48%] flex flex-col'>
                                        <Form.Label htmlFor='complement'>Complemento</Form.Label>
                                        <Form.Input name='complement' />
                                    </div>
                                </div>
                            </div>
                            <button className='w-full md:w-auto mt-4 px-8 py-2 bg-green text-white rounded-sm ml-auto'
                                type='submit' 
                                disabled={isSubmitting}
                            >
                                Avançar
                            </button>
                        </form> 
                    </FormProvider> 
                </div> 
            </div>
            <ErrorModal 
                isOpen={isError} 
                setIsOpen={setIsError} 
                title="Erro ao criar conta"
                message="Não foi possível criar"
            />
        </main>
    ); 
}