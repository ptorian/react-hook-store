import React, { useState, useContext } from 'react';
import { AppContext } from './context/appContext';

export const Component1: React.SFC<{name: string}> = props => {
    console.log(`render ${props.name}`);
    const appContext = useContext(AppContext);
    return (
        <ul>
            <li>{props.name}</li>
            <li>{appContext.state.page1.clickCount}</li>
            <li><button onClick={() => appContext.actions.setPage1ClickCount(appContext.state.page1.clickCount + 1)}>Update</button></li>
            {props.children != null ? <li>{props.children}</li> : null}
        </ul>
    );
};