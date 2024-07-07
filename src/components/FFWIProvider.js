import React, { createContext, useState } from 'react';

export const FFWIContext = createContext();

export const FFWIProvider = ({ children }) => {
    const [state, setState] = useState({ key: 'value' });

    const updateState = (newState) => {
        setState((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    return (
        <FFWIContext.Provider value={{ state, updateState }}>
            {children}
        </FFWIContext.Provider>
    );
};