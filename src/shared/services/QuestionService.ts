import { API_URL } from '../constants';

type Question = {
    id: string;
    value: string;
    answer: string;
}

export async function getAllQuestions(): Promise<Question[]> {
    const response = await fetch(`${API_URL}/questions`, {
        cache: 'no-store'
    });
    if(response.status !== 200) return [];
    return response.json();
} 