import React from "react";

export interface State {
    page1: {
        clickCount: number
    },
    page2: {
        clickCount: number
    }
};

export interface AppContextType {
    state: State,
    updateState: (state: State) => void
}

export const AppContext = React.createContext<AppContextType>(null);