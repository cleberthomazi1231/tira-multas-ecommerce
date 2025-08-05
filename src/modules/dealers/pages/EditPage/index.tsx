import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z, ZodError } from 'zod';

import { Flex, Text, useToast } from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import apiBackend from '../../../../shared/apis';
import Button from '../../../../shared/components/Button';
import Form from '../../../../shared/components/Form';
import Input from '../../../../shared/components/Input';
import Select from '../../../../shared/components/Select';

const DealerEditPage: React.FC = () => {
    const { id } = useParams();
    const formRef = useRef<FormHandles>(null as any);
    const toast = useToast();
    const navigate = useNavigate();

    const [dealer, setDealer] = useState(null as any);

    const handleSearchCEP = useCallback(async () => {
        if (!formRef.current) return;
        const cepRaw = formRef.current.getFieldValue('zipcode');
        const cep = cepRaw.replace(/\D/g, '');

        const { data } = await axios.get(
            `https://viacep.com.br/ws/${cep}/json`
        );

        if (!data.erro) {
            formRef.current.getFieldRef('state').value = data.uf;
            formRef.current.getFieldRef('city').value = data.localidade;
            formRef.current.getFieldRef('street').value = data.logradouro;
            formRef.current.getFieldRef('neighborhood').value = data.bairro;
            formRef.current.getFieldRef('number').value = '';
            formRef.current.getFieldRef('complement').value = data.complemento;
        }
    }, [formRef]);

    const handleSubmit = useCallback(() => {
        try {
            const data = formRef.current?.getData() as any;

            const schema = z.object({
                name: z.string().min(1, { message: 'Nome obrigatório' }),
                document: z
                    .string()
                    .min(1, { message: 'CPF/CNPJ obrigatório' }),
                office_name: z.optional(z.string()),
                telephone: z
                    .string()
                    .min(1, { message: 'Telefone obrigatório' }),
                email: z
                    .string()
                    .min(1, 'Email obrigatório')
                    .email('Digite um email válido'),
                login: z.string().min(1, { message: 'Login obrigatório' }),
                password: z.string().min(1, { message: 'Senha obrigatório' }),
                plan: z.string().min(1, { message: 'Plano obrigatório' })
            });

            schema.parse(data);

            apiBackend
                .put(`/dealers/${id}`, {
                    name: data.name,
                    document: data.document,
                    office_name: data.office_name,
                    telephone: data.telephone,
                    email: data.email,
                    login: data.login,
                    password: data.password,
                    plan: data.plan,
                    address: {
                        zipcode: data.zipcode,
                        state: data.state,
                        city: data.city,
                        neighborhood: data.neighborhood,
                        street: data.street,
                        number: data.number,
                        complement: data.complement
                    }
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

                        navigate('/revendedores');
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
        apiBackend.get(`/dealers/${id}`).then(response => {
            const { status, data } = response;
            if (status === 200) setDealer(data);
        });
    }, []);

    return (
        <Form ref={formRef}>
            {dealer && (
                <Flex width="100%" flexDirection="column">
                    <Flex
                        width="100%"
                        flexDirection="column"
                        color="gray.900"
                        backgroundColor="white"
                        p="32px"
                    >
                        <Text fontWeight="600" fontSize="14px" mb="13px">
                            Atualizar Revendedor
                        </Text>

                        <Flex
                            width="100%"
                            justifyContent="space-between"
                            flexDirection={['column', 'column', 'row']}
                        >
                            <Flex
                                width={['100%', '100%', '48%']}
                                flexDirection="row"
                            >
                                <Flex
                                    width="100%"
                                    justifyContent="space-between"
                                    flexDirection={'column'}
                                >
                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="name"
                                            label="Nome Completo/Razão Social"
                                            isRequired
                                            defaultValue={dealer.name}
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="office_name"
                                            label="Nome do Escritório"
                                            defaultValue={dealer.office_name}
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Select
                                            name="state"
                                            label="Estado"
                                            placeholder="Selecione um estado"
                                            defaultValue={dealer?.address.state}
                                        >
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">
                                                Distrito Federal
                                            </option>
                                            <option value="ES">
                                                Espírito Santo
                                            </option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">
                                                Mato Grosso
                                            </option>
                                            <option value="MS">
                                                Mato Grosso do Sul
                                            </option>
                                            <option value="MG">
                                                Minas Gerais
                                            </option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">
                                                Pernambuco
                                            </option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">
                                                Rio de Janeiro
                                            </option>
                                            <option value="RN">
                                                Rio Grande do Norte
                                            </option>
                                            <option value="RS">
                                                Rio Grande do Sul
                                            </option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">
                                                Santa Catarina
                                            </option>
                                            <option value="SP">
                                                São Paulo
                                            </option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">
                                                Tocantins
                                            </option>
                                            <option value="EX">
                                                Estrangeiro
                                            </option>
                                        </Select>
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="street"
                                            label="Rua"
                                            defaultValue={
                                                dealer?.address.street
                                            }
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="complement"
                                            label="Complemento"
                                            defaultValue={
                                                dealer?.address.complement
                                            }
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="telephone"
                                            label="Telefone"
                                            isRequired
                                            placeholder="(__) _____-____"
                                            defaultValue={dealer.telephone}
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="login"
                                            label="Login"
                                            isRequired
                                            defaultValue={dealer.login}
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="plan"
                                            label="Plano"
                                            isRequired
                                            defaultValue={dealer.plan}
                                        />
                                    </Flex>
                                </Flex>
                            </Flex>

                            <Flex
                                width={['100%', '100%', '48%']}
                                flexDirection="column"
                            >
                                <Flex
                                    width="100%"
                                    justifyContent="space-between"
                                    flexDirection={'column'}
                                >
                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="document"
                                            label="CPF/CNPJ"
                                            isRequired
                                            defaultValue={dealer.document}
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="zipcode"
                                            label="CEP"
                                            onChange={() => handleSearchCEP()}
                                            placeholder="_____-___"
                                            defaultValue={
                                                dealer?.address.zipcode
                                            }
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="city"
                                            label="Cidade"
                                            defaultValue={dealer?.address.city}
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="number"
                                            label="Nº"
                                            defaultValue={
                                                dealer?.address.number
                                            }
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="neighborhood"
                                            label="Bairro"
                                            defaultValue={
                                                dealer?.address.neighborhood
                                            }
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="email"
                                            label="E-mail"
                                            isRequired
                                            defaultValue={dealer.email}
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Input
                                            name="password"
                                            label="Senha"
                                            type="password"
                                            isRequired
                                            defaultValue={dealer.password}
                                        />
                                    </Flex>

                                    <Flex width={'100%'} flexDirection="column">
                                        <Select
                                            name="status"
                                            label="Status da Conta"
                                            defaultValue={dealer.status}
                                        >
                                            <option value="Ativado">
                                                Ativado
                                            </option>
                                            <option value="Desativado">
                                                Desativado
                                            </option>
                                        </Select>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>

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
            )}
        </Form>
    );
};

export default DealerEditPage;
