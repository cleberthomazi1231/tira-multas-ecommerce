import { API_URL } from '../constants';

export type Buyer = {
    id: string;
    name: string,
    last_name: string;
    document: string;
    telephone: string;
    email: string;
    password: string;
    zipcode: string;
    uf: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    complement: string;
}

export async function authBuyer(data: any): Promise<any | undefined> {
    const response = await fetch(`${API_URL}/auth/buyer`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    });
    if(response.status !== 200) return;
    return response.json();
}

export async function createBuyer(buyer: Buyer): Promise<Buyer | undefined> {
    const response = await fetch(`${API_URL}/buyers`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(buyer)
    });
    if(response.status !== 201) return;
    return response.json();
} 

export async function getMyOrders(buyerId: string): Promise<any[]> {
    const response = await fetch(`${API_URL}/buyers/${buyerId}/sales`, {
        cache: 'no-store'
    });
    if(response.status !== 200) return [];
    return response.json();
} 