import React, { useState } from "react";
import {AppContext, State} from "./appContext"


export const AppContextProvider = ({children}) => {

    const [state, updateState] = useState<State>({
        page1: {
            clickCount: 0
        },
        page2: {
            clickCount: 0
        }
    });
    
    console.log("render AppContextProvider", state);

    const providerValue = {
        state: state, 
        updateState: (newState: State) => {
            console.log("Updating state from ", state, " to ", newState);
            updateState(newState);
        }
    };

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