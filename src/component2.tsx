import React from 'react';
import { State } from './context/appContext';
import { connect, Dispatch } from './context/connect';

type StateProps = ReturnType<typeof mapStateToProps>;
type ActionProps = ReturnType<typeof mapActionsToProps>;
type ComponentProps = {};

export const Component2: React.FunctionComponent<StateProps & ActionProps & ComponentProps> = props => {
    const name = Component2.displayName || Component2.name
    console.log(`render ${name}`);

    return (
        <ul>
            <li>{name}</li>
            <li>{props.clickCount}</li>
            <li><button onClick={props.incrementClickCount}>Update</button></li>
            {props.children != null ? <li>{props.children}</li> : null}
        </ul>
    );
};

const mapStateToProps = (state: State) => {
    return {
        clickCount: state.page2.clickCount
    }
};

const mapActionsToProps = (dispatch: Dispatch) => { 
    return {
        incrementClickCount: () => {
            dispatch(oldState => ({
                ...oldState,
                page2: {
                    ...oldState.page2,
                    clickCount: oldState.page2.clickCount + 1
                }
            }))
        }
    }
}

export const ConnectedComponent2 = connect(mapStateToProps, mapActionsToProps)(Component2);