import React from "react";

export interface State {
    page1: {
        clickCount: number
    },
    page2: {
        clickCount: number
    }
};

export type AppContextType = [State, (state: State) => void];

export const AppContext = React.createContext<AppContextType>(null);