import React, { createContext, useContext } from 'react';
import { createStore } from './createStore';

export const store = createStore();

let StoreContext = createContext(store);

export const StoreProvider = ({ children }) => {
  StoreContext = createContext(store);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const storeInstance = useContext(StoreContext);

  window.amit = storeInstance;

  if (!storeInstance) {
    throw new Error('You have forgotten to use StoreProvider');
  }
  return storeInstance;
};
