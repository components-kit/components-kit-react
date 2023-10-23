'use client';

import React, { Context, ReactNode, createContext, useContext } from 'react';

interface IComponentsKitContext {
  publicToken: string;
}

interface IComponentsKitProviderProps {
  children: ReactNode;
  options: IComponentsKitContext;
}

const ComponenstKitContext: Context<any> = createContext<IComponentsKitContext>({
  publicToken: '',
});

export const ComponentsKitProvider = ({ children, options }: IComponentsKitProviderProps) => {
  return <ComponenstKitContext.Provider value={options}>{children}</ComponenstKitContext.Provider>;
};

export const useComponenstKitContext = () => useContext(ComponenstKitContext);
