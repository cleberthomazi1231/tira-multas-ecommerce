import React, { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, Box, Stack, Image } from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import apiBackend from '../../../../shared/apis';
import Button from '../../../../shared/components/Button';
import Form from '../../../../shared/components/Form';
import Input from '../../../../shared/components/Input';
import { useLayout } from '../../../../shared/hooks/layout';

const LoginPage: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const navigate = useNavigate();
    const { setUser } = useLayout();

    const handleSubmit = useCallback(() => {
        const data = formRef.current?.getData();

        apiBackend.post('/auth/user', data).then(response => {
            const { status, data } = response;
            if (status === 200) {
                localStorage.setItem(
                    '@tiramulta:session',
                    JSON.stringify({
                        token: data.token,
                        user: data.user
                    })
                );

                apiBackend.defaults.headers[
                    'authorization'
                ] = `Bearer ${data.token}`;

                setUser(data.user);

                navigate('/dashboard');
            }
        });
    }, [formRef]);

    useEffect(() => {
        const session = localStorage.getItem('@tiramulta:session');
        if (session) navigate('/dashboard');
    }, []);

    return (
        <Flex
            width="100vw"
            height="100vh"
            backgroundColor="black"
            justifyContent="center"
            alignItems="center"
            px={['8px', '16px', '24px']}
        >
            <Form ref={formRef} onSubmit={() => null}>
                <Flex
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Flex
                        width="100%"
                        maxWidth="496px"
                        height="496px"
                        backgroundColor="white"
                        borderRadius="10px"
                        boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
                        flexDirection="column"
                        alignItems="center"
                        px={['32px', '32px', '80px']}
                    >
                        <Box my="24px">
                            <Image src="/logo.png" width="200px" />
                        </Box>

                        <Stack width="100%" flexDirection="column" spacing="4">
                            <Input name="login" label="E-mail" />

                            <Input
                                name="password"
                                label="Senha"
                                type="password"
                            />
                        </Stack>

                        <Button
                            title="Login"
                            backgroundColor="black"
                            mt="32px"
                            fontSize="24px"
                            py="8px"
                            onClick={() => handleSubmit()}
                            color="yellow.500"
                        />
                    </Flex>
                </Flex>
            </Form>
        </Flex>
    );
};

export default LoginPage;
