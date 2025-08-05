import { create } from 'zustand';
import { Resource } from '../services/ResourceService';

type Cart = {
    cart: {
        items: Resource[]
    },
    addToCart: (resource: Resource) => void;
    getCart: () => Cart;
    removeToCart: () => void;
}

export const useCart = create<Cart>((set, get) => ({
    cart: {
        items: []
    },
    addToCart: (item: Resource) => {
        const data = {
            cart: {
                items: [item]
            }
        };
        localStorage.setItem('@ec-tiramulta:cart', JSON.stringify(data));
        return set(() => (data));
    },
    getCart() {
        if(!get().cart) {
            const data = localStorage.getItem('@ec-tiramulta:cart');
            if(!data) return;
            return JSON.parse(data);
        }
        return get();
    },
    removeToCart: () => set(() => ({ cart: {
        items: []
    }}))
}));