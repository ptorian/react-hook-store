import React from 'react';
import { State } from './context/appContext';
import { connect, Dispatch } from './context/connect';

type Component1Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapActionsToProps>;

export const Component1: React.SFC<Component1Props> = props => {
    const name = Component1.displayName || Component1.name;
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

export const ConnectedComponent1 = connect(mapStateToProps, mapActionsToProps)(Component1);