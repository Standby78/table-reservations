import React from 'react';

export const AppContext = React.createContext({
    loggedUser: {},
    tablesDocument: {},
    setTablesDocument: () => {},
    setModal: () => {},
    tablesOfficesIndex: 0,
    setTablesOfficesIndex: () => {},
});

export const AppProvider = ({ value, children }) => {
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
