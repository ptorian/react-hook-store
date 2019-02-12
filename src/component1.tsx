import React, { useEffect } from 'react';
import { State } from './context/appContext';
import { connect, Dispatch } from './context/connect';

type StateProps = ReturnType<typeof mapStateToProps>;
type ActionProps = ReturnType<typeof mapActionsToProps>;
type ComponentProps = {};

export const Component1: React.FunctionComponent<StateProps & ActionProps & ComponentProps> = props => {
    const name = Component1.displayName || Component1.name;
    console.log(`render ${name}`);

    let ulRef: HTMLUListElement;

    useEffect(() => {
        let timerCountdown = 1;
        let timerHandler = setInterval(() => {
            ulRef.style.backgroundColor = `rgb(255, 0, 0, ${0 + timerCountdown * 0.5})`
            timerCountdown -= 0.02;
            if (timerCountdown < 0) {
                clearInterval(timerHandler);
                timerHandler = null;
            }
        }, 10);

        return () => {
            if (timerHandler != null) {
                clearInterval(timerHandler);
                timerHandler = null;
            }
        }
    });

    return (
        <ul ref={x => ulRef = x}>
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

export const ConnectedComponent1 = connect<StateProps, ActionProps, ComponentProps>(mapStateToProps, mapActionsToProps)(Component1);