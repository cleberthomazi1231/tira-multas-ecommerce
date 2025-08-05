import { create } from 'zustand';
import { Buyer } from '../services/BuyerService';

type Auth = {
    user: Buyer | null,
    setUser: (data: Buyer) => void;
    getUser: () => Buyer | null
    logout: () => void;
}

export const useAuth = create<Auth>((set, get) => ({
    user: null,
    setUser: (data: Buyer) => set(() => ({ user: data })),
    getUser: () => {
        if(!get().user) {
            return null;
        }

        return get().user;
    },
    logout: () => {
        set(() => ({ user: null }));
    },
}));