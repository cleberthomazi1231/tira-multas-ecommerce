import { useFormContext } from 'react-hook-form';

interface Props {
    name: string;
}

export default function SelectStatesOfBrazil({ name }: Props) {
    const { register, formState: { errors } } = useFormContext<{ [key: string]: string }>();

    return (
        <div className='w-full flex flex-col'>
            <select 
                className='w-full px-2 py-1 text-sm border border-gray rounded-sm focus:outline-none'
                {...register(name)}
            >
                <option value="">Selecione um Estado</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espirito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MT">Mato Grosso</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
            </select>

            {errors[name] && (
                <span className='font-bold text-red text-xs'>{errors[name]?.message}</span>
            )}
        </div>
    );
}