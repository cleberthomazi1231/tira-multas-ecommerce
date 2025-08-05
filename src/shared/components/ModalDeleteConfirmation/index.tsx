import React, { useCallback } from 'react';

import {
    Text,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Flex,
    Button
} from '@chakra-ui/react';

interface IProps {
    deleteFunction: any;
    isOpen: any;
    onClose: any;
}

const ModalDeleteConfirmation: React.FC<IProps> = ({
    deleteFunction,
    isOpen,
    onClose
}) => {
    const handleDeleteProducts = useCallback(async () => {
        await deleteFunction();
        onClose();
    }, [deleteFunction, onClose]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontWeight="500">
                        Confirmar Exclusão
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb="8px">
                        <Flex width="100%" flexDirection="column">
                            <Text fontSize="18px">
                                Tem certeza que deseja remover?
                            </Text>
                        </Flex>

                        <Flex
                            width="100%"
                            flexDirection="row"
                            justifyContent="space-between"
                            mt="16px"
                            mb="8px"
                            fontWeight="500"
                        >
                            <Button
                                width="48%"
                                backgroundColor="red.500"
                                onClick={() => handleDeleteProducts()}
                                color="white"
                            >
                                Sim
                            </Button>
                            <Button
                                width="48%"
                                backgroundColor="white"
                                color="red.500"
                                onClick={() => onClose()}
                            >
                                Cancelar
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalDeleteConfirmation;
