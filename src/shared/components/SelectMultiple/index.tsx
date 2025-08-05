import React, { useRef, useCallback, useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FiPlusCircle } from 'react-icons/fi';

import { Flex, Box, Input, Text, InputProps } from '@chakra-ui/react';

import Button from '../Button';

interface IProps extends InputProps {
    name: string;
    onSearch: (query: string) => Promise<any>;
    // onSetItems: (
    //     olds: string[] | boolean,
    //     news: string[] | boolean,
    //     values?: string[]
    // ) => void;
    onSetItems: any;
    label?: string;
    isRequired?: boolean;
    maxWidth?: string;
    mb?: string | number;
    defaultValues?: any[];
    showAddButton?: boolean;
    enterPress?: boolean;
}

export interface IBadge {
    id: string;
    text: string;
}

interface IAutocompleteResult {
    id: string;
    text: string;
    value: string;
}

const SelectMultiple: React.FC<IProps> = ({
    name,
    onSearch,
    onSetItems,
    label = null,
    isRequired,
    maxWidth,
    mb = '16px',
    defaultValues = [],
    showAddButton = false,
    enterPress = true,
    ...rest
}) => {
    const inputRef = useRef<any>(null);

    const [selecteValuesIds, setSelectedValuesIds] = useState(() => {
        if (defaultValues?.length > 0) {
            return defaultValues.map(item => item.id);
        }

        return [];
    });
    const [selectedNewValues, setSelectedNewValues] = useState<any[]>([]);

    const [autocompleteResults, setAutocompleteResults] = useState<
        IAutocompleteResult[]
    >([]);
    const [isOpenAutocomplete, setOpenAutocomplete] = useState(false);
    const [autocompleteMouseOver, setAutocompleteMouseOver] = useState(false);

    const onChange = useCallback(async () => {
        const query = inputRef.current.value;

        const autoCompleteResults: IAutocompleteResult[] = await onSearch(
            query
        );

        setAutocompleteResults(autoCompleteResults);
    }, [onSearch]);

    const handleCloseAutocomplete = useCallback(() => {
        if (!autocompleteMouseOver) {
            setOpenAutocomplete(false);
        }
    }, [autocompleteMouseOver]);

    const clearInput = useCallback(() => {
        inputRef.current.value = '';
        // setOpenAutocomplete(false);
    }, []);

    const handleRemove = useCallback(
        removeItem => {
            const updatedBadges: any = null;

            setSelectedNewValues(oldState => {
                return oldState.filter(item => item !== removeItem.text);
            });

            setSelectedValuesIds(oldState => {
                const valuesUpdated = oldState.filter(
                    item => item !== removeItem.id
                );
                onSetItems(
                    valuesUpdated,
                    false,
                    updatedBadges.map(item => item.text)
                );
                return valuesUpdated;
            });
        },
        [onSetItems]
    );

    const handleAddNewItem = useCallback(() => {
        const { value } = inputRef.current;

        if (value.length > 1) {
            setSelectedNewValues(oldState => {
                if (oldState.includes(value)) {
                    return oldState;
                }

                const updatedValues = [...oldState, value];

                return updatedValues;
            });
            clearInput();
        }
    }, [clearInput, onSetItems, selecteValuesIds]);

    const handleClickResult = useCallback(
        result => {
            const { id } = result as IAutocompleteResult;

            setSelectedValuesIds(oldState => {
                if (oldState.includes(id)) {
                    return oldState.filter(item => item !== id);
                }

                const updatedValues = [...oldState, id];

                return updatedValues;
            });
            inputRef.current.focus();
        },
        [onSetItems, selectedNewValues, handleRemove]
    );

    useEffect(() => {
        onSetItems(selecteValuesIds, selectedNewValues);
    }, [onSetItems, selecteValuesIds, selectedNewValues]);

    return (
        <Box
            width="100%"
            maxWidth={maxWidth}
            fontWeight="500"
            mb={mb}
            position="relative"
            onMouseEnter={() => setAutocompleteMouseOver(true)}
            onMouseLeave={() => setAutocompleteMouseOver(false)}
        >
            {label && (
                <Flex width="100%" textAlign="center" mb="4px">
                    <Text>{label}</Text>
                    {isRequired && (
                        <Text ml="8px" color="red.500">
                            *
                        </Text>
                    )}
                </Flex>
            )}

            <Flex width="100%" alignItems="center" flexDirection="column">
                <Flex width="100%" alignItems="center">
                    <Input
                        ref={inputRef}
                        name={name}
                        {...rest}
                        autoCorrect="false"
                        onChange={() => onChange()}
                        autoComplete="off"
                        onClick={() => onChange()}
                        onFocus={() => setOpenAutocomplete(true)}
                        onBlur={() => handleCloseAutocomplete()}
                        onKeyPress={e => {
                            if (enterPress === true && e.key === 'Enter') {
                                handleAddNewItem();
                            }
                        }}
                    />

                    {showAddButton && (
                        <Button
                            title="Adicionar"
                            width="48px"
                            height="32px"
                            p="4px"
                            ml="8px"
                            onClick={() => handleAddNewItem()}
                            backgroundColor="purple.500"
                            _hover={{
                                backgroundColor: 'green.500'
                            }}
                            _focus={{
                                outline: 'none'
                            }}
                        >
                            <FiPlusCircle size={20} />
                        </Button>
                    )}
                </Flex>
            </Flex>

            {autocompleteResults.length > 0 && isOpenAutocomplete && (
                <Flex
                    width="100%"
                    backgroundColor="white"
                    position="absolute"
                    zIndex={10}
                    border="1px solid"
                    borderColor="gray.200"
                    boxShadow="0 1px 3px rgba(0,0,0,0.12), 0 1px 2px"
                    color="gray.900"
                    justifyContent="center"
                >
                    <Flex
                        px="16px"
                        width="100%"
                        flexDirection="column"
                        maxHeight="250px"
                        overflowY="auto"
                    >
                        {autocompleteResults.map(result => (
                            <Flex
                                key={result.id}
                                flexDirection="column"
                                alignItems="center"
                                width="100%"
                                height="32px"
                                py="8px"
                            >
                                <Box
                                    display="flex"
                                    width="100%"
                                    height="100%"
                                    justifyContent="space-between"
                                    cursor="pointer"
                                    _hover={{
                                        color: 'orange.500'
                                    }}
                                    alignItems="center"
                                    onClick={() => handleClickResult(result)}
                                    fontSize="14px"
                                >
                                    <Text>{result.text}</Text>

                                    {selecteValuesIds?.includes(
                                        result.value
                                    ) && (
                                        <Box
                                            display="flex"
                                            color="green.500"
                                            alignItems="center"
                                            fontWeight="500"
                                        >
                                            <FaCheckCircle
                                                size={18}
                                                fontWeight="600"
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            )}
        </Box>
    );
};

export default SelectMultiple;
