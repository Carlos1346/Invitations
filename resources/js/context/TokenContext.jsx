// TokenContext.js

import React, { createContext, useState, useContext } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState("");

    const saveToken = (newToken) => {
        setToken(newToken);
    };

    return (
        <TokenContext.Provider value={{ token, saveToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    return useContext(TokenContext);
};
