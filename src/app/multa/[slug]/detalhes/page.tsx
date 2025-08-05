import FAQ from '@core/shared/components/FAQ';
import Questionary from '@core/shared/components/Questionary';
import { getResourceById } from '@core/shared/services/ResourceService';
import Link from 'next/link';
import { BiHomeAlt } from 'react-icons/bi';

export default async function MultaDetalhesPage({ params }: { params: any }) {
    const resource: any = await getResourceById(params.slug as string);

    return (
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
            <Questionary  resource={resource} />
            <div className="container flex flex-col items-center gap-4 mt-10">
                <FAQ />
            </div>
        </main>
    );
}
  