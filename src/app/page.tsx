import Image from 'next/image';

import FAQ from '@core/shared/components/FAQ';
import { getAllResources } from '@core/shared/services/ResourceService';
import Contact from '@core/shared/components/Contact';
import SearchHome from '@core/shared/components/SearchHome';

export default async function Home() {
    // @CHECK
     const device = {
        type: 'notmobile'
    }

    const resources = await getAllResources();
    
    return (
        <main className="flex flex-col">
            <div id="bg-home" className="w-screen h-[400px] relative">
                <div className="w-screen h-[400px] flex absolute bg-[url('/images/background-home.jpg')] bg-cover -z-10"/>
                <div className="container flex flex-col md:flex-row justify-center items-center h-[400px] py-8 gap-2 md:gap-8">
                    <h1 className="text-yellow text-center text-2xl md:text-4xl lg:text-6xl font-bold">FAÇA VOCÊ MESMO SEUS RECURSOS DE MULTAS DE TRÂNSITO</h1> 
                    {/* <div className="w-full max-w-[400px] h-full h-max-[400px] flex justify-center items-center rounded-sm bg-gray mt-8 md:mt-0">
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/WphCNxs8Hr8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    </div> */}
                </div>
            </div>
            <div className="container flex flex-col items-center gap-4 mt-10">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-yellow">LOCALIZE UM RECURSO PARA O SEU CASO</h1>
                
                <SearchHome data={resources} />

                {device.type !== 'mobile' && (
                    <div className='w-full h-[240px] flex justify-center relative mb-12'>
                        <Image src={'/images/seja-parceiro.jpg'} fill alt="Seja Parceiro"/>
                    </div>
                )}
                <FAQ />
                <Contact /> 
            </div>
        </main>
    );
}
  