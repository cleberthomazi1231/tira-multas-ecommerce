import React, { useCallback } from 'react';
import {
    FiBook,
    FiGrid,
    FiLogOut,
    FiPackage,
    FiShoppingCart,
    FiUser,
    FiUserPlus,
    FiX
} from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

import { Flex, Box, Icon, Text, Stack, Image } from '@chakra-ui/react';

import { useLayout } from '../../hooks/layout';

const SideMenu: React.FC = () => {
    const { setUser, setShowMenu } = useLayout();
    const navigate = useNavigate();
    const location = useLocation();

    const MENU = [
        {
            title: 'Dashboard',
            icon: FiGrid,
            link: '/dashboard',
            submenus: []
        },
        {
            title: 'Revendedores',
            icon: FiUserPlus,
            link: '/revendedores',
            submenus: []
        },
        {
            title: 'Produtos/Recursos',
            icon: FiPackage,
            link: '/produtos',
            submenus: []
        },
        {
            title: 'Perguntas Frequentes',
            icon: FiBook,
            link: '/perguntas-e-respostas',
            submenus: []
        },
        {
            title: 'Vendas',
            icon: FiShoppingCart,
            link: '/vendas',
            submenus: []
        },
        {
            title: 'Usuários',
            icon: FiUser,
            link: '/usuarios',
            submenus: []
        }
    ];

    const handleClickMenu = useCallback((item: any) => {
        navigate(item.link);
        setShowMenu(false);
    }, []);

    const handleLogout = useCallback(() => {
        setShowMenu(false);
        localStorage.clear();
        setUser(null);
        navigate('/login');
    }, []);

    return (
        <Flex
            width="296px"
            height="100vh"
            flexDirection="column"
            boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
            backgroundColor="gray.900"
            position="fixed"
        >
            <Flex
                width="100%"
                justifyContent="center"
                height="80px"
                backgroundColor="black"
                position="relative"
                alignItems="center"
                borderBottom="2px solid"
                borderColor="yellow.500"
            >
                <Box>
                    <Image src="/logo.png" width="200px" />
                </Box>

                <Flex
                    width="24px"
                    height="24px"
                    backgroundColor="yellow.500"
                    justifyContent="center"
                    alignItems="center"
                    position="absolute"
                    top="0"
                    right="0"
                    onClick={() => setShowMenu(false)}
                    display={['flex', 'flex', 'flex', 'none']}
                >
                    <Icon as={FiX} color="white" />
                </Flex>
            </Flex>

            <Stack pl="16px" my="auto">
                {MENU.map(item => (
                    <Flex
                        key={item.title}
                        height="32px"
                        alignItems="center"
                        onClick={() => handleClickMenu(item)}
                        cursor="pointer"
                        backgroundColor={
                            location.pathname === item.link
                                ? 'gray.900'
                                : 'gray.900'
                        }
                        pl="16px"
                    >
                        <Icon as={item.icon} color="yellow.500" mr="8px" />
                        <Text color="gray.100" fontSize="14px">
                            {item.title}
                        </Text>
                    </Flex>
                ))}
                <Flex
                    height="32px"
                    alignItems="center"
                    onClick={() => handleLogout()}
                    cursor="pointer"
                    pl="16px"
                >
                    <Icon as={FiLogOut} color="yellow.500" mr="8px" />
                    <Text color="gray.100" fontSize="14px">
                        Sair
                    </Text>
                </Flex>
            </Stack>
        </Flex>
    );
};

export default SideMenu;
