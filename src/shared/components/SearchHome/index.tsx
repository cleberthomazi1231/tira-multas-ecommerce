'use client';

import { useEffect, useMemo, useState } from 'react';
import ResourceCard from '../ResourceCard';
import StringUtils from '@core/shared/utils/StringUtils';
import { Resource } from '@core/shared/services/ResourceService';
import { useForm } from 'react-hook-form';

interface IProps {
    data: Resource[]
}

export default function SearchHome({ data }: IProps) {
    const [resources, setResources] = useState(data);

    const formatedData = useMemo(() => {
        return data.map((item) => {
            return {
                ...item,
                description: item.description.toLowerCase().trim(),
            };
        });
    }, [data]);
    
    const form = useForm();
    const { watch, register } = form;
    const value = watch('search');

    useEffect(() => {
        const query = String(value).toLocaleLowerCase().trim();
        if(!query || query.length < 3) {
            setResources(data);
        } else {
            let filtredData = formatedData.filter((item) => item.fields.find((item) => (item.flag === '{{ CODIGO_ARTIGO }}' && item.options[0]?.value?.includes(query)) || (item.flag === '{{ CODIGO_FICHA }}' && item.options[0]?.value?.includes(query))) || item.description.includes(query));
            filtredData = filtredData.map((item) => {
                return data.find((dataItem) => dataItem.id === item.id) as any;
            });
            setResources(filtredData);
        }
    }, [data, value, formatedData]);

    return (
        <div className="w-full flex flex-col">
            <div className="w-full">
                <input className="w-full focus:outline-none px-8 py-4 text-lg font-bold rounded-sm border-gray border-solid" 
                    placeholder="Pesquisar um Recurso"
                    {...register('search')}
                />
            </div>

            <div className='w-full flex flex-wrap justify-center gap-6 my-12'> 
                {resources.map((resource) => (
                    <ResourceCard 
                        key={resource.id} 
                        id={resource.id}
                        title={resource.type} 
                        photo={resource.photo}
                        description={resource.name} 
                        article={StringUtils.getResourceFlagValue(resource, 'CODIGO_ARTIGO')}
                        code={StringUtils.getResourceFlagValue(resource, 'CODIGO_FICHA')}
                    />
                ))}
            </div>
        </div>
    );
}