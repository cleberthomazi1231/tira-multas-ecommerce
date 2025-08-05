import React, { useEffect, useRef } from 'react';

import { Checkbox as ChakraCheckbox, CheckboxProps } from '@chakra-ui/react';
import { useField } from '@unform/core';

const Checkbox: React.FC<CheckboxProps> = ({
    name,
    value,
    isChecked,
    size = 'md',
    children,
    ...rest
}) => {
    const inputRef = useRef<CheckboxProps>(null);

    const { fieldName, error, registerField } = useField(name as string);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return (
        <ChakraCheckbox
            size={size}
            variantColor="green"
            value={value}
            isChecked={isChecked}
            isInvalid={!!error}
            {...rest}
        >
            {children}
        </ChakraCheckbox>
    );
};

export default Checkbox;
