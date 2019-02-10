import React, { useContext, useMemo } from "react";

import { State, AppContext } from "./appContext";
import { useAppContext } from "./appContextProvider";

export type Dispatch = (callback: (oldState: State) => State) => void;


export const connect = <StateProps, ActionProps, ComponentProps>(mapStateToProps: (state: State) => StateProps, mapActionsToProps: (dispatch: Dispatch) => ActionProps) => {

    return (Component: React.FunctionComponent<ComponentProps>): React.FunctionComponent<ComponentProps> => { 
        const Connect = (props: ComponentProps) =>  {

            const providerValue = useAppContext();
            console.log(`render connect ${name}`, providerValue.state);
        
            const dispatch: Dispatch = (callback: (oldState: State) => State) => {
                console.log("dispatch oldState", providerValue.state);
                const newState = callback(providerValue.state);
                providerValue.updateState(newState);
            }
    
            const stateAugmentedProps = mapStateToProps(providerValue.state);
            const actionAugmentedProps = mapActionsToProps(dispatch);

            return (
                /*
                    https://reactjs.org/docs/context.html#contextprovider
                    All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes.
                    The propagation from Provider to its descendant consumers is not subject to the shouldComponentUpdate
                    method, so the consumer is updated even when an ancestor component bails out of the update.
                */
                <AppContext.Provider value={providerValue}>
                    <Component {...props} {...stateAugmentedProps} {...actionAugmentedProps} />
                </AppContext.Provider>
            )
        };
        Connect.displayName = `connect(${Component.displayName || Component.name})`;
        return Connect;
    }
}