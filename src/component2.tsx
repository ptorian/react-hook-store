import React from 'react';
import { State } from './context/appContext';
import { connect, Dispatch } from './context/connect';

export const Component2: React.SFC<{name: string} & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapActionsToProps>> = props => {
    console.log(`render ${props.name}`);

    const updateClickCount = () => {
        props.updateClickCount(props.clickCount + 1);
    }

    return (
        <ul>
            <li>{props.name}</li>
            <li>{props.clickCount}</li>
            <li><button onClick={updateClickCount}>Update</button></li>
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
        updateClickCount: (clickCount: number) => {
            dispatch(oldState => ({
                ...oldState,
                page2: {
                    ...oldState.page2,
                    clickCount: clickCount
                }
            }))
        }
    }
}

export const ConnectedComponent2 = connect(mapStateToProps, mapActionsToProps)(Component2, "component 2");