import React from 'react';
import {ConnectedComponent1} from './component1';
import { ConnectedComponent2 } from './component2';
import { AppContextProvider } from './context/appContextProvider';

export const App = () => {
    console.log("render App");
    return (
        <AppContextProvider>
            <ul>
                <li>
                    <ConnectedComponent1 name="Component 1" />
                </li>
                <li>
                    <ConnectedComponent2 name="Component 2"></ConnectedComponent2>
                </li>
            </ul>
        </AppContextProvider>
    );
}