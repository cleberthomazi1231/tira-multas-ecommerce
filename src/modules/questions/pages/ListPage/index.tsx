import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { Divider, Flex, Icon, Stack, Text, useToast } from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import apiBackend from '../../../../shared/apis';
import Button from '../../../../shared/components/Button';
import Form from '../../../../shared/components/Form';

const QuestionsListPage: React.FC = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const formRef = useRef<FormHandles>(null);

    const [questions, setQuestions] = useState([] as any);

    const FIELDS = [
        {
            name: 'Pergunta',
            maxWidth: '100%'
        },
        {
            name: 'Ação',
            maxWidth: '120px'
        }
    ];

    const handleDelete = useCallback(async (id: string) => {
        apiBackend.delete(`/questions/${id}`).then(response => {
            const { status } = response;
            if (status === 200) {
                toast({
                    title: 'Pergunta Removida',
                    description: '',
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                });

                setQuestions(oldState => {
                    return oldState.filter(state => state.id !== id);
                });
            }
        });
    }, []);

    useEffect(() => {
        apiBackend.get('/questions').then(response => {
            const { status, data } = response;
            if (status === 200) setQuestions(data);
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
                            Listagem de Perguntas
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
                                onClick={() =>
                                    navigate('/perguntas-e-respostas/novo')
                                }
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
                            {questions.map(question => (
                                <Flex key={question.id} width="100%" py="8px">
                                    <Flex width="100%" maxWidth="100%">
                                        <Text>{question.value}</Text>
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
                                                        `/perguntas-e-respostas/atualizar/${question.id}`
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
                                                    handleDelete(question.id)
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

export default QuestionsListPage;
