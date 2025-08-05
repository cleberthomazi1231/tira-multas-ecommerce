import { API_URL } from '../constants';

export type Resource = {
    id: string;
    name: string;
    description: string;
    type: string;
    article: string;
    code: string;
    value: number;
    photo: string;
    fields: any[]
}

export async function getAllResources(): Promise<Resource[]> {
    const response = await fetch(`${API_URL}/resources`, {
        cache: 'no-store'
    });
    if(response.status !== 200) return [];
    return response.json();
}

export async function getResourceById(id: string): Promise<Resource | undefined> {
    const response = await fetch(`${API_URL}/resources/${id}`, {
        cache: 'no-store'
    });
    if(response.status !== 200) return;
    return response.json();
}