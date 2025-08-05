'use client';
import Link from 'next/link';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiTrash2 } from 'react-icons/fi';
import { BiHomeAlt } from 'react-icons/bi';
import StringUtils from '@core/shared/utils/StringUtils';
import { useCallback, useEffect, useState } from 'react';
import { Form } from '@core/shared/components/Form';
import { useCart } from '@core/shared/hooks/useCart';
import NumberUtils from '@core/shared/utils/NumberUtils';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { DEFAULT_DEALER, PUBLIC_KEY_ID } from '@core/shared/constants';
import { Sale, buySale } from '@core/shared/services/SaleService';
import { useAuth } from '@core/shared/hooks/useAuth';
import MercadoPagoUtils from '@core/shared/utils/MercadoPagoUtils';
import PaymentModal from '@core/shared/components/PaymentModal';

const paymentCreditcardSchema = z.object({
    holder_name: z.string().nonempty({
        message: 'Campo obrigatório'
    }),
    holder_document: z.string().nonempty({
        message: 'Campo obrigatório'
    }),
    creditcard_number: z.string().nonempty({
        message: 'Campo obrigatório'
    }).transform((value) => StringUtils.onlyNumber(value)),
    date: z.string().nonempty({
        message: 'Campo obrigatório'
    }),
    cvv: z.string().nonempty({
        message: 'Campo obrigatório'
    })
});

const paymentSchema = z.discriminatedUnion(
    'type',
    [
        z.object({
            type: z.literal('PIX')
        }),
        z.object({
            type: z.literal('CREDITCARD'),
        }).merge(paymentCreditcardSchema)
    ]
);

type PaymentData = z.infer<typeof paymentSchema>;

export default function CheckoutPage() {
    const router = useRouter();
    const { getCart, removeToCart } = useCart();
    const {  getUser } = useAuth();
    const form = useForm<PaymentData>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            type: 'CREDITCARD' 
        }
    });
    const { register, handleSubmit, watch, formState: { isSubmitting }} = form;
    const paymentType = watch('type');
    const [isError, setIsError] = useState(false);

    const onSubmit = useCallback(async(data: PaymentData) => {
        try {
            let userData: any = getUser();
            if(!userData) {
                userData = localStorage.getItem('@ec-tiramulta:user');
                if(!userData) return;
                userData = JSON.parse(userData);
            }
            console.log(userData);
            const resourceDataRaw = localStorage.getItem('@TIRAMULTA:FIELDS');
            if(!resourceDataRaw) return;
            const resourceData = JSON.parse(resourceDataRaw);

            const sale: Sale = {
                dealer_id: DEFAULT_DEALER as string,
                resource_id: getCart().cart.items[0].id,
                buyer_id: userData.id,
                payment_data: {
                    type: data.type
                },
                resource_data: resourceData
            };

            if(data.type === 'CREDITCARD') {
                const expirationCardDate = data.date.split('/');

                const dataMercadoPago = {
                    card: {}
                };

                dataMercadoPago.card = {
                    document: data.holder_document,
                    cardholder_name: data.holder_name,
                    card_number: data.creditcard_number,
                    security_code: data.cvv,
                    expiration_month: expirationCardDate[0],
                    expiration_year: expirationCardDate[1]
                };
                
                const mercadopagoResponse = await MercadoPagoUtils.validateCreditcardData(dataMercadoPago);

                if (!mercadopagoResponse.isError) {
                    sale.payment_data.token = mercadopagoResponse.token;
                    sale.payment_data.card_number = data.creditcard_number.replace(/\D/g, '');
                } else {
                    setIsError(true);
                    console.log(mercadopagoResponse);
                }
                const result: any = await buySale(JSON.stringify(sale) as any);
                if(!result || result?.status === 'DENIED') 
                    setIsError(true);
                else 
                    router.push('/meus-pedidos');
            } else {
                const result = await buySale(JSON.stringify(sale) as any);
                console.log(result);
                if(!result) return;
                router.push(`/efetue-pagamento/${result.id}`);
            }
        } catch (e: any) {
            console.log('error', e);
            setIsError(true);
        }
    }, [getCart, getUser, router]);

    const handleremovetocart = useCallback(() => {
        removeToCart();
        router.push('/');
    }, [removeToCart, router]);

    useEffect(() => {
        if(!getUser()) 
            router.push('/');

        setTimeout(() => {
            (window as any).Mercadopago?.setPublishableKey(PUBLIC_KEY_ID);
        }, 3000);
    }, [getCart, getUser, router]);

    return (
        <main className="flex flex-col">
            <Script src='https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js' />
            <div className='container w-full flex items-center gap-2 py-4 text-black text-xs'>
                <Link href="/"><BiHomeAlt className='mb-[2px]'/></Link>
                <span>{'>'}</span>
                <span>Carrinho</span>
                <span>{'>'}</span>
                <Link href="/">Voltar</Link>
            </div>
            <div className="container w-full flex">
                <div className='w-full flex flex-col bg-white p-4'>
                    <div className='w-full flex flex-col gap-2'>
                        <p className='font-bold'>Carrinho</p>
                        <div className='<w-full flex justify-between bg-yellow font-bold text-xs px-4 py-1 rounded-sm'>
                            <span>Recurso</span>
                            <span>Valor</span>
                            <span></span>
                        </div>
                        {getCart()?.cart?.items.map((item) => (
                            <div key={item.id} className='w-full flex flex-col gap-2'>
                                <div className='w-full flex justify-between items-center text-xs px-2 py-1'>
                                    <span className='w-full max-w-[120px]'>{item.description}</span>
                                    <span>{NumberUtils.formatCurrency(item.value)}</span>
                                    <span 
                                        className='cursor-pointer' 
                                        title='Remover'
                                        onClick={() => handleremovetocart()}
                                    >
                                        <FiTrash2 className='text-red'/>
                                    </span>
                                </div>
                                <div className='w-full flex justify-between items-center text-xs px-4 py-1 bg-lightGray'>
                                    <div className='w-full flex flex-col font-bold items-end'>
                                        <span>{`Valor dos Recursos: ${NumberUtils.formatCurrency(item.value)}`}</span>
                                        <span>Desconto: R$ 0,00</span>
                                        <span className='text-green'>{`Total a pagar: ${NumberUtils.formatCurrency(item.value)}`}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <FormProvider {...form}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='w-full flex justify-center'>
                                    <div className='w-full max-w-[400px] flex flex-col gap-4'>
                                        <div className='w-full flex gap-4 mt-4'>
                                            <label
                                                className={`w-full flex justify-center items-center cursor-pointer border border-green rounded-sm px-4 py-2 ${paymentType === 'CREDITCARD' ? 'bg-green text-white' : 'bg-white text-green'}`}
                                                htmlFor='creditcard'
                                            >
                                                <input id="creditcard" type='radio' hidden value='CREDITCARD' {...register('type') } />
                                                <span className='text-xs font-bold'>
                                                    CARTÃO DE CRÉDITO
                                                </span>
                                            </label>
                                            <label
                                                className={`w-full flex justify-center items-center cursor-pointer border border-green rounded-sm px-4 py-2 ${paymentType === 'PIX' ? 'bg-green text-white' : 'bg-white text-green'}`}
                                                htmlFor='pix'
                                            >
                                                <input id='pix' type='radio' hidden value='PIX' {...register('type')} />
                                                <span className='text-xs font-bold'>
                                                    PIX
                                                </span>
                                            </label>
                                        </div>
                                        {paymentType === 'CREDITCARD' && (
                                            <div className='w-full flex flex-col gap-4'>
                                                <div className='w-full flex flex-col'>
                                                    <Form.Label htmlFor='holder_name'>Nome igual está escrito no cartão</Form.Label>
                                                    <Form.Input name='holder_name' />
                                                </div>
                                                <div className='w-full flex flex-col'>
                                                    <Form.Label htmlFor='holder_document'>CPF do titular do cartão</Form.Label>
                                                    <Form.InputMask name='holder_document' mask='999.999.999-99' />
                                                </div>
                                                <div className='w-full flex flex-col'>
                                                    <Form.Label htmlFor='creditcard_number'>Nº do cartão</Form.Label>
                                                    <Form.InputMask name='creditcard_number' mask='9999 9999 9999 9999' />
                                                </div>
                                                <div className='w-full flex justify-between'>
                                                    <div className='w-[48%] flex flex-col'>
                                                        <Form.Label htmlFor='date'>Data de validade</Form.Label>
                                                        <Form.InputMask name='date' placeholder='mm/yy' mask='99/99'/>
                                                    </div>
                                                    <div className='w-[48%] flex flex-col'>
                                                        <Form.Label htmlFor='cvv'>CVV</Form.Label>
                                                        <Form.Input name='cvv' />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <button 
                                            className='w-full flex justify-center py-2 bg-green font-bold text-white'
                                            type='submit'
                                            disabled={isSubmitting}
                                        >
                                            CONFIRMAR
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
            <PaymentModal 
                isOpen={isError} 
                setIsOpen={setIsError}
            />
        </main>
    );
}