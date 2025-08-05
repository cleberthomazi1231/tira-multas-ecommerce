import Link from 'next/link';
import { BiHomeAlt } from 'react-icons/bi';
import SalesList from '@core/shared/components/SalesList';

export default async function MyOrders() {
    return (
        <main className="flex flex-col">
            <div className='container w-full flex items-center gap-2 py-4 text-black text-xs'>
                <Link href="/"><BiHomeAlt className='mb-[2px]'/></Link>
                <span>{'>'}</span>
                <span>Meus Pedidos</span>
                <span>{'>'}</span>
                <Link href="/">Voltar</Link>
            </div>
            <div className="container w-full flex flex-col">
                <div className='w-full flex flex-col bg-white p-4'>
                    <h1 className='text-lg font-bold'>Meus Pedidos</h1>
                    <SalesList  />
                </div>
            </div>
        </main>
    );
}
  