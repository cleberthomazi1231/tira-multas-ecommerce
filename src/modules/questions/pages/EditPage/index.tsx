import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z, ZodError } from 'zod';

import { Flex, Text, useToast } from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import apiBackend from '../../../../shared/apis';
import Button from '../../../../shared/components/Button';
import Form from '../../../../shared/components/Form';
import Input from '../../../../shared/components/Input';
import TextArea from '../../../../shared/components/TextArea';

const QuestionsEditPage: React.FC = () => {
    const { id } = useParams();
    const formRef = useRef<FormHandles>(null);
    const toast = useToast();
    const navigate = useNavigate();

    const [question, setQuestion] = useState(null as any);

    const handleSubmit = useCallback(() => {
        try {
            const data = formRef.current?.getData() as any;

            const schema = z.object({
                value: z.string().min(1, { message: 'Nome obrigatório' }),
                answer: z.string().min(1, { message: 'CPF/CNPJ obrigatório' })
            });

            schema.parse(data);

            apiBackend
                .put(`/questions/${id}`, {
                    value: data.value,
                    answer: data.answer
                })
                .then(response => {
                    const { status } = response;

                    if (status === 200) {
                        toast({
                            title: 'Cadastro Realizado',
                            description: '',
                            status: 'success',
                            duration: 4000,
                            isClosable: true
                        });

                        navigate('/perguntas-e-respostas');
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
    }, [formRef, id]);

    useEffect(() => {
        apiBackend.get(`/questions/${id}`).then(response => {
            const { status, data } = response;
            if (status === 200) setQuestion(data);
        });
    }, []);

    return (
        <Form ref={formRef}>
            {question && (
                <Flex width="100%" flexDirection="column">
                    <Flex
                        width="100%"
                        flexDirection="column"
                        color="gray.900"
                        backgroundColor="white"
                        p="32px"
                    >
                        <Text fontWeight="600" fontSize="14px" mb="13px">
                            Nova Pergunta
                        </Text>

                        <Flex
                            width="100%"
                            justifyContent="space-between"
                            flexDirection={'column'}
                        >
                            <Flex width={'100%'} flexDirection="row">
                                <Flex
                                    width="100%"
                                    justifyContent="space-between"
                                    flexDirection={'column'}
                                >
                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="value"
                                            label="Pergunta"
                                            defaultValue={question.value}
                                        />
                                    </Flex>
                                </Flex>
                            </Flex>

                            <TextArea
                                name="answer"
                                label="Resposta"
                                defaultValue={question.answer}
                            ></TextArea>

                            <Flex
                                width="100%"
                                justifyContent="center"
                                mt="24px"
                            >
                                <Button
                                    title="Salvar"
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
                </Flex>
            )}
        </Form>
    );
};

export default QuestionsEditPage;
