import React, { useState } from "react";
import {AppContext} from "./appContext"


export const AppContextProvider = ({children}) => {
    console.log("render AppContextProvider");

    const [page1ClickCount, setPage1ClickCount] = useState(0);
    const [page2ClickCount, setPage2ClickCount] = useState(0);

    const state = {
        page1: {
            clickCount: page1ClickCount
        },
        page2: {
            clickCount: page2ClickCount
        }
    };

    const actions = {
        setPage1ClickCount,
        setPage2ClickCount
    };

    const providerValue = {state, actions};

    return (
        /*
            https://reactjs.org/docs/context.html#contextprovider
            All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes.
            The propagation from Provider to its descendant consumers is not subject to the shouldComponentUpdate
            method, so the consumer is updated even when an ancestor component bails out of the update.
         */
        <AppContext.Provider value={providerValue}>
            {children}
        </AppContext.Provider>
    )
};