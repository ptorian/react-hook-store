import React from 'react';
import { State } from './context/appContext';
import { connect, Dispatch } from './context/connect';

export const Component1: React.SFC<{name: string} & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapActionsToProps>> = props => {
    console.log(`render ${props.name}`);

    return (
        <ul>
            <li>{props.name}</li>
            <li>{props.clickCount}</li>
            <li><button onClick={props.incrementClickCount}>Update</button></li>
            {props.children != null ? <li>{props.children}</li> : null}
        </ul>
    );
};

const mapStateToProps = (state: State) => {
    return {
        clickCount: state.page1.clickCount
    }
};

const mapActionsToProps = (dispatch: Dispatch) => {
    return {
        incrementClickCount: () => {
            dispatch(oldState => ({
                ...oldState,
                page1: {
                    ...oldState.page1,
                    clickCount: oldState.page1.clickCount + 1
                }
            }))
        }
    }
}

export const ConnectedComponent1 = connect(mapStateToProps, mapActionsToProps)(Component1, "component 1");