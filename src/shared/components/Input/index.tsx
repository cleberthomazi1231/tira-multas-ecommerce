import React, { useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';

import { Flex, Text, Input as ChakraInput, InputProps } from '@chakra-ui/react';
import { useField } from '@unform/core';

interface IProps extends InputProps {
    name: string;
    label?: string;
    mask?: string;
    formatChars?: {
        [key: string]: string;
    };
    maskChar?: string;
}

const Input: React.FC<IProps> = ({
    name,
    width = '100%',
    maxWidth = '100%',
    mask,
    formatChars,
    maskChar,
    label,
    isRequired,
    ...rest
}) => {
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
        <Flex width={width} maxWidth={maxWidth} flexDirection="column">
            <Flex>
                {label && (
                    <Text fontSize="12px" fontWeight="500" mb="4px">
                        {label}
                    </Text>
                )}

                {isRequired && (
                    <Text
                        ml="4px"
                        fontSize={rest.fontSize ? rest.fontSize : '12px'}
                        fontWeight="500"
                        color="red.500"
                    >
                        *
                    </Text>
                )}
            </Flex>

            <InputMask
                formatChars={formatChars}
                mask={mask}
                value={rest.value}
                onChange={rest.onChange}
                onBlur={rest.onBlur}
                maskChar={maskChar}
            >
                {(inputProps: any) => (
                    <ChakraInput
                        ref={inputRef}
                        name={name}
                        borderRadius="4px"
                        borderColor="gray.100"
                        focusBorderColor="gray.100"
                        size="sm"
                        mb="16px"
                        {...rest}
                        {...inputProps}
                    />
                )}
            </InputMask>
        </Flex>
    );
};

export default Input;
