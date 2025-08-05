import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';

interface ResourceProps {
    id: string;
    title: string;
    description: string;
    article: string;
    code: string;
    photo: string;
}

export default function ResourceCard({ id, title, description, article, code, photo }: ResourceProps) {
    const colors: any = {
        'Multa Leve': 'text-green',
        'Multa Média': 'text-yellow',
        'Multa Grave': 'text-orange',
        'Multa Gravíssima': 'text-red'
    };

    useEffect(() => {
        console.log(photo);
    }, [photo]);
 
    return (
        <Link href={`/multa/${id}`} className="w-full sm:w-1/2 md:w-[300px] h-fit flex flex-col  border-gray border-[1px] bg-white rounded-md justify-between items-center cursor-pointer">
            <div className='w-full h-full relative'>
                <div className='w-full h-full flex flex-col justify-between items-center px-3 py-4'>
                    <span className={`${colors[title] || 'text-green'} font-bold`}>{title?.toUpperCase()}</span>

                    {photo && <Image src={photo} alt={description} width={120} height={120} />}

                    <p className={`text-center flex items-center ${!photo ?  'h-[184px]' : 'h-[64px]'}`}>{description}</p>
                    <div className="w-full flex justify-between text-black font-bold">
                        <span>{`Artigo ${article}`}</span>
                        <span>{`CÓD. ${code}`}</span>
                    </div>
                </div>
                <div className='hover:bg-black opacity-0 transition-opacity w-full h-full absolute flex justify-center items-center top-0 hover:opacity-80 rounded-sm'>
                    <div className='flex w-[80px] h-[80px] justify-center items-center rounded-full bg-yellow text-white'>
                        <FiPlus className='text-3xl'/>
                    </div>
                </div>
            </div>
        </Link>
    );
}