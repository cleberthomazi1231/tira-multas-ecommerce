import Footer from '@core/shared/components/Footer';
import './globals.css';
import Header from '@core/shared/components/Header';
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({ 
    subsets: ['latin'],
    weight: ['400', '500', '600', '700']
});

const roboto = Roboto({ 
    subsets: ['latin'],
    weight: ['400', '500', '700']
});

export const metadata = {
    title: 'Tira Multa',
    description: 'Tire suas multas online',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // @CHECK
    const device = {
        type: 'notmobile'
    }

    return (
        <html lang="pt-br">
            <body className={`bg-[#F2F2F2] ${inter.className} ${roboto.className}`}>
                <Header device={device}/>
                {children}
                <Footer />
            </body>
        </html>
    );
}
