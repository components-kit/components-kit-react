import { createContext, useContext } from 'react';

export interface IComponentsKitContext {
  publicToken: string;
}

const ComponentsKitContext = createContext({
  publicToken: '',
});

export const useComponentsKit = () => {
  return useContext(ComponentsKitContext);
};

export default ComponentsKitContext;
