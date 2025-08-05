import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

interface IProps {
    title: string;
    value: string;
    color: string;
    customContent?: any;
}

const Card: React.FC<IProps> = ({ title, value, color, customContent }) => {
    return (
        <Flex
            minWidth="256px"
            flexDirection="column"
            backgroundColor="white"
            py="16px"
            px="16px"
            mb="16px"
            mr="16px"
            _last={{
                mr: '0px'
            }}
        >
            <Text fontWeight="600">{title}</Text>

            {customContent ? (
                customContent
            ) : (
                <Text fontWeight="600" fontSize="40px" color={color}>
                    {value}
                </Text>
            )}
        </Flex>
    );
};

export default Card;
