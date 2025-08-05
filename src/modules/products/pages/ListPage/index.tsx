import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import apiBackend from '../../../../shared/apis';
import Button from '../../../../shared/components/Button';
import Form from '../../../../shared/components/Form';
import Input from '../../../../shared/components/Input';
import { HTTP_RESPONSE } from '../../../../shared/constants';

const ProductsListPage: React.FC = () => {
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const [resources, setResources] = useState<any[]>([]);
    const [defaultResources, setDefaultResources] = useState<any[]>([]);

    const FIELDS = [
        {
            name: 'Nome',
            maxWidth: '100%'
        },
        {
            name: 'Valor',
            maxWidth: '100%'
        },
        {
            name: 'Ação',
            maxWidth: '120px'
        }
    ];

    const handleSearch = useCallback(
        async (value: string) => {
            if (value && value.length > 3) {
                setResources(() => {
                    const updatedStates = defaultResources.filter(state =>
                        state.name.includes(value)
                    );
                    return [updatedStates];
                });
            } else {
                setResources(defaultResources);
            }
        },
        [defaultResources]
    );

    const handleDelete = useCallback(async (id: string) => {
        apiBackend.delete(`/resources/${id}`).then(response => {
            const { status } = response;
            if (status === HTTP_RESPONSE.STATUS.SUCCESS) {
                setResources(oldState =>
                    oldState.filter(item => item.id !== id)
                );
            }
        });
    }, []);

    useEffect(() => {
        apiBackend.get('/resources').then(response => {
            const { status, data } = response;
            if (status === 200) {
                setResources(data);
                setDefaultResources(data);
            }
        });
    }, []);

    return (
        <Form ref={formRef}>
            <Flex width="100%" flexDirection="column">
                <Flex
                    width="100%"
                    flexDirection="column"
                    backgroundColor="white"
                    p="16px"
                >
                    <Flex width="100%" justifyContent="space-between">
                        <Text fontWeight="600" color="green.500">
                            Listagem de Produtos
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
                                onClick={() => navigate('/produtos/novo')}
                            />
                        </Stack>
                    </Flex>

                    <Flex
                        width="100%"
                        justifyContent="space-between"
                        backgroundColor="white"
                        alignItems="center"
                    >
                        <Input
                            name="search"
                            placeholder="Pesquisar por Nome"
                            maxWidth="400px"
                            mb="0px"
                            onChange={e => handleSearch(e.currentTarget.value)}
                        />
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
                            {resources.map(resource => (
                                <Flex key={resource.id} width="100%" py="8px">
                                    <Flex width="100%" maxWidth="100%">
                                        <Text>{resource.name}</Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="100%">
                                        <Text>{`R$ ${resource.value}`}</Text>
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
                                                        `/produtos/atualizar/${resource.id}`
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
                                                title="Visualizar"
                                                cursor="pointer"
                                                borderRadius="50%"
                                                onClick={() =>
                                                    handleDelete(resource.id)
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

export default ProductsListPage;
