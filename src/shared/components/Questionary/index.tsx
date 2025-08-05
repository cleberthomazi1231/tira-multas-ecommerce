'use client';

import axios from 'axios';

import { useCallback, useEffect, useMemo, useState } from 'react';
import ErrorModal from '../ErrorModal';
import { useRouter } from 'next/navigation';
import ReactSelect from 'react-select';
import optionsSelect from './orgaos.json';

export default function Questionary({ resource }: any) {
    const router = useRouter();

    const [fields, setFields] = useState(resource.fields);
    const [questions, setQuestions] = useState([]);
    const filtredFields = useMemo(() => ['{{ CODIGO_ARTIGO }}', '{{ CODIGO_FICHA }}'], []);

    const [isError, setIsError] = useState(false);

    const isComplete = useMemo(() => {
        const response = questions.filter((field: any) =>
            field.response === '' || field.response === undefined || field.response === null
        );
        return response.length === 0;
    }, [questions]);

    useEffect(() => {
        const instance = localStorage.getItem('@TIRAMULTA:INSTANCE');
        setFields((oldFields: any) => {
            const newState = oldFields.map((field: any) => {
                if(field.flag.includes('INSTANCIA')) {
                    return {
                        ...field,
                        response: instance
                    };
                }
                return field;
            });
            return [...newState];
        });
    }, []);

    useEffect(() => {
        if(fields.length === 0) return;

        const data = fields.filter((field: any) => 
            resource.document.includes(field.flag) && !filtredFields.includes(field.flag));

        setQuestions(data);
    }, [fields, filtredFields, resource.document]);

    const handleChangeField = useCallback((flag: string, value: string) => {
        setFields((oldFields: any) => {
            const newState = oldFields.map((field: any) => {
                if(field.flag.includes(flag)) {
                    return {
                        ...field,
                        response: value
                    };
                    
                }
                return field;
            });
            return [...newState];
        });
    }, []);

    const handleSetOpenFied = useCallback((flag: string, value: string) => {
        setFields((oldFields: any) => {
            const newState = oldFields.map((field: any) => {
                if(field.flag.includes(flag)) {
                    return {
                        ...field,
                        open_field: value
                    };
                    
                }
                return field;
            });
            return [...newState];
        });
    }, []);

    const handleFinish = useCallback(() => {
        if(!isComplete) {
            setIsError(true);
            return;
        }
        router.push('/criar-conta');
    }, [isComplete, router]);

    const handleUploadFile = useCallback((event: any, flag: string) => {
        const formData = new FormData();
        
        const file = event.target.files[0];
        console.log(file);

        formData.append(
            'file',
            file,
            file.name
        );

        axios.post('https://sandbox.env.eflorista.com.br/api/v1/pages/upload', formData)
            .then((response) => {
                const { status, data } = response;
                if(status === 200) {
                    const { location } = data;
                    setFields((oldFields: any) => {
                        const newState = oldFields.map((field: any) => {
                            if(field.flag.includes(flag)) {
                                return {
                                    ...field,
                                    photo: location
                                };
                                
                            }
                            return field;
                        });
                        return [...newState];
                    });
                }
            });
    }, []);


    useEffect(() => {
        if(!fields) return;
        localStorage.setItem('@TIRAMULTA:FIELDS', JSON.stringify(fields));
    }, [fields]);

    return (
        <div className="container w-full flex flex-col">
            <div className='w-full flex flex-col bg-white p-4'>
                <h1 className='text-lg font-bold'>RESPONDA AS PERGUNTAS ABAIXO</h1>
                <div className='w-full flex flex-col bg-white gap-4'>
                    {questions.map((question: any) => (
                        <div key={question} className='w-full flex flex-col'>
                            <p>{question.field}</p>
                            {question.flag === '{{ ORGAO_AUTUADOR }}' && (
                                <div
                                    className='w-full flex justify-between'
                                >
                                    <div
                                        className='w-full flex flex-col mb-3'
                                    >
                                        <ReactSelect
                                            isSearchable
                                            name="orgao_autuador"
                                            options={optionsSelect.map((item: any) => {
                                                return {
                                                    label: item.value,
                                                    value: item.value,
                                                };
                                            })}
                                            onChange={(e: any) =>
                                                handleChangeField(
                                                    'ORGAO_AUTUADOR',
                                                    e.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                            {(question.type === 'TEXT' && question.flag !== '{{ ORGAO_AUTUADOR }}') && (
                                <textarea   
                                    className='w-full h-[100px] border-gray border-solid border-[1px] focus:outline-none rounded-sm px-4 py-2 mt-2' 
                                    onChange={(e) => handleChangeField(question.flag, e.target.value)} 
                                />   
                            )}
                            {(question.type === 'SELECT' || question.type === 'MULTISELECT') && question.options.map((option: any) => ( 
                                <div key={`${question.field}${option.value}`} className='w-full flex  flex-col'>
                                    <label  className='flex items-center gap-2 text-sm'>
                                        <input 
                                            type="radio" 
                                            value={option.value}
                                            name={question.field}
                                            onChange={(e) => handleChangeField(question.flag, e.target.value)}
                                        />
                                        {option.value} 
                                    </label>   
                                    <div className='w-full'>
                                        {(fields.find((field: any) => field.flag.includes(question.flag))?.response === option.value && option.relation === 'OPEN_FIELD') && (
                                            <textarea   
                                                className='w-full h-[100px] border-gray border-solid border-[1px] focus:outline-none rounded-sm px-4 py-2 mt-2' 
                                                onChange={(e) => handleSetOpenFied(question.flag, e.target.value)} 
                                            /> 
                                        )}
                                        {(fields.find((field: any) => field.flag.includes(question.flag))?.response === option.value && option.relation === 'PHOTO') && (
                                            <input type='file' onChange={(e) => handleUploadFile(e, question.flag)} /> 
                                        )}
                                    </div>  
                                </div>  
                            ))}
                            
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='w-full flex justify-end bg-white p-4'>
                <button type="button" className='px-8 py-2 bg-green text-white rounded-sm' onClick={() => handleFinish()}>
                            Avançar
                </button>
            </div>
            <ErrorModal 
                isOpen={isError} 
                setIsOpen={setIsError} 
                title="Preencha todos os campos"
                message="Responda o questionário para prosseguir"
            />
        </div>
    );
}