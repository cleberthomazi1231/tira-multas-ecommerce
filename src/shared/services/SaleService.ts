import { API_URL } from '../constants';

export type Sale = {
    id?: string;
    buyer_id: string;
    resource_id: string;
    dealer_id: string;
    payment_data: {
        type: 'CREDITCARD' | 'PIX',
        token?: string;
        card_number?: string;
    },
    resource_data: any;
}

export async function buySale(sale: Sale): Promise<Sale | undefined> {
    const response = await fetch(`${API_URL}/sales/buy`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: sale as any
    });
    if(response.status !== 200) return;
    return response.json();
} 

export async function getSaleById(saleId: string): Promise<any | undefined> {
    const response = await fetch(`${API_URL}/sales/${saleId}`, {
        cache: 'no-store'
    });
    if(response.status !== 200) return;
    return response.json();
}