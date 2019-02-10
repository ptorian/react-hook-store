import React, { useContext, useMemo } from "react";

import { State, AppContext } from "./appContext";

export type Dispatch = (callback: (oldState: State) => State) => void;

export const connect = <StateProps, ActionProps>(mapStateToProps: (state: State) => StateProps, mapActionsToProps: (dispatch: Dispatch) => ActionProps) => {

    return (Component: any, name: string) => (props: any) =>  {
        const appContext = useContext(AppContext);
        console.log(`render connect ${name}`, appContext.state);

        const dispatch: Dispatch = (callback: (oldState: State) => State) => {
            console.log("dispatch oldState", appContext.state);
            const newState = callback(appContext.state);
            appContext.updateState(newState);
        }

        const stateAugmentedProps = mapStateToProps(appContext.state);
        const actionAugmentedProps = mapActionsToProps(dispatch);

        return useMemo(() => (
            <Component {...props} {...stateAugmentedProps} {...actionAugmentedProps} />
        ), Object.values(stateAugmentedProps))
    }
}