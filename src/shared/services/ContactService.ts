import { API_URL } from '../constants';

export async function sendContact(data: any): Promise<number> {
    const response = await fetch(`${API_URL}/contact`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data),
    });
    return response.status;
}