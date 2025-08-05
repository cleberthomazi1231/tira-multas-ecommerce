import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Divider, Flex, Icon, Stack, Text, useToast } from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import apiBackend from '../../../../shared/apis';
import Button from '../../../../shared/components/Button';
import Form from '../../../../shared/components/Form';
import Input from '../../../../shared/components/Input';

const DealersListPage: React.FC = () => {
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);
    const toast = useToast();

    const [defaultDealers, setDefaultDealers] = useState<any[]>([]);
    const [dealers, setDealers] = useState<any[]>([]);

    const FIELDS = [
        {
            name: 'Nome',
            maxWidth: '100%'
        },
        {
            name: 'Cidade',
            maxWidth: '100%'
        },
        {
            name: 'Telefone',
            maxWidth: '100%'
        },
        {
            name: 'Status',
            maxWidth: '120px'
        },
        {
            name: 'Plano',
            maxWidth: '120px'
        },
        {
            name: 'Ação',
            maxWidth: '120px'
        }
    ];

    const handleSearch = useCallback(
        async (value: string) => {
            if (value && value.length > 3) {
                setDealers(() => {
                    const updatedStates = defaultDealers.filter(state =>
                        state.name.includes(value)
                    );
                    return [updatedStates];
                });
            } else {
                setDealers(defaultDealers);
            }
        },
        [defaultDealers]
    );

    const handleDelete = useCallback(async (id: string) => {
        apiBackend.delete(`/dealers/${id}`).then(response => {
            const { status } = response;
            if (status === 200) {
                toast({
                    title: 'Revendedor Removido',
                    description: '',
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                });

                setDealers(oldState => {
                    return oldState.filter(state => state.id !== id);
                });

                setDefaultDealers(oldState => {
                    return oldState.filter(state => state.id !== id);
                });
            }
        });
    }, []);

    useEffect(() => {
        apiBackend
            .get('/dealers')
            .then(response => {
                const { status, data } = response;
                if (status === 200) {
                    setDealers(data);
                    setDefaultDealers(data);
                }
            })
            .catch(err => console.log(err));
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
                            Listagem de Revendedores
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
                                onClick={() => navigate('/revendedores/novo')}
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
                            {dealers.map(dealer => (
                                <Flex key={dealer.id} width="100%" py="8px">
                                    <Flex width="100%" maxWidth="100%">
                                        <Text>{dealer.name}</Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="100%">
                                        <Text>{dealer.address?.city}</Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="100%">
                                        <Text>{dealer.telephone}</Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="120px">
                                        <Text>{dealer.status}</Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="120px">
                                        <Text>{dealer.plan}</Text>
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
                                                        `/revendedores/atualizar/${dealer.id}`
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
                                                justifyContent="center"
                                                alignItems="center"
                                                title="Visualizar"
                                                cursor="pointer"
                                                borderRadius="50%"
                                                onClick={() =>
                                                    handleDelete(dealer.id)
                                                }
                                            >
                                                <Icon
                                                    as={FiTrash}
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

export default DealersListPage;
