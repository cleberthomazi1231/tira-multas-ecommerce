'use client';

import { useEffect, useState } from 'react';

export default function InstanceType() {
    const [instance, setInstance] = useState('Defesa Prévia');   

    useEffect(() => {
        if(!instance) return; 
        localStorage.setItem('@TIRAMULTA:INSTANCE', instance);
    }, [instance]);

    return (
        <div className='w-full flex flex-col gap-2 mt-4'>
            <p className='font-bold'>Em qual instância quer recorrer?</p>
            <div className='w-full flex flex-col md:flex-row gap-4'>
                <label className='flex items-center gap-2 text-sm'>
                    <input 
                        type="radio" 
                        name="instance_type" 
                        value="Defesa Prévia"
                        onChange={(e) => setInstance(e.currentTarget.value)}   
                        checked={instance === 'Defesa Prévia'}
                    />
                        Defesa Prévia
                </label>

                <label className='flex items-center gap-2 text-sm'>
                    <input 
                        type="radio" 
                        name="instance_type" 
                        value="Recurso Jari"
                        onChange={(e) => setInstance(e.currentTarget.value)}   
                        checked={instance === 'Recurso Jari'}
                    />
                        Recurso Jari
                </label>

                <label className='flex items-center gap-2 text-sm'>
                    <input 
                        type="radio" 
                        name="instance_type" 
                        value="Recurso CETRAN"
                        onChange={(e) => setInstance(e.currentTarget.value)}   
                        checked={instance === 'Recurso CETRAN'}
                    />
                        Recurso CETRAN
                </label>
            </div>

            <div className='w-full px-2 py-1 bg-lightYellow border-2 border-yellow rounded-sm'>
                <p className='font-bold text-sm'>Verifique na multa ou consulte no site do Detran</p>
            </div>
        </div>
    );
}