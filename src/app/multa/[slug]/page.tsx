import FAQ from '@core/shared/components/FAQ';
import Link from 'next/link';
import { BiHomeAlt } from 'react-icons/bi';
import { getResourceById } from '@core/shared/services/ResourceService';
import NumberUtils from '@core/shared/utils/NumberUtils';
import ButtonAddToCart from '@core/shared/components/ButtonAddToCart';
import StringUtils from '@core/shared/utils/StringUtils';
import InstanceType from '@core/shared/components/InstanceType';

const colors: any = {
    'Multa Leve': 'text-green',
    'Multa Razoável': 'text-yellow',
    'Multa Gravíssima': 'text-red'
};

export default async function MultaPage({ params }: any) {
    const resource = await getResourceById(params.slug as string); 

    return resource && (
        <main className="flex flex-col">
            <div className='container w-full flex items-center gap-2 py-4 text-black text-xs'>
                <Link href="/"><BiHomeAlt className='mb-[2px]'/></Link>
                <span>{'>'}</span>
                <span>{resource.type}</span>
                <span>{'>'}</span>
                <span>{resource.description}</span>
                <span>{'>'}</span>
                <Link href="/">Voltar</Link>
            </div>
            <div className="container w-full flex">
                <div className='w-full flex flex-col bg-white p-4'>
                    <div className='w-full flex flex-col bg-lightGray px-4 md:px-8 py-4 gap-1'>
                        <span className={colors[resource.type]}>{resource.type}</span>
                        <h1 className='font-bold'>{resource.description}</h1>
                        <div className='flex flex-col md:flex-row gap-4 text-sm'>
                            <span>{`Artigo: ${StringUtils.getResourceFlagValue(resource, 'CODIGO_ARTIGO')}`}</span>
                            <span>{`Código: ${StringUtils.getResourceFlagValue(resource, 'CODIGO_FICHA')}`}</span>
                            <span>{NumberUtils.formatCurrency(resource.value)}</span>
                        </div>
                        <div className='flex flex-col md:flex-row gap-2 font-bold'>
                            <span>Valor do Recurso:</span>
                            <span className='text-green'>{NumberUtils.formatCurrency(resource.value)}</span>
                        </div>
                    </div>
                    <div className='w-full flex justify-end mt-4'>
                        <ButtonAddToCart resource={resource} />
                    </div>
                </div>
                
            </div>
            <div className="container flex flex-col items-center gap-4 mt-10">
                <FAQ />
            </div>
        </main>
    );
}
  