import React from 'react';
import {ConnectedComponent1} from './component1';
import { ConnectedComponent2 } from './component2';
import { AppContext } from './context/appContext';
import { useAppContext } from './context/appContextProvider';

export const App = () => {
    console.log("render App");
    const providerValue = useAppContext();
    return (
        <AppContext.Provider value={providerValue}>
            <ul>
                <li>
                    <ConnectedComponent1 />
                </li>
                <li>
                    <ConnectedComponent2></ConnectedComponent2>
                </li>
            </ul>
        </AppContext.Provider>
    );
}