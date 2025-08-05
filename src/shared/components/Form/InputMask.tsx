import { useFormContext } from 'react-hook-form';
import InputMask, { Props } from 'react-input-mask';

interface InputMaskProps extends Props {
    name: string;
}

export default function Input({ name, ...rest }: InputMaskProps) {
    const { register, formState: { errors } } = useFormContext<{ [key: string]: string }>();

    return (
        <div className='w-full flex flex-col'>
            <InputMask
                className='w-full px-2 py-1 text-sm border border-gray rounded-sm focus:outline-none'
                alwaysShowMask={false}
                {...register(name)}
                {...rest}
            />

            {errors[name] && (
                <span className='font-bold text-red text-xs'>{errors[name]?.message}</span>
            )}
        </div>
    );
}