'use client';
import { API_URL } from '@core/shared/constants';
import NumberUtils from '@core/shared/utils/NumberUtils';
import StringUtils from '@core/shared/utils/StringUtils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';

export default function SalesList() {
    const [sales, setSales] = useState<any[]>([]);

    const router = useRouter();

    const loadData = useCallback(async (buyerId: string) => {
        const response = await fetch(`${API_URL}/buyers/${buyerId}/sales`);
        if(response.status !== 200) return;
        const data = await response.json();
        setSales(data);
    }, []);

    useEffect(() => {
        const data = localStorage.getItem('@ec-tiramulta:user');
        if(!data) return;
        const user = JSON.parse(data);
        if(!user)
            router.push('/');
        else
            loadData(user.id);
    }, [loadData, router]);
   
    return (
        <div className="w-full flex flex-col">
            <div className='w-full flex justify-between bg-gray text-green font-bold px-2'>
                <span>Nº do Pedido</span>
                <span>Status</span>
                <span>Valor</span>
                <span>Data</span>
            </div>
            {sales.length <= 0 && (
                <div className='w-full flex py-2'>
                    <span className='font-medium text-lg'>Nenhum pedido encontrado</span>
                </div>
            )}
            {sales.map((sale) => (
                <div key={sale.id} className='w-full flex flex-col justify-between items-center px-4 py-2 border-b-[1px] border-gray text-sm'>
                    <div className='w-full flex justify-between'>
                        <span>{String(sale.id).substring(0, 6)}</span>
                        <span>{StringUtils.convertStatus(sale.status)}</span>
                        <span>{NumberUtils.formatCurrency(sale.total_value)}</span>
                        <span>{Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'short'
                        }).format(new Date(sale.created_at))}</span>
                    </div>
                    <div className='w-full flex gap-4 mt-2 text-xs'>
                        <Link className='flex gap-2 font-bold bg-yellow text-white py-2 px-4 rounded-sm items-center'
                            href={`${API_URL}/sales/${sale.id}/pdf/preview`} download target='_blank'
                        >
                            <span>Baixar Prévia</span>
                            <FiDownload />
                        </Link>
                        {sale.status === 'APPROVED' && (
                            <Link className='flex gap-2 font-bold bg-green text-white py-2 px-4 rounded-sm items-center'
                                href={`${API_URL}/sales/${sale.id}/pdf`} download target='_blank'
                            >
                                <span>Baixar Documento</span>
                                <FiDownload />
                            </Link>
                        )}
                        
                        <Link className='flex gap-2 font-bold bg-black text-white py-2 px-4 rounded-sm items-center'
                            href={`/alterar-dados/${sale.id}`} 
                        >
                            <span>Alterar Dados</span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}