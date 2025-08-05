import React from 'react';
import { useLocation } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import { useLayout } from '../../hooks/layout';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import SideMenu from '../SideMenu';

const LayoutPanel: React.FC<any> = ({ component }) => {
    const { setShowMenu } = useLayout();

    const location = useLocation();

    return location.pathname !== '/login' ? (
        <Flex width="100%" minHeight="100vh" backgroundColor="gray.100">
            <Flex display={['none', 'none', 'none', 'flex']}>
                <SideMenu />
            </Flex>

            <MobileMenu />

            <Flex
                width={['100%', '100%', 'calc(100%-296px)']}
                ml={['0px', '0px', '0px', '296px']}
                flexDirection="column"
            >
                <Header />

                <Flex width="100%" p="24px" onClick={() => setShowMenu(false)}>
                    {component}
                </Flex>
            </Flex>
        </Flex>
    ) : (
        component
    );
};

export default LayoutPanel;
