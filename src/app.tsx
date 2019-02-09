import React from 'react';
import {Component1} from './component1';
import { Component2 } from './component2';
import { AppContextProvider } from './context/appContextProvider';

export const App = () => {
    console.log("render App");
    return (
        <AppContextProvider>
            <ul>
                <li>
                    <Component1 name="Component 1" />
                </li>
                <li>
                    <Component2 name="Component 2"></Component2>
                </li>
            </ul>
        </AppContextProvider>
    );
}