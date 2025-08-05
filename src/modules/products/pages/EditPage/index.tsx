import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiCopy, FiEdit, FiX } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { z, ZodError } from 'zod';

import {
    Box,
    Flex,
    Icon,
    Image,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import apiBackend from '../../../../shared/apis';
import Button from '../../../../shared/components/Button';
import Form from '../../../../shared/components/Form';
import Input from '../../../../shared/components/Input';
import InputCurrency from '../../../../shared/components/InputCurrency';
import Select from '../../../../shared/components/Select';
import TextArea from '../../../../shared/components/TextArea';
import TextEditor from '../../../../shared/components/TextEditor';
import ModalEditFlag from '../../components/ModalEditFlag';

const ProductsEditPage: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { id } = useParams();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [resource, setResource] = useState<any>(null);
    const [fields, setFields] = useState<any[]>([
        {
            field: 'Orgão do Autuador',
            type: 'TEXT',
            default: false,
            options: [
                {
                    value: '',
                    anexo: '',
                    relation: 'PARAGRAPH'
                }
            ],
            flag: '{{ ORGAO_AUTUADOR }}',
            edit: true
        },
        {
            field: 'Código do Artigo',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ CODIGO_ARTIGO }}',
            edit: true
        },
        {
            field: 'Código da Ficha',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ CODIGO_FICHA }}',
            edit: true
        },
        {
            field: 'Instância',
            type: 'MULTISELECT',
            default: true,
            options: [
                {
                    value: 'Defesa Prévia',
                    anexo: ''
                },
                {
                    value: 'Recurso Jari',
                    anexo: ''
                },
                {
                    value: 'Cetran',
                    anexo: ''
                }
            ],
            flag: '{{ INSTANCIA }}',
            value: '',
            edit: true
        },
        {
            field: 'Série Infração',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ SERIE_INFRACAO }}'
        },
        {
            field: 'Nome do Recorrente',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ NOME_RECORRENTE }}'
        },
        {
            field: 'Habilitação do Recorrente',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ HABILITACAO_RECORRENTE }}'
        },
        {
            field: 'CPF do Recorrente',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ CPF_RECORRENTE }}'
        },
        {
            field: 'Nome do Procurador',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ NOME_PROCURADOR }}'
        },
        {
            field: 'CPF do Procurador',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ CPF_PROCURADOR }}'
        },
        {
            field: 'Motivo da Multa',
            type: 'TEXT',
            default: true,
            options: [],
            flag: '{{ MOTIVO_MULTA }}'
        }
    ]);

    const [document, setDocument] = useState('');
    const [currentFieldType, setCurrentFieldType] = useState('TEXT');
    const [options, setOptions] = useState<any[]>([]);
    const [currentEditFlag, setCurrentEditFlag] = useState(null);
    const [relationField, setRelationField] = useState('');
    const [photo, setPhoto] = useState('');

    const handleAddOptions = useCallback(() => {
        const value = formRef?.current?.getFieldValue('field_option');
        const anexo = formRef?.current?.getFieldValue('anexo');

        setOptions(oldState => {
            const newState = [...oldState];
            newState.push({
                value,
                anexo: anexo || '',
                relation: relationField
            });
            return newState;
        });

        let inputRef = formRef?.current?.getFieldRef('field_option');
        inputRef.value = '';
        inputRef = formRef?.current?.getFieldRef('anexo');
        inputRef.value = '';
    }, [relationField]);

    const handleDeleteOption = useCallback((category: string) => {
        setOptions(oldState => {
            let newState = [...oldState];
            newState = newState.filter(item => item !== category);
            return newState;
        });
    }, []);

    const handleResetOptions = useCallback(() => {
        setOptions([]);
    }, []);

    const handleResetType = useCallback(() => {
        setCurrentFieldType('TEXT');
    }, []);

    const handleAddField = useCallback(() => {
        const value = formRef?.current?.getFieldValue('field_name');
        const anexo = formRef?.current?.getFieldValue('anexo');

        if (value) {
            setFields(oldState => {
                const newState = [...oldState];
                const flag = `{{ ${value
                    .trim()
                    .toUpperCase()
                    .replace(/Ç/g, 'C')
                    .replace(/ /g, '_')
                    .replace(/\W+/g, '')} }}`;

                newState.push({
                    field: value.toUpperCase(),
                    type: currentFieldType,
                    options:
                        currentFieldType === 'TEXT'
                            ? [
                                  {
                                      value,
                                      anexo: anexo || '',
                                      relation: relationField
                                  }
                              ]
                            : options,
                    flag,
                    default: false,
                    edit: true
                });

                return newState;
            });

            let inputRef = formRef?.current?.getFieldRef('field_name');
            inputRef.value = '';
            inputRef = formRef?.current?.getFieldRef('anexo');
            inputRef = '';

            handleResetType();
            handleResetOptions();
        }
    }, [formRef, currentFieldType, options, relationField]);

    const handleCopyFlag = useCallback(
        (flag: string) => {
            navigator.clipboard.writeText(flag);

            toast({
                title: 'Flag Copiada',
                description: '',
                status: 'success',
                duration: 2000,
                isClosable: true
            });
        },
        [formRef, document]
    );

    const handleDeleteFlag = useCallback((flag: string) => {
        setFields(oldState => {
            let newState = [...oldState];
            newState = newState.filter(item => item.flag !== flag);
            return newState;
        });
    }, []);

    const handleSubmit = useCallback(() => {
        try {
            const data = formRef.current?.getData();

            const schema = z.object({
                name: z.string().min(1, { message: 'Nome obrigatório' }),
                value: z.string().min(1, { message: 'Preço Obrigatório' }),
                document: z
                    .string()
                    .min(1, { message: 'Documento é obrigatório' })
            });

            schema.parse(data);

            apiBackend
                .put(`/resources/${id}`, {
                    ...data,
                    photo,
                    value: String(data?.value)
                        .replace(/\./g, '')
                        .replace(/,/, '.'),
                    categories: [data?.category],
                    fields
                })
                .then(response => {
                    const { status } = response;
                    if (status === 200) {
                        toast({
                            title: 'Cadastro Atualizado',
                            description: '',
                            status: 'success',
                            duration: 4000,
                            isClosable: true
                        });
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
    }, [id, formRef, fields, photo]);

    const handleChangeField = useCallback((field: string, value: string) => {
        if (field && value) {
            setFields(oldState => {
                let newState = [...oldState];
                newState = newState.map(item => {
                    const newItem = item;
                    if (newItem.flag.includes(field)) {
                        if (newItem.options.length > 0) {
                            newItem.options[0].value = value;
                        } else {
                            newItem.options.push({
                                value,
                                anexo: ''
                            });
                        }
                    }

                    return newItem;
                });
                return newState;
            });
        }
    }, []);

    const handleEditFlag = useCallback(
        (flag: string) => {
            const flagItem = fields.find(item => item.flag === flag);
            if (!flagItem) return;
            if (flagItem.type === 'TEXT') {
                if (flagItem.default) {
                    const inputName = String(flag)
                        .replace('{{', '')
                        .replace('}}', '')
                        .toLowerCase()
                        .trim();
                    formRef.current?.getFieldRef(inputName).focus();
                    return;
                }
            }
            setCurrentEditFlag(flagItem);
            onOpen();
        },
        [fields]
    );

    const handleChangeOptionsFlag = useCallback((flag: string, data: []) => {
        setFields(oldState => {
            let newState = [...oldState];
            newState = newState.map(item => {
                const newItem = item;
                if (newItem.flag === flag) {
                    newItem.options = data;
                }

                return newItem;
            });
            return newState;
        });
        onClose();
        setCurrentEditFlag(null);
    }, []);

    const handleFindFlagValue = useCallback(
        (flag: string) => {
            const flagItem = fields.find(item => item.flag.includes(flag));
            if (!flagItem) return '';
            return flagItem.options[0].value;
        },
        [fields]
    );

    const handleUploadFile = useCallback((event: any) => {
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append('file', file, file.name);
        axios
            .post(
                'https://sandbox.env.eflorista.com.br/api/v1/pages/upload',
                formData
            )
            .then(response => {
                const { status, data } = response;
                if (status === 200) {
                    setPhoto(data.location);
                }
            });
    }, []);

    useEffect(() => {
        if (id) {
            apiBackend.get(`/resources/${id}`).then(response => {
                const { data } = response;
                if (data) {
                    setResource(data);
                    setFields(data.fields);
                    setPhoto(data.photo);
                }
            });
        }
    }, [id]);

    return (
        resource && (
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
                            Atualizar Recurso
                        </Text>

                        <Flex width="100%" justifyContent={'space-between'}>
                            <Flex
                                width={['100%', '100%', '48%']}
                                flexDirection="column"
                            >
                                <Flex width={'100%'}>
                                    <Input
                                        name="name"
                                        label="Nome do Recurso"
                                        defaultValue={resource.name}
                                    />
                                </Flex>

                                <Flex width={'100%'} flexDirection="column">
                                    {photo && (
                                        <Image
                                            src={photo}
                                            width="200px"
                                            height="200px"
                                        />
                                    )}
                                    <Input
                                        name="photo"
                                        label="Foto do Recurso"
                                        type="file"
                                        onChange={e => handleUploadFile(e)}
                                    />
                                </Flex>

                                <Flex
                                    width={['100%']}
                                    justifyContent="space-between"
                                >
                                    <Flex width="48%">
                                        <Input
                                            name="codigo_artigo"
                                            label="Artigo"
                                            onKeyUp={e =>
                                                handleChangeField(
                                                    'CODIGO_ARTIGO',
                                                    e.currentTarget.value
                                                )
                                            }
                                            defaultValue={handleFindFlagValue(
                                                'CODIGO_ARTIGO'
                                            )}
                                        />
                                    </Flex>
                                    <Flex width="48%">
                                        <Input
                                            name="codigo_ficha"
                                            label="Cód. Ficha"
                                            onKeyUp={e =>
                                                handleChangeField(
                                                    'CODIGO_FICHA',
                                                    e.currentTarget.value
                                                )
                                            }
                                            defaultValue={handleFindFlagValue(
                                                'CODIGO_FICHA'
                                            )}
                                        />
                                    </Flex>
                                </Flex>
                                <Select name="type" label="Tipo de Multa">
                                    <option>Multa Leve</option>
                                    <option>Multa Média</option>
                                    <option>Multa Grave</option>
                                    <option>Multa Gravíssima</option>
                                </Select>
                                <Flex width={'100%'}>
                                    <TextArea
                                        name="description"
                                        label="Descrição (Motivo)"
                                        defaultValue={resource.description}
                                    />
                                </Flex>
                                <Flex width={'48%'}>
                                    <InputCurrency
                                        name="value"
                                        size="sm"
                                        label="Preço"
                                        defaultValue={resource.value}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>

                        <Box width="100%" flexDirection="column">
                            <Flex
                                width="100%"
                                flexDirection="column"
                                color="gray.900"
                                mt="8px"
                                mb="16px"
                                backgroundColor="blue.100"
                                p="16px"
                            >
                                <Text
                                    fontWeight="600"
                                    fontSize="14px"
                                    color="green.500"
                                >
                                    Flag Personalizada
                                </Text>

                                <Text
                                    fontSize="12px"
                                    fontWeight="500"
                                    color="gray.500"
                                >
                                    Se o recurso precisar de uma informação
                                    específica, crie uma flag customizada para
                                    usar no documento.
                                </Text>

                                <Flex
                                    width="100%"
                                    justifyContent="space-between"
                                    mt="8px"
                                >
                                    <Flex width="48%" flexDirection="column">
                                        <Flex width="100%">
                                            <TextArea
                                                name="field_name"
                                                label="Criar Campo (Nome do Campo)"
                                                rows={3}
                                            />
                                        </Flex>
                                        <Flex
                                            width="100%"
                                            flexDirection="column"
                                        >
                                            <Select
                                                width="100%"
                                                name="field_type"
                                                label="Tipo de campo"
                                                onChange={e => {
                                                    setCurrentFieldType(
                                                        e.currentTarget.value
                                                    );
                                                    handleResetOptions();
                                                }}
                                                value={currentFieldType}
                                            >
                                                <option value="TEXT">
                                                    Texto
                                                </option>
                                                <option value="SELECT">
                                                    Multipla Escolha
                                                </option>
                                            </Select>

                                            {currentFieldType === 'SELECT' && (
                                                <Flex
                                                    width="100%"
                                                    flexDirection="column"
                                                >
                                                    <TextArea
                                                        name="field_option"
                                                        label="Opções de Resposta"
                                                        rows={4}
                                                    />

                                                    <Button
                                                        ml="8px"
                                                        mt="8px"
                                                        title="+"
                                                        backgroundColor="green.500"
                                                        color="white"
                                                        width="40px"
                                                        height="32px"
                                                        borderRadius="4px"
                                                        py="8px"
                                                        fontSize="14px"
                                                        onClick={() => {
                                                            handleAddOptions();
                                                            setRelationField(
                                                                ''
                                                            );
                                                        }}
                                                    />
                                                </Flex>
                                            )}
                                            {options.length > 0 && (
                                                <Flex
                                                    mt="16px"
                                                    width="100%"
                                                    flexDirection="column"
                                                    mb="8px"
                                                >
                                                    <Text
                                                        fontSize="14px"
                                                        color="green.500"
                                                        fontWeight="600"
                                                        mb="8px"
                                                    >
                                                        Opções
                                                    </Text>

                                                    <Flex
                                                        flexWrap="wrap"
                                                        gap="8px"
                                                    >
                                                        {options.map(option => (
                                                            <Flex
                                                                key={
                                                                    option.value
                                                                }
                                                                color="white"
                                                                backgroundColor="green.500"
                                                                pl="16px"
                                                                pr="8px"
                                                                width="auto"
                                                                minWidth="80px"
                                                                height="32px"
                                                                borderRadius="4px"
                                                                fontSize="14px"
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                position="relative"
                                                            >
                                                                <Flex
                                                                    position="absolute"
                                                                    left="-4px"
                                                                    top="-4px"
                                                                    borderRadius="50%"
                                                                    backgroundColor="red.500"
                                                                    color="white"
                                                                    cursor="pointer"
                                                                    onClick={() =>
                                                                        handleDeleteOption(
                                                                            option
                                                                        )
                                                                    }
                                                                >
                                                                    <Icon
                                                                        as={FiX}
                                                                        color="white"
                                                                        fontSize="14px"
                                                                    />
                                                                </Flex>

                                                                <Text>
                                                                    {
                                                                        option.value
                                                                    }
                                                                </Text>
                                                            </Flex>
                                                        ))}
                                                    </Flex>
                                                </Flex>
                                            )}
                                        </Flex>

                                        <Flex width="100%">
                                            <Button
                                                mt="6px"
                                                width="48%"
                                                title="Criar Flag"
                                                backgroundColor="green.500"
                                                color="white"
                                                height="32px"
                                                borderRadius="4px"
                                                py="8px"
                                                fontSize="14px"
                                                onClick={() => {
                                                    handleAddField();
                                                    setRelationField('');
                                                }}
                                            />
                                        </Flex>
                                    </Flex>

                                    <Flex
                                        width="48%"
                                        justifyContent="space-between"
                                        flexWrap="wrap"
                                    >
                                        <Flex
                                            width="100%"
                                            flexDirection="column"
                                        >
                                            <Box fontWeight="500">
                                                Relacionamento
                                            </Box>
                                            <Flex width="100%" gap="8px">
                                                <Flex
                                                    alignItems="center"
                                                    fontSize="12px"
                                                    gap="4px"
                                                >
                                                    <input
                                                        type="radio"
                                                        value="PARAGRAPH"
                                                        name="relation"
                                                        checked={
                                                            relationField ===
                                                            'PARAGRAPH'
                                                        }
                                                        onChange={e =>
                                                            setRelationField(
                                                                e.currentTarget
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                    <Text>Paragráfo</Text>
                                                </Flex>
                                                <Flex
                                                    alignItems="center"
                                                    fontSize="12px"
                                                    gap="4px"
                                                >
                                                    <input
                                                        type="radio"
                                                        value="OPEN_FIELD"
                                                        name="relation"
                                                        checked={
                                                            relationField ===
                                                            'OPEN_FIELD'
                                                        }
                                                        onChange={e =>
                                                            setRelationField(
                                                                e.currentTarget
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                    <Text>Campo Aberto</Text>
                                                </Flex>
                                                <Flex
                                                    alignItems="center"
                                                    fontSize="12px"
                                                    gap="4px"
                                                >
                                                    <input
                                                        type="radio"
                                                        value="PHOTO"
                                                        name="relation"
                                                        checked={
                                                            relationField ===
                                                            'PHOTO'
                                                        }
                                                        onChange={e =>
                                                            setRelationField(
                                                                e.currentTarget
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                    <Text>Foto</Text>
                                                </Flex>
                                            </Flex>

                                            {relationField === 'PARAGRAPH' && (
                                                <Flex width="100%" mt="16px">
                                                    <TextEditor
                                                        name="anexo"
                                                        label="Texto Relacionado"
                                                        rows={3}
                                                        height={200}
                                                    />
                                                </Flex>
                                            )}
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex
                                width="100%"
                                flexDirection="column"
                                fontSize="14px"
                                mb="16px"
                            >
                                <Text fontWeight="600" color="green.500">
                                    Modo de usar
                                </Text>
                                <Text>
                                    1 - Clique no campo desejado abaixo para
                                    copiar sua flag e colocar no documento
                                </Text>

                                <Text>
                                    {`2 - As flags no documento serão identificadas pelo
                                padrão {{ NOME_FLAG }}`}
                                </Text>

                                <Text>
                                    3 - As flags serão substituidas
                                    posteriormente pelos valores informado pelo
                                    comprador do recurso
                                </Text>
                            </Flex>
                            <Flex
                                flexDirection="column"
                                fontSize="14px"
                                mb="8px"
                            >
                                <Text fontWeight="600" color="green.500">
                                    Flags
                                </Text>

                                <Flex
                                    width="100%"
                                    gap="8px"
                                    mt="8px"
                                    flexWrap="wrap"
                                    mb="8px"
                                >
                                    {fields.map(item => (
                                        <Flex
                                            key={item.flag}
                                            color="white"
                                            backgroundColor="green.500"
                                            pl="16px"
                                            pr="8px"
                                            width="auto"
                                            minWidth="80px"
                                            height="32px"
                                            borderRadius="4px"
                                            fontSize="14px"
                                            alignItems="center"
                                            justifyContent="center"
                                            position="relative"
                                        >
                                            <Flex
                                                cursor="pointer"
                                                onClick={() =>
                                                    handleCopyFlag(item.flag)
                                                }
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Text lineHeight="14px">
                                                    {String(
                                                        item.field
                                                    ).substring(0, 32)}
                                                </Text>

                                                <Icon
                                                    mb="8px"
                                                    ml="8px"
                                                    as={FiCopy}
                                                    color="white"
                                                    fontSize="16px"
                                                />
                                            </Flex>

                                            <Flex
                                                position="absolute"
                                                left="-4px"
                                                top="-10px"
                                                gap="4px"
                                            >
                                                {!item?.default &&
                                                    item.flag !==
                                                        '{{ ORGAO_AUTUADOR }}' && (
                                                        <Flex
                                                            p="2px"
                                                            borderRadius="4px"
                                                            backgroundColor="red.500"
                                                            color="white"
                                                            cursor="pointer"
                                                            onClick={() =>
                                                                handleDeleteFlag(
                                                                    item.flag
                                                                )
                                                            }
                                                        >
                                                            <Icon
                                                                as={FiX}
                                                                color="white"
                                                                fontSize="14px"
                                                            />
                                                        </Flex>
                                                    )}

                                                {item?.edit && (
                                                    <Flex
                                                        p="2px"
                                                        borderRadius="4px"
                                                        backgroundColor="purple.500"
                                                        color="white"
                                                        cursor="pointer"
                                                        onClick={() =>
                                                            handleEditFlag(
                                                                item.flag
                                                            )
                                                        }
                                                    >
                                                        <Icon
                                                            as={FiEdit}
                                                            color="white"
                                                            fontSize="12px"
                                                        />
                                                    </Flex>
                                                )}
                                            </Flex>
                                        </Flex>
                                    ))}
                                </Flex>

                                {fields.length <= 0 && (
                                    <Text>
                                        Você não criou nenhum campo
                                        personalizado ainda
                                    </Text>
                                )}
                            </Flex>

                            <TextEditor
                                name="document"
                                isRequired
                                size="sm"
                                mb="4px"
                                height={400}
                                onChange={e => setDocument(e.value)}
                                defaultValue={resource.document}
                            />
                        </Box>

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

                {currentEditFlag && (
                    <ModalEditFlag
                        flag={currentEditFlag}
                        isOpen={isOpen}
                        onClose={() => {
                            onClose();
                            setCurrentEditFlag(null);
                        }}
                        onChange={(flag, data) =>
                            handleChangeOptionsFlag(flag, data)
                        }
                    />
                )}
            </Form>
        )
    );
};

export default ProductsEditPage;
