import { useCallback, useRef, useState } from 'react';

import {
    Flex,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Box
} from '@chakra-ui/react';
import { FormHandles } from '@unform/core';

import CustomButton from '../../../../shared/components/Button';
import Form from '../../../../shared/components/Form';
import InputRadio from '../../../../shared/components/InputRadio';
import TextArea from '../../../../shared/components/TextArea';
import TextEditor from '../../../../shared/components/TextEditor';

export default function ModalEditFlag({ flag, onChange, isOpen, onClose }) {
    const [options, setOptions] = useState(flag?.options || []);

    const formRef = useRef<FormHandles>(null);

    const handleAddOptions = useCallback(() => {
        setOptions(oldState => {
            const newState = [...oldState];
            newState.push({
                value: '',
                anexo: '',
                relation: ''
            });
            return newState;
        });
    }, []);

    const handleRemoveOption = useCallback((value: number) => {
        setOptions(oldState => {
            let newState = [...oldState];
            newState = newState.filter((item, index) => index !== value);
            return newState;
        });
    }, []);

    const handleAddField = useCallback(() => {
        const dataOptions = options.map((option, index) => {
            return {
                value:
                    formRef?.current?.getFieldValue(`field_option[${index}]`) ||
                    '',
                anexo:
                    formRef?.current?.getFieldValue(
                        `field_option_anexo[${index}]`
                    ) || '',
                relation: option.relation
            };
        });

        onChange(flag.flag, dataOptions);
    }, [options]);

    const handleChangeRelation = useCallback((value: string, index: number) => {
        console.log(value);
        setOptions(oldState => {
            const newState = [...oldState];
            newState[index].relation = value;
            return newState;
        });
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size={'6xl'}
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar Flag {flag.field}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Form ref={formRef}>
                        <Flex
                            width="100%"
                            flexDirection="column"
                            color="gray.900"
                            backgroundColor="white"
                            mt="8px"
                            mb="16px"
                        >
                            <Flex width="100%" flexDirection="column" mt="8px">
                                <Flex
                                    width="100%"
                                    justifyContent="space-between"
                                    flexWrap="wrap"
                                    flexDirection="column"
                                >
                                    {options.map((option, index) => (
                                        <Flex
                                            key={option.value}
                                            width="100%"
                                            justifyContent="space-between"
                                        >
                                            {flag.type !== 'TEXT' && (
                                                <Flex
                                                    width="48%"
                                                    flexDirection="column"
                                                    position="relative"
                                                >
                                                    <TextArea
                                                        name={`field_option[${index}]`}
                                                        label="Opções de Resposta"
                                                        rows={2}
                                                        defaultValue={
                                                            option.value
                                                        }
                                                    />

                                                    <Flex
                                                        left="120px"
                                                        position="absolute"
                                                        width="auto"
                                                        px="4px"
                                                        py="2px"
                                                        fontSize="12px"
                                                        backgroundColor="red.500"
                                                        color="white"
                                                        borderRadius="4px"
                                                        cursor="pointer"
                                                        onClick={() =>
                                                            handleRemoveOption(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Text>Remover</Text>
                                                    </Flex>
                                                </Flex>
                                            )}

                                            <Flex
                                                width={
                                                    flag.type !== 'TEXT'
                                                        ? '48%'
                                                        : '100%'
                                                }
                                                flexDirection="column"
                                            >
                                                <Flex
                                                    width="100%"
                                                    flexDirection="column"
                                                >
                                                    <Box fontWeight="500">
                                                        Relacionamento
                                                    </Box>
                                                    <Flex
                                                        width="100%"
                                                        gap="8px"
                                                    >
                                                        <InputRadio
                                                            label="Paragráfo"
                                                            name={`field_option_relation[${index}]`}
                                                            value="PARAGRAPH"
                                                            checked={
                                                                option.relation ===
                                                                'PARAGRAPH'
                                                            }
                                                            onChange={e =>
                                                                handleChangeRelation(
                                                                    e
                                                                        .currentTarget
                                                                        .value,
                                                                    index
                                                                )
                                                            }
                                                        />
                                                        <InputRadio
                                                            label="Campo Aberto"
                                                            name={`field_option_relation[${index}]`}
                                                            value="OPEN_FIELD"
                                                            checked={
                                                                option.relation ===
                                                                'OPEN_FIELD'
                                                            }
                                                            onChange={e =>
                                                                handleChangeRelation(
                                                                    e
                                                                        .currentTarget
                                                                        .value,
                                                                    index
                                                                )
                                                            }
                                                        />
                                                        <InputRadio
                                                            label="Foto"
                                                            name={`field_option_relation[${index}]`}
                                                            value="PHOTO"
                                                            checked={
                                                                option.relation ===
                                                                'PHOTO'
                                                            }
                                                            onChange={e =>
                                                                handleChangeRelation(
                                                                    e
                                                                        .currentTarget
                                                                        .value,
                                                                    index
                                                                )
                                                            }
                                                        />
                                                    </Flex>

                                                    {option.relation ===
                                                        'PARAGRAPH' && (
                                                        <Flex
                                                            width="100%"
                                                            mt="16px"
                                                        >
                                                            <TextEditor
                                                                name={`field_option_anexo[${index}]`}
                                                                label="Texto Relacionado"
                                                                rows={4}
                                                                height={320}
                                                                defaultValue={
                                                                    option.anexo
                                                                }
                                                            />
                                                        </Flex>
                                                    )}
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    ))}
                                </Flex>
                                {flag.type !== 'TEXT' && (
                                    <CustomButton
                                        mt="22px"
                                        title="+ Adicionar opção"
                                        backgroundColor="green.500"
                                        color="white"
                                        width="48%"
                                        height="32px"
                                        borderRadius="4px"
                                        py="8px"
                                        fontSize="14px"
                                        onClick={() => handleAddOptions()}
                                    />
                                )}
                            </Flex>
                        </Flex>
                    </Form>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Fechar
                    </Button>
                    <Button colorScheme="green" onClick={handleAddField}>
                        Salvar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
