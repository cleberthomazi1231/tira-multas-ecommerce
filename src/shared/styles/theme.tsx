import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: 'Roboto',
        body: 'Roboto'
    },
    fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 500,
        bold: 500,
        extrabold: 500,
        black: 500
    },
    colors: {
        white: '#FFFFFF',
        black: '#1F2834',
        gray: {
            100: '#efefef',
            300: '#C9C6C6',
            500: '#4B535E',
            900: '#313A46'
        },
        purple: {
            500: '#3E4A7B'
        },
        red: {
            500: '#FB2E5C'
        },
        orange: {
            500: '#FF914D'
        },
        yellow: {
            500: '#FFAB06'
        },
        green: {
            500: '#60B87E'
        },
        blue: {
            500: '#42478B'
        }
    }
});

export default theme;
