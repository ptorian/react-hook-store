import React, { useEffect } from 'react';
import { State } from './context/appContext';
import { connect, Dispatch } from './context/connect';
import { ConnectedComponent3 } from './component3';

type StateProps = ReturnType<typeof mapStateToProps>;
type ActionProps = ReturnType<typeof mapActionsToProps>;
type ComponentProps = {};

export const Component2: React.FunctionComponent<StateProps & ActionProps & ComponentProps> = props => {
    const name = Component2.displayName || Component2.name
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
            <li><ConnectedComponent3 /></li>
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