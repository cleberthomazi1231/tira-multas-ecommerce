import { useEffect, useRef } from 'react';

import { Flex, Text } from '@chakra-ui/react';
import { useField } from '@unform/core';

const InputRadio: React.FC<any> = ({ name, label, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { fieldName, error, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            setValue(ref: any, value: string) {
                ref.setInputValue(value);
            },
            clearValue(ref: any) {
                ref.setInputValue('');
            }
        });
    }, [error, fieldName, registerField]);

    return (
        <Flex alignItems="center" fontSize="12px" gap="4px">
            <input ref={inputRef} name={name} type="radio" {...rest} />
            <Text>{label}</Text>
        </Flex>
    );
};

export default InputRadio;
