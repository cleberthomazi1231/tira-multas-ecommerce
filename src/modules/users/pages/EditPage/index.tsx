import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z, ZodError } from 'zod';

import { Flex, Text, useToast } from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import apiBackend from '../../../../shared/apis';
import Button from '../../../../shared/components/Button';
import Checkbox from '../../../../shared/components/Checkbox';
import Form from '../../../../shared/components/Form';
import Input from '../../../../shared/components/Input';

const UserEditPage: React.FC = () => {
    const { id } = useParams();
    const formRef = useRef<FormHandles>(null);
    const toast = useToast();
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [permissions, setPermissions] = useState<string[]>([]);

    const handleChangePermissions = useCallback((value: string) => {
        setPermissions(oldState => {
            let newState = [...oldState];

            if (newState.includes(value))
                newState = newState.filter(item => item !== value);
            else newState.push(value);
            return newState;
        });
    }, []);

    const handleSubmit = useCallback(() => {
        try {
            const data = formRef.current?.getData() as any;

            const schema = z.object({
                name: z.string().min(1, { message: 'Nome obrigatório' }),
                telephone: z
                    .string()
                    .min(1, { message: 'Telefone obrigatório' }),
                email: z.string().email({ message: 'Email obrigatório' })
            });

            schema.parse(data);

            apiBackend
                .put(`/users/${id}`, {
                    ...data,
                    permissions: permissions.includes('Admin')
                        ? 'Admin'
                        : 'Default'
                })
                .then(response => {
                    const { status } = response;

                    if (status === 200) {
                        toast({
                            title: 'Registro Atualizado',
                            description: '',
                            status: 'success',
                            duration: 4000,
                            isClosable: true
                        });

                        navigate('/usuarios');
                    } else {
                        toast({
                            title: 'Ocorreu um erro',
                            description: '',
                            status: 'error',
                            duration: 4000,
                            isClosable: true
                        });
                    }
                });
        } catch (err) {
            if (err instanceof ZodError) {
                toast({
                    title: 'Preencha corretamente',
                    description: err.errors[0].message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                });
            }
        }
    }, [formRef, permissions]);

    useEffect(() => {
        apiBackend.get(`/users/${id}`).then(response => {
            const { status, data } = response;
            if (status === 200) {
                setUser(data);
                setPermissions(data.permissions);
            }
        });
    }, [id]);

    return (
        <Form ref={formRef}>
            {user && (
                <Flex width="100%" flexDirection="column">
                    <Flex
                        width="100%"
                        flexDirection="column"
                        color="gray.900"
                        backgroundColor="white"
                        p="32px"
                    >
                        <Text fontWeight="500" fontSize="14px" mb="13px">
                            Novo Usuário
                        </Text>

                        <Flex
                            width="100%"
                            justifyContent="space-between"
                            flexDirection={['column', 'column', 'row']}
                        >
                            <Flex
                                width={['100%', '100%', '48%']}
                                flexDirection="column"
                            >
                                <Flex
                                    width="100%"
                                    justifyContent="space-between"
                                    flexDirection={['column', 'column', 'row']}
                                    flexWrap="wrap"
                                >
                                    <Flex
                                        width={['100%', '100%', '48%']}
                                        flexDirection="column"
                                    >
                                        <Input
                                            name="name"
                                            label="Nome"
                                            defaultValue={user.name}
                                        />
                                    </Flex>

                                    <Flex
                                        width={['100%', '100%', '48%']}
                                        flexDirection="column"
                                    >
                                        <Input
                                            name="telephone"
                                            label="Telefone"
                                            defaultValue={user.telephone}
                                        />
                                    </Flex>

                                    <Flex
                                        width={['100%', '100%', '48%']}
                                        flexDirection="column"
                                    >
                                        <Input
                                            name="email"
                                            label="Email"
                                            defaultValue={user.email}
                                        />
                                    </Flex>

                                    <Flex
                                        width={['100%', '100%', '48%']}
                                        flexDirection="column"
                                    >
                                        <Input
                                            name="password"
                                            label="Senha"
                                            type="password"
                                        />
                                    </Flex>

                                    <Flex
                                        width="100%"
                                        fontWeight="400"
                                        gap="16px"
                                    >
                                        <Checkbox
                                            name="p1"
                                            onChange={() =>
                                                handleChangePermissions('Admin')
                                            }
                                            isChecked={permissions.includes(
                                                'Admin'
                                            )}
                                            colorScheme="green"
                                        >
                                            <Text fontSize="14px">
                                                Admnistrador
                                            </Text>
                                        </Checkbox>
                                        <Checkbox
                                            name="p2"
                                            onChange={() =>
                                                handleChangePermissions(
                                                    'Default'
                                                )
                                            }
                                            isChecked={permissions.includes(
                                                'Default'
                                            )}
                                            colorScheme="green"
                                        >
                                            <Text fontSize="14px">
                                                Apenas Visualizar
                                            </Text>
                                        </Checkbox>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex width="100%" justifyContent="center" mt="24px">
                            <Button
                                title="Cadastrar"
                                backgroundColor="green.500"
                                color="white"
                                width="160px"
                                borderRadius="4px"
                                py="8px"
                                onClick={() => handleSubmit()}
                            />
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </Form>
    );
};

export default UserEditPage;
