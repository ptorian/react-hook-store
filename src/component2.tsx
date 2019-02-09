import React, { useState, useContext } from 'react';
import { AppContext } from './context/appContext';

export const Component2: React.SFC<{name: string}> = props => {
    console.log(`render ${props.name}`);
    const appContext = useContext(AppContext);
    return (
        <ul>
            <li>{props.name}</li>
            <li>{appContext.state.page2.clickCount}</li>
            <li><button onClick={() => appContext.actions.setPage2ClickCount(appContext.state.page2.clickCount + 1)}>Update</button></li>
            {props.children != null ? <li>{props.children}</li> : null}
        </ul>
    );
};