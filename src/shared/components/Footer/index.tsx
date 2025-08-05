import { Cambay } from 'next/font/google';
import Image from 'next/image';

const cambay = Cambay({ 
    subsets: ['latin'],
    weight: ['700']
});


export default function Footer() {
    return (
        <footer className="flex w-full h-40 flex-col justify-between items-center mt-auto py-4">
            <ul className={`flex gap-1 md:gap-4 text-md ${cambay.className}`}>
            </ul>

            <div className='flex flex-col items-center  md:flex-row'>
                <Image src={'/images/formas-pagamento.png'} width={300} height={32} alt="Formas de Pagamento" />
                <Image src={'/images/selo-seguro.png'} width={80} height={32} alt="Site Seguro" />
            </div>

            <span className='text-[#A4A4A4] text-xs'>todos os direitos reservados @ Tira Multa</span>
        </footer>
    );
}