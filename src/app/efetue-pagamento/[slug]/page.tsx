/* eslint-disable @next/next/no-img-element */
import ClipboardPix from '@core/shared/components/ClipboardPix';
import { API_URL, PUBLIC_KEY_MERCHANT } from '@core/shared/constants';
import { getSaleById } from '@core/shared/services/SaleService';
import NumberUtils from '@core/shared/utils/NumberUtils';
import axios from 'axios';
import Link from 'next/link';

export default async function EfetuePagamentoPage({ params }: any) {
    const sale = await getSaleById(params.slug as string);
    const [firstName, lastName] = String(sale.buyer.name).trim().split(' ');

    const response = await axios.post('https://api.mercadopago.com/v1/payments', {
        transaction_amount: Number(sale.total_value),
        payment_method_id: 'pix',
        payer: {
            first_name: firstName,
            last_name: lastName,
            email: sale.buyer.email,
            identification: {
                type: 'CPF',
                number: sale.buyer.document
            }
        },
        notification_url: `${API_URL}/mercadopago/${sale.id}` 
    },
    {
        headers: {
            'Authorization': `Bearer ${PUBLIC_KEY_MERCHANT}`
        }
    });

    const mercadoPagoData = response.data; 

    return (
        <div className='w-full h-full flex flex-col justify-center items-center mt-4' >
            <h1 className='text-green text-2xl font-bold mb-2'>
                Escaneie seu QR Code Pix
            </h1>

            <div className='w-[200px] h-[200xp] relative'>
                <img src={`data:image/png;base64, ${mercadoPagoData?.point_of_interaction?.transaction_data?.qr_code_base64}`} 
                    alt="QR Code" 
                />
            </div>

            <div className='flex justify-center uppercase mt-4'>
                <span>Valor a ser pago: </span>
                <span className='ml-2 text-black'>
                    {NumberUtils.formatCurrency(sale.total_value)}
                </span>
            </div>

            {mercadoPagoData && <ClipboardPix mercadoPagoData={mercadoPagoData} />} 

            <Link href="/meus-pedidos" className='w-full flex justify-center text-green font-bold uppercase mt-4'>
                  Ir para meus pedidos
            </Link>

        </div>
    );
}