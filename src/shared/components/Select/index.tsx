import React, { useEffect, useRef } from 'react';

import {
    Flex,
    Text,
    Select as ChakraSelect,
    SelectProps
} from '@chakra-ui/react';
import { useField } from '@unform/core';

interface IProps extends SelectProps {
    name: string;
    label?: string;
}

const Select: React.FC<IProps> = ({
    name,
    width = '100%',
    label,
    maxWidth = '100%',
    children,
    ...rest
}) => {
    const selectRef = useRef<HTMLSelectElement>(null);

    const { fieldName, error, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            path: 'value',
            setValue(ref: any, value: string) {
                ref.setSelectValue(value);
            },
            clearValue(ref: any) {
                ref.setSelectValue('');
            }
        });
    }, [error, fieldName, registerField]);

    return (
        <Flex width={width} maxWidth={maxWidth} flexDirection="column">
            {label && (
                <Text fontSize="12px" fontWeight="500" mb="4px">
                    {label}
                </Text>
            )}
            <ChakraSelect
                ref={selectRef}
                name={name}
                borderRadius="4px"
                borderColor="gray.100"
                focusBorderColor="gray.100"
                size="sm"
                mb="16px"
                {...rest}
            >
                {children}
            </ChakraSelect>
        </Flex>
    );
};

export default Select;
