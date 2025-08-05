import './shared/styles/global.css';
import 'react-day-picker/lib/style.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import LayoutDefault from './shared/hooks/layout';
import Routes from './shared/routes';
import theme from './shared/styles/theme';

function App() {
    return (
        <ChakraProvider theme={theme} resetCSS={true}>
            <BrowserRouter>
                <LayoutDefault>
                    <Routes />
                </LayoutDefault>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
