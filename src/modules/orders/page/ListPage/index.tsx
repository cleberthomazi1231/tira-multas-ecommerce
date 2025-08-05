import { format, parseISO } from 'date-fns';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiEye, FiFileText, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import apiBackend from '../../../../shared/apis';
import Form from '../../../../shared/components/Form';
import Input from '../../../../shared/components/Input';
import TextUtils from '../../../../shared/utils/TextUtils';

const OrdersListPage: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const [defaultOrders, setDefaultOrders] = useState<any[]>([]);

    const FIELDS = [
        {
            name: 'Código',
            maxWidth: '100%'
        },
        {
            name: 'Cliente',
            maxWidth: '100%'
        },
        {
            name: 'Revendedor',
            maxWidth: '100%'
        },
        {
            name: 'Status',
            maxWidth: '100%'
        },
        {
            name: 'Valor',
            maxWidth: '100%'
        },
        {
            name: 'Dia/Hora',
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
                setOrders(() => {
                    const updatedStates = defaultOrders.filter(state =>
                        String(state.buyer.name)
                            .toLowerCase()
                            .includes(value.toLowerCase())
                    );
                    return [...updatedStates];
                });
            } else {
                setOrders(defaultOrders);
            }
        },
        [defaultOrders]
    );

    const handleChangeDate = useCallback(
        async (value: string) => {
            if (value) {
                setOrders(() => {
                    const date = new Date(value);
                    const updatedStates = defaultOrders.filter(
                        state => new Date(state.created_at) >= date
                    );
                    return [...updatedStates];
                });
            } else {
                setOrders(defaultOrders);
            }
        },
        [defaultOrders]
    );

    useEffect(() => {
        apiBackend.get('/sales').then(response => {
            const { status, data } = response;
            if (status === 200) {
                setOrders(data);
                setDefaultOrders(data);
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
                            Listagem de Vendas
                        </Text>
                    </Flex>

                    <Flex mt="16px">
                        <Flex
                            mr="16px"
                            width="260px"
                            justifyContent="space-between"
                            backgroundColor="white"
                            alignItems="center"
                            position="relative"
                        >
                            <Input
                                name="search"
                                label="Cliente"
                                placeholder=""
                                mb="0px"
                                onChange={e =>
                                    handleSearch(e.currentTarget.value)
                                }
                            />

                            <Icon
                                as={FiSearch}
                                position="absolute"
                                right="8px"
                                top="30px"
                                color="green.500"
                            />
                        </Flex>

                        <Flex
                            mr="16px"
                            width="260px"
                            justifyContent="space-between"
                            backgroundColor="white"
                            alignItems="center"
                            position="relative"
                        >
                            <Input
                                label="Período"
                                name="search"
                                type="date"
                                placeholder="Pesquisar por Nome"
                                mb="0px"
                                onChange={e =>
                                    handleChangeDate(e.currentTarget.value)
                                }
                            />
                        </Flex>
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
                            {orders.map(item => (
                                <Flex key={item} width="100%" py="8px">
                                    <Text
                                        width="100%"
                                        maxWidth="100%"
                                    >{`${String(item.id)
                                        .substring(0, 8)
                                        .toUpperCase()}`}</Text>
                                    <Flex width="100%" maxWidth="100%">
                                        <Text>{item.buyer.name}</Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="100%">
                                        <Text>{item.dealer.name}</Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="100%">
                                        <Text>
                                            {TextUtils.convertEventStatus(
                                                item.status
                                            )}
                                        </Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="100%">
                                        <Text>
                                            {TextUtils.formatCurrency(
                                                Number(item.total_value)
                                            )}
                                        </Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="100%">
                                        <Text>
                                            {format(
                                                parseISO(item.created_at),
                                                'dd/MM/yy - HH:mm'
                                            )}
                                        </Text>
                                    </Flex>

                                    <Flex width="100%" maxWidth="120px">
                                        <Stack direction="row">
                                            <Flex
                                                width="24px"
                                                height="24px"
                                                color="yellow.500"
                                                justifyContent="center"
                                                alignItems="center"
                                                title="Baixar Documento"
                                                cursor="pointer"
                                                borderRadius="50%"
                                                //onClick={() => navigate(`/Orderss/${Orders.id}`)}
                                            >
                                                <a
                                                    href={`https://app.recursofacil.com.br/sales/${item.id}/pdf`}
                                                    download={`${item.id}.pdf`}
                                                    target="_blank"
                                                >
                                                    <Icon
                                                        as={FiFileText}
                                                        fontSize="18px"
                                                        color="black"
                                                    />
                                                </a>
                                            </Flex>

                                            <Flex
                                                width="24px"
                                                height="24px"
                                                color="yellow.500"
                                                justifyContent="center"
                                                alignItems="center"
                                                title="Visualizar Pedido"
                                                cursor="pointer"
                                                borderRadius="50%"
                                                onClick={() =>
                                                    navigate(
                                                        `/vendas/${item.id}/visualizar`
                                                    )
                                                }
                                            >
                                                <Icon
                                                    as={FiEye}
                                                    fontSize="18px"
                                                    color="black"
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

export default OrdersListPage;
