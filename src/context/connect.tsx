import React, { useContext, useMemo } from "react";

import { State, AppContext } from "./appContext";
import { useAppContext } from "./appContextProvider";

export type Dispatch = (callback: (oldState: State) => State) => void;


export const connect = <StateProps, ActionProps, ComponentProps>(mapStateToProps: (state: State) => StateProps, mapActionsToProps: (dispatch: Dispatch) => ActionProps) => {
    let state: State = null;

    return (Component: React.FunctionComponent<ComponentProps>): React.FunctionComponent<ComponentProps> => { 
        const Connect = (props: ComponentProps) =>  {
            const name = Component.displayName || Component.name;
            const [contextState, updateState] = useContext(AppContext);
            state = contextState;

            console.log(`render connect(${name})`, state);
        
            const dispatch: Dispatch = (callback: (oldState: State) => State) => {
                console.log("dispatch oldState", state);
                const newState = callback(state);
                updateState(newState);
            }
    
            const stateAugmentedProps = mapStateToProps(state);
            const actionAugmentedProps = mapActionsToProps(dispatch);

            return useMemo(() => (
                /*
                    https://reactjs.org/docs/context.html#contextprovider
                    All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes.
                    The propagation from Provider to its descendant consumers is not subject to the shouldComponentUpdate
                    method, so the consumer is updated even when an ancestor component bails out of the update.
                */
                <Component {...props} {...stateAugmentedProps} {...actionAugmentedProps} />
            ), [...Object.values(props), ...Object.values(stateAugmentedProps)]);
        };
        Connect.displayName = `connect(${Component.displayName || Component.name})`;
        return Connect;
    }
}