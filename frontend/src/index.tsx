import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";
import routes from './route/router.config';
import {Provider as StoreProvider} from 'react-redux'
import store from "./store";
import {MantineProvider} from '@mantine/core';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <RouterProvider router={routes}/>
            </MantineProvider>
        </StoreProvider>
    </React.StrictMode>
);


