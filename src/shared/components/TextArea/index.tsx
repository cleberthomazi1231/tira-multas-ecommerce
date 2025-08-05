import React, { useEffect, useRef } from 'react';

import {
    Flex,
    Text,
    Textarea as ChakraTextarea,
    TextareaProps
} from '@chakra-ui/react';
import { useField } from '@unform/core';

interface IProps extends TextareaProps {
    name: string;
    label?: string;
}

const TextArea: React.FC<IProps> = ({
    name,
    width = '100%',
    label,
    ...rest
}) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

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
        <Flex width={width} flexDirection="column">
            {label && (
                <Text fontSize="12px" fontWeight="500" mb="4px">
                    {label}
                </Text>
            )}
            <ChakraTextarea
                ref={inputRef}
                name={name}
                borderRadius="4px"
                borderColor="gray.100"
                focusBorderColor="gray.100"
                size="sm"
                mb="16px"
                {...rest}
            />
        </Flex>
    );
};

export default TextArea;
