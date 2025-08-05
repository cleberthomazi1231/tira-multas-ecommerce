import React from 'react';

import { Flex, FlexProps, Text } from '@chakra-ui/react';

interface IProps extends FlexProps {
    title: string;
}

const Button: React.FC<IProps> = ({
    title,
    width = '100%',
    backgroundColor = 'gray.500',
    borderRadius = '10px',
    py = '4px',
    ...rest
}) => {
    return (
        <Flex
            width={width}
            justifyContent="center"
            alignItems="center"
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            py={py}
            cursor="pointer"
            fontWeight="500"
            {...rest}
        >
            <Text>{title}</Text>
        </Flex>
    );
};

export default Button;
