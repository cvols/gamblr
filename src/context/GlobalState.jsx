import React, { createContext, useContext, useReducer } from 'react';

export const DataLayerContext = createContext();

export const GlobalState = ({ initialState, reducer, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
);

export const useGlobalStateValue = () => useContext(DataLayerContext);
