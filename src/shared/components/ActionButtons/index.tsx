import React from 'react';
import { FiEye, FiTrash2 } from 'react-icons/fi';

import { Flex, FlexProps, Icon, Stack } from '@chakra-ui/react';

interface IProps extends FlexProps {
    showRemove?: boolean;
}
const ActionButtons: React.FC<IProps> = ({ showRemove = true, ...rest }) => {
    return (
        <Flex {...rest}>
            <Stack direction="row">
                <Flex
                    width="24px"
                    height="24px"
                    backgroundColor="green.500"
                    color="white"
                    justifyContent="center"
                    alignItems="center"
                    title="Visualizar"
                    cursor="pointer"
                    borderRadius="50%"
                >
                    <Icon as={FiEye} fontSize="18px" color="white" />
                </Flex>

                {showRemove && (
                    <Flex
                        width="24px"
                        height="24px"
                        backgroundColor="orange.500"
                        color="white"
                        justifyContent="center"
                        alignItems="center"
                        title="Excluir"
                        cursor="pointer"
                        borderRadius="50%"
                    >
                        <Icon as={FiTrash2} fontSize="18px" />
                    </Flex>
                )}
            </Stack>
        </Flex>
    );
};

export default ActionButtons;
