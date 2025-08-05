'use client';
import { useCart } from '@core/shared/hooks/useCart';
import { Resource } from '@core/shared/services/ResourceService';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface Props {
    resource: Resource;
}

export default function ButtonAddToCart({ resource }: Props) {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = useCallback(() => {
        addToCart(resource);
        router.push(`/multa/${resource.id}/detalhes`);
    }, [addToCart, resource, router]);

    return (
        <button 
            className='px-8 py-2 bg-green text-white rounded-sm'
            type="button"
            onClick={() => handleAddToCart()}
        >
            Avançar
        </button>
    );
}