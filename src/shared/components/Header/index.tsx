import React from 'react';
import { FiMenu } from 'react-icons/fi';

import { Flex, Icon } from '@chakra-ui/react';

import { useLayout } from '../../hooks/layout';

const Header: React.FC = () => {
    const { showMenu, setShowMenu } = useLayout();

    return (
        <Flex
            width="100%"
            height="56px"
            justifyContent="center"
            alignItems="center"
            color="blue.800"
            backgroundColor="white"
            boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
            px="24px"
        >
            <Icon
                as={FiMenu}
                color="orange.500"
                fontSize="24px"
                display={['block', 'block', 'block', 'none']}
                onClick={() => setShowMenu(!showMenu)}
            />
        </Flex>
    );
};

export default Header;
