import { useFormContext } from 'react-hook-form';

interface InputProps {
    name: string;
    type?: string;
}

export default function Input({ name, type = 'text' }: InputProps) {
    const { register, formState: { errors } } = useFormContext<{ [key: string]: string }>();

    return (
        <div className='w-full flex flex-col'>
            <input 
                className='w-full px-2 py-1 text-sm border border-gray rounded-sm focus:outline-none'
                type={type}
                {...register(name)} 
            />
            
            {errors[name] && (
                <span className='font-bold text-red text-xs'>{errors[name]?.message}</span>
            )}
        </div>
    );
}