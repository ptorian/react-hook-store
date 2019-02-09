import React from "react";

export interface AppContextType {
    state: {
        page1: {
            clickCount: number
        },
        page2: {
            clickCount: number
        }
    },
    actions: {
        setPage1ClickCount: (value: number) => void,
        setPage2ClickCount: (value: number) => void,
    }
}

export const AppContext = React.createContext<AppContextType>(null);