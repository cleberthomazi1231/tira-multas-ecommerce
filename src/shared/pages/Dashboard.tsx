import { format, parseISO } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { FiEdit, FiEye, FiFileText } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react';

import apiBackend from '../apis';
import Card from '../components/Card';
import Form from '../components/Form';
import TextUtils from '../utils/TextUtils';

const Dashboard: React.FC = () => {
    const formRef = useRef();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
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

    const FIELDS2 = [
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

    useEffect(() => {
        apiBackend.get('/dealers').then(response => {
            const { status, data } = response;
            if (status === 200) {
                setDealers(data);
            }
        });

        apiBackend.get('/sales').then(response => {
            const { status, data } = response;
            if (status === 200) {
                setOrders(data);
            }
        });
    }, []);

    return (
        <Flex width="100%" flexDirection="column">
            <Flex
                width="100%"
                flexWrap={['nowrap', 'nowrap', 'nowrap', 'wrap']}
                overflow="auto"
                minHeight={'140px'}
            >
                <Card
                    title="Revendedores Ativos"
                    value={String(dealers.length)}
                    color="blue.500"
                />

                <Card
                    title="Revendedores Inativos"
                    value={'0'}
                    color="blue.500"
                />
                <Card
                    title="Total de Vendas 30 dias"
                    value={`R$ 0,00`}
                    color="blue.500"
                />
            </Flex>

            <Flex
                width="100%"
                flexDirection="column"
                backgroundColor="white"
                p="16px"
                mt="24px"
            >
                <Flex width="100%" justifyContent="space-between">
                    <Text fontWeight="600" color="black">
                        Últimos Revendedores Cadastrados
                    </Text>
                </Flex>

                <Divider my="16px" />

                <Flex width="100%" flexDirection="column" overflow="auto">
                    <Flex width="100%" color="blue.500">
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
                </Flex>
                <Flex width="100%" flexDirection="column" fontSize="14px">
                    {dealers.map(dealer => (
                        <Flex key={dealer.id} width="100%" py="8px">
                            <Flex width="100%" maxWidth={FIELDS[0].maxWidth}>
                                <Text>{dealer.name}</Text>
                            </Flex>

                            <Flex width="100%" maxWidth={FIELDS[1].maxWidth}>
                                <Text>{dealer.address.city}</Text>
                            </Flex>

                            <Flex width="100%" maxWidth={FIELDS[2].maxWidth}>
                                <Text>{dealer.telephone}</Text>
                            </Flex>

                            <Flex width="100%" maxWidth={FIELDS[3].maxWidth}>
                                <Text>{dealer.status}</Text>
                            </Flex>

                            <Flex width="100%" maxWidth={FIELDS[4].maxWidth}>
                                <Text>{dealer.plan}</Text>
                            </Flex>

                            <Flex
                                width="100%"
                                maxWidth={FIELDS[4].maxWidth}
                                height="24px"
                                color="yellow.500"
                                alignItems="center"
                                title="Visualizar"
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
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            <Form ref={formRef}>
                <Flex width="100%" flexDirection="column" mt="24px">
                    <Flex
                        width="100%"
                        flexDirection="column"
                        backgroundColor="white"
                        p="16px"
                    >
                        <Flex width="100%" justifyContent="space-between">
                            <Text fontWeight="600" color="green.500">
                                Últimas Vendas
                            </Text>
                        </Flex>

                        <Divider my="16px" />

                        <Flex
                            width="100%"
                            flexDirection="column"
                            overflowX="auto"
                        >
                            <Flex width="100%">
                                {FIELDS2.map(field => (
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
                                            <Stack
                                                direction="row"
                                                justifyItems="center"
                                            >
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
        </Flex>
    );
};

export default Dashboard;
