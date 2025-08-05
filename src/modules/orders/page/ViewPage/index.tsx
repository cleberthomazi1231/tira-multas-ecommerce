import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Flex, Text } from '@chakra-ui/react';

import apiBackend from '../../../../shared/apis';
import TextUtils from '../../../../shared/utils/TextUtils';

const ViewOrderPage: React.FC = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        apiBackend.get(`/sales/${id}`).then(response => {
            const { status, data } = response;
            if (status === 200) {
                setOrder(data);
            }
        });
    }, []);

    return (
        order && (
            <Flex
                width="100%"
                flexDirection="column"
                backgroundColor="white"
                px="16px"
                py="24px"
            >
                <Flex width="100%" flexWrap="wrap">
                    <Flex
                        width="48%"
                        flexDirection="column"
                        fontWeight="medium"
                    >
                        <Text>{`Código: ${String(order.id)
                            .substring(0, 8)
                            .toUpperCase()}`}</Text>

                        <Text>{`Data: ${format(
                            parseISO(order.created_at),
                            'dd/MM/yy'
                        )}`}</Text>
                        <Text>{`Cliente: ${order.buyer.name}`}</Text>
                        <Text>{`Telefone: ${order.buyer.telephone}`}</Text>
                        <Text>{`E-mail: ${order.buyer.email}`}</Text>
                        <Text>{`CEP: ${order.buyer.zipcode}`}</Text>
                        <Text>{`Estado: ${order.buyer.uf}`}</Text>
                        <Text>{`Cidade: ${order.buyer.city}`}</Text>
                        <Text>{`Bairro: ${order.buyer.neighborhood}`}</Text>
                        <Text>{`Rua: ${order.buyer.street}`}</Text>
                    </Flex>
                    <Flex
                        width="48%"
                        flexDirection="column"
                        fontWeight="medium"
                    >
                        <Text>{`Status: ${TextUtils.convertEventStatus(
                            order.status
                        )}`}</Text>
                    </Flex>
                    <Flex width="100%" flexDirection="column" mt="24px">
                        <Flex
                            justifyContent="space-between"
                            fontWeight="medium"
                        >
                            <Text width="33%">{`Produto`}</Text>
                            <Text width="33%">{`QTD.`}</Text>
                            <Text width="33%">{`Valor`}</Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text width="33%">{`${order.resource.name}`}</Text>
                            <Text width="33%">{`1x`}</Text>
                            <Text width="33%">{`R$ ${order.resource.value}`}</Text>
                        </Flex>
                    </Flex>
                    <Flex width="100%" justifyContent="flex-end">
                        <Text
                            fontSize="xl"
                            fontWeight="500"
                        >{`Total R$ ${order.resource.value}`}</Text>
                    </Flex>
                </Flex>
            </Flex>
        )
    );
};

export default ViewOrderPage;
