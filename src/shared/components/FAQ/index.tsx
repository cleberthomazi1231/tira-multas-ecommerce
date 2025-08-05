import QuestionCard from '../QuestionCard';
import { getAllQuestions } from '@core/shared/services/QuestionService';

export default async function FAQ() {
    const questions = await getAllQuestions();

    return (
        <div className='w-full flex flex-col px-4 py-14 bg-white'>
            <h3 className='text-2xl font-bold text-yellow text-center mb-14'>Dúvidas Frequentes</h3>
            <div className='flex flex-wrap justify-center gap-8'>
                {questions.map((question) => 
                    <QuestionCard key={question.id} question={question.value} answer={question.answer} />)
                }
            </div>
        </div>
    );
}