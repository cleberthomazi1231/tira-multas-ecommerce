'use client';
import { Cambay } from 'next/font/google';
import { BiMenu } from 'react-icons/bi';

import Link from 'next/link';
import UserIcon from '../Icons/User';
import { useAuth } from '@core/shared/hooks/useAuth';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const cambay = Cambay({ 
    subsets: ['latin'],
    weight: ['700']
}); 

export default function Header({ device }: any) {
    const { getUser, logout } = useAuth();
    const user = getUser(); 
    const router = useRouter();

    const handleLogout = useCallback(() => {
        logout();
    }, [logout]);

    useEffect(() => {
        if(!user)
            router.push('/');
    }, [router, user]);


    return (
        <header className="flex w-full h-16 justify-between items-center bg-white">
            <nav className='flex container justify-between items-center'>
                <Link href="/">
                    <Image src="/images/logo.png" width={120} height={60} alt="TiraMulta" />
                </Link>

                {device.type !== 'mobile' && (
                    <ul className={`flex gap-4 items-center text-md ${cambay.className}`}>
                        <li><Link href="/">Início</Link></li>
                        <li><Link href="https://revendedor.tiramulta.com.br/login" target='_blank'>Área do Parceiro</Link></li>
                        <li>
                            <Link className='flex gap2' 
                                href={user ? '/meus-pedidos' : '/login'}>
                                <UserIcon size={20} />
                                <div className='flex items-center gap-3'>
                                    <span className='text-yellow text-sm'>{user ? `Olá ${user.name}` : 'Fazer Login'}</span>
                                    {user && (<span className="cursor-pointer" onClick={() => handleLogout()}>Sair</span>)}
                                </div>
                            </Link>
                            
                        </li>
                    </ul>
                )}

                {device.type === 'mobile' && (
                    <BiMenu className='text-yellow' size={24} />
                )} 
            </nav>
        </header>
    );
}