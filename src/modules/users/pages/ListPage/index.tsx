import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react';

import apiBackend from '../../../../shared/apis';
import Button from '../../../../shared/components/Button';
import Form from '../../../../shared/components/Form';
import { HTTP_RESPONSE } from '../../../../shared/constants';

const UserListPage: React.FC = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState<any[]>([]);

    const FIELDS = [
        {
            name: 'Nome',
            maxWidth: '100%'
        },
        {
            name: 'Email',
            maxWidth: '100%'
        },
        {
            name: 'Tipo de Usuário',
            maxWidth: '100%'
        },
        {
            name: 'Ação',
            maxWidth: '120px'
        }
    ];

    const handleDelete = useCallback(async (id: string) => {
        apiBackend.delete(`/users/${id}`).then(response => {
            const { status } = response;
            if (status === HTTP_RESPONSE.STATUS.SUCCESS) {
                setUsers(oldState => oldState.filter(item => item.id !== id));
            }
        });
    }, []);

    useEffect(() => {
        apiBackend.get('/users').then(response => {
            const { status, data } = response;
            if (status === HTTP_RESPONSE.STATUS.SUCCESS) {
                setUsers(data);
            }
        });
    }, []);

    return (
        <Form>
            <Flex width="100%" flexDirection="column">
                <Flex
                    width="100%"
                    flexDirection="column"
                    backgroundColor="white"
                    p="16px"
                >
                    <Flex width="100%" justifyContent="space-between">
                        <Text fontWeight="600" color="green.500">
                            Listagem de Usuários
                        </Text>

                        <Stack direction="row">
                            <Button
                                title="+ Cadastrar Novo"
                                backgroundColor="green.500"
                                color="white"
                                width="192px"
                                minWidth="192px"
                                borderRadius="4px"
                                py="8px"
                                fontSize="14px"
                                onClick={() => navigate('/usuarios/novo')}
                            />
                        </Stack>
                    </Flex>

                    <Divider my="16px" />

                    <Flex width="100%" flexDirection="column" overflowX="auto">
                        <Flex width="100%">
                            {FIELDS.map(field => (
                                <Flex
                                    key={field.name}
                                    width="100%"
                                    maxWidth={field.maxWidth}
                                    fontSize="14px"
                                    fontWeight="600"
                                >
                                    <Text>{field.name}</Text>
                                </Flex>
                            ))}
                        </Flex>
                        <Flex
                            width="100%"
                            flexDirection="column"
                            fontSize="14px"
                        >
                            {users.map(user => (
                                <Flex key={user.id} width="100%" py="8px">
                                    <Flex width="100%" maxWidth="100%">
                                        <Text>{user.name}</Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="100%">
                                        <Text>{user.email}</Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="100%">
                                        <Text>Admin</Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="120px">
                                        <Stack direction="row">
                                            <Flex
                                                width="24px"
                                                height="24px"
                                                color="white"
                                                justifyContent="center"
                                                alignItems="center"
                                                title="Editar"
                                                cursor="pointer"
                                                borderRadius="50%"
                                                onClick={() =>
                                                    navigate(
                                                        `/usuarios/atualizar/${user.id}`
                                                    )
                                                }
                                            >
                                                <Icon
                                                    as={FiEdit}
                                                    fontSize="18px"
                                                    color="yellow.500"
                                                />
                                            </Flex>

                                            <Flex
                                                width="24px"
                                                height="24px"
                                                color="white"
                                                justifyContent="center"
                                                alignItems="center"
                                                title="Excluir"
                                                cursor="pointer"
                                                borderRadius="50%"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                            >
                                                <Icon
                                                    as={FiTrash2}
                                                    fontSize="18px"
                                                    color="red.500"
                                                />
                                            </Flex>
                                        </Stack>
                                    </Flex>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Form>
    );
};

export default UserListPage;
