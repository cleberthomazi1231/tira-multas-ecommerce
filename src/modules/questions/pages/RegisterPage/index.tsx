import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { z, ZodError } from 'zod';

import { Flex, Text, useToast } from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import apiBackend from '../../../../shared/apis';
import Button from '../../../../shared/components/Button';
import Form from '../../../../shared/components/Form';
import Input from '../../../../shared/components/Input';
import TextArea from '../../../../shared/components/TextArea';

const QuestionsRegisterPage: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = useCallback(() => {
        try {
            const data = formRef.current?.getData() as any;

            const schema = z.object({
                value: z.string().min(1, { message: 'Nome obrigatório' }),
                answer: z.string().min(1, { message: 'CPF/CNPJ obrigatório' })
            });

            schema.parse(data);

            apiBackend
                .post('/questions', {
                    value: data.value,
                    answer: data.answer
                })
                .then(response => {
                    const { status } = response;

                    if (status === 201) {
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
    }, [formRef]);

    return (
        <Form ref={formRef}>
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
                                    <Input name="value" label="Pergunta" />
                                </Flex>
                            </Flex>
                        </Flex>

                        <TextArea name="answer" label="Resposta"></TextArea>

                        <Flex width="100%" justifyContent="center" mt="24px">
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
        </Form>
    );
};

export default QuestionsRegisterPage;
