import React, { useState } from "react";
import {AppContext, State, AppContextType} from "./appContext"


export const useAppContext = (): AppContextType => {
    const [state, updateState] = useState<State>({
        page1: {
            clickCount: 0
        },
        page2: {
            clickCount: 0
        }
    });
    
    console.log("render AppContextProvider", state);

    const providerValue: AppContextType = [
        state, 
        (newState: State) => {
            console.log("updating state from ", state, " to ", newState);
            updateState(newState);
        }
    ];

    return providerValue;
};