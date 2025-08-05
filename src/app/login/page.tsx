import Login from '@core/shared/components/Login';
import Link from 'next/link';
import { BiHomeAlt } from 'react-icons/bi';

export default function LoginPage() {
    return (
        <main className="flex flex-col">
            <div className='container w-full flex items-center gap-2 py-4 text-black text-xs'>
                <Link href="/"><BiHomeAlt className='mb-[2px]'/></Link>
                <span>{'>'}</span>
                <span>Login</span>
                <span>{'>'}</span>
                <Link href="/">Voltar</Link>
            </div>
            <div className="container w-full flex">
                <div className='w-full flex flex-col bg-white p-4'>
                    <div className='w-full flex flex-col px-4 md:px-8 py-4 gap-1'>
                        <h1 className='font-bold text-lg text-center'>Login ou criar uma conta</h1>
                        <Login />
                    </div>
                </div>
            </div>
        </main>
    );
}
  