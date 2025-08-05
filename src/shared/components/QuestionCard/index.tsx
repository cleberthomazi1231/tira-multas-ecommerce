interface Props {
    question: string;
    answer: string;
}

export default function QuestionCard({ question, answer }: Props) {
    return (
        <div className="w-full md:w-[300px] flex flex-col">
            <span className="font-bold text-black mb-4">{question}</span>
            <p>{answer}</p>
        </div>
    );
}