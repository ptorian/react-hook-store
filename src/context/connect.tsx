import React, { useContext, useMemo } from "react";

import { State, AppContext } from "./appContext";
import { useAppContext } from "./appContextProvider";

export type Dispatch = (callback: (oldState: State) => State) => void;


export const connect = <StateProps, ActionProps>(mapStateToProps: (state: State) => StateProps, mapActionsToProps: (dispatch: Dispatch) => ActionProps) => {

    return (Component: any, name: string = "") => { 
        const Connect = (props: any) =>  {

            const providerValue = useAppContext();

            const ConnectedComponent = () => {
                const appContext = useContext(AppContext);
                console.log(`render connect ${name}`, appContext.state);
        
                const dispatch: Dispatch = (callback: (oldState: State) => State) => {
                    console.log("dispatch oldState", appContext.state);
                    const newState = callback(appContext.state);
                    appContext.updateState(newState);
                }
        
                const stateAugmentedProps = mapStateToProps(appContext.state);
                const actionAugmentedProps = mapActionsToProps(dispatch);
                return (
                    <Component {...props} {...stateAugmentedProps} {...actionAugmentedProps} />
                )
            }

            return (
                /*
                    https://reactjs.org/docs/context.html#contextprovider
                    All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes.
                    The propagation from Provider to its descendant consumers is not subject to the shouldComponentUpdate
                    method, so the consumer is updated even when an ancestor component bails out of the update.
                */
                <AppContext.Provider value={providerValue}>
                    <ConnectedComponent />
                </AppContext.Provider>
            )
        };
        return Connect;
    }
}