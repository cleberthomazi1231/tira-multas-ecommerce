import React, { useRef, useEffect, useCallback } from 'react';

import {
    Flex,
    Input as ChakraInput,
    Text,
    InputProps,
    Box
} from '@chakra-ui/react';
import { useField } from '@unform/core';

interface IProps extends InputProps {
    name: string;
    label?: string;
    isRequired?: boolean;
    mask?: string;
    formatChars?: {
        [key: string]: string;
    };
    maskChar?: string;
    badgeErrorColor?: string;
    mb?: string | number;
    type?: 'default' | 'search';
    typeInput?: string;
    badge?: 'currency' | 'porcentage';
    tooltip?: boolean;
    tooltipMessage?: string;
    onEnterPress?: () => void;
    onChange?: () => void;
}

const InputCurrency: React.FC<IProps> = ({
    name,
    label,
    isRequired = false,
    mb = '16px',
    badge = 'currency',
    typeInput = 'text',
    onEnterPress = undefined,
    onChange = null,
    ...rest
}) => {
    const inputRef = useRef<HTMLInputElement>(null as any);

    const { fieldName, error, registerField } = useField(name);

    const handleChange = useCallback(() => {
        const { value } = inputRef.current;

        const formatedValue = parseFloat(
            value
                .replace(/(.*){1}/, '0$1')
                .replace(/[^\d]/g, '')
                .replace(/(\d\d?)$/, '.$1')
        ).toFixed(2);

        inputRef.current.value = Number(formatedValue).toLocaleString('pt-BR', {
            minimumFractionDigits: 2
        });

        if (onChange) {
            onChange();
        }
    }, [onChange]);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });

        const formatedValue = parseFloat(
            inputRef.current.defaultValue
                .replace(/(.*){1}/, '0$1')
                .replace(/[^\d]/g, '')
                .replace(/(\d\d?)$/, '.$1')
        ).toFixed(2);

        inputRef.current.value = Number(formatedValue).toLocaleString('pt-BR', {
            minimumFractionDigits: 2
        });
    }, [error, fieldName, handleChange, registerField]);

    return (
        <Flex width="100%" flexDirection="column" fontWeight="500" mb={mb}>
            {label && (
                <Flex
                    width="100%"
                    textAlign="center"
                    mb="4px"
                    justifyContent="space-between"
                >
                    <Flex fontSize="12px">
                        <Text>{label}</Text>
                        {isRequired && (
                            <Text ml="8px" color="red.500">
                                *
                            </Text>
                        )}
                    </Flex>
                </Flex>
            )}

            <Flex
                width="100%"
                flexDirection="column"
                position="relative"
                flexWrap="wrap"
            >
                {badge && (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="green.500"
                        width="40px"
                        height="100%"
                        position="absolute"
                        left={badge === 'currency' ? '0' : 'none'}
                        right={badge === 'porcentage' ? '0' : 'none'}
                        zIndex={1000}
                    >
                        <Text color="white" fontSize="14px" fontWeight="500">
                            {badge === 'currency' ? 'R$' : '%'}
                        </Text>
                    </Box>
                )}

                <ChakraInput
                    ref={inputRef}
                    name={name}
                    isInvalid={!!error}
                    errorBorderColor="red.500"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="false"
                    type={typeInput}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && onEnterPress) {
                            onEnterPress();
                        }
                    }}
                    textAlign="right"
                    onChange={() => handleChange()}
                    pl={badge === 'currency' ? '48px' : '12px'}
                    pr={badge === 'porcentage' ? '48px' : '12px'}
                    _focus={{
                        outline: 'none'
                    }}
                    {...rest}
                />
            </Flex>
        </Flex>
    );
};

export default InputCurrency;
