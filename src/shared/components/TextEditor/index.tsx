import React, { useRef, useEffect, useCallback, useState } from 'react';

import { Flex, Text, Textarea } from '@chakra-ui/react';
import { Editor } from '@tinymce/tinymce-react';
import { useField } from '@unform/core';

const TextEditor: React.FC<any> = ({
    name,
    label,
    isRequired = false,
    defaultValue = '',
    height = 500
}) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState('');

    const { fieldName, registerField } = useField(name);

    const handleChange = useCallback(newValue => {
        setValue(newValue.level.content);
    }, []);

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue as string);
        }

        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [defaultValue, fieldName, registerField]);

    return (
        <Flex width="100%" flexDirection="column" fontWeight="500" mb="64px">
            {label && (
                <Flex width="100%" textAlign="center" mb="4px">
                    <Text fontSize="12px">{label}</Text>
                    {isRequired && (
                        <Text ml="8px" color="red.500">
                            *
                        </Text>
                    )}
                </Flex>
            )}

            <Flex width="100%" flexDirection="column">
                <Editor
                    textareaName={name}
                    apiKey="9qa5qykx07kskrltsx8g7whfx6lb9ntfsbilaad579902xo9"
                    onInit={(_evt, _editor: any) => null}
                    initialValue={(defaultValue as any) || ''}
                    init={{
                        height,
                        menubar: false,
                        plugins: [
                            'advlist',
                            'autolink',
                            'styles',
                            'lists',
                            'link',
                            'image',
                            'charmap',
                            'print',
                            'preview',
                            'archor',
                            'searchreplace',
                            'visualblocks',
                            'code',
                            'fullscreen',
                            'insertdatetime',
                            'media',
                            'table',
                            'paste',
                            'code',
                            'help',
                            'wordcount'
                        ],
                        toolbar:
                            'undo redo | blocks | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | table link image | ' +
                            'code code-block removeformat | help',
                        content_style:
                            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        menubar:
                            'favs file edit view insert format tools table help',
                        images_upload_url:
                            'https://app.eflorista.com.br/api/v1/pages/upload',

                        image_uploadtab: true
                    }}
                    onChange={handleChange}
                />
                <Textarea
                    ref={inputRef}
                    display="none"
                    name={name}
                    value={value}
                />
            </Flex>
        </Flex>
    );
};

export default TextEditor;
