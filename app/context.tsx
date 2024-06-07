import { RestObject } from './types';
import { RootLayoutProps } from './types';

interface contextprops {
    isError: boolean; 
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    data: RestObject[] | null;
    setData: React.Dispatch<React.SetStateAction<RestObject[] | null>>;
    isLoading: boolean;
    setLoading:  React.Dispatch<React.SetStateAction<boolean>>;
}

import { createContext, useState } from 'react';


export const LoadingContext = createContext<contextprops>({} as contextprops);

export const LoadingProvider = ({ children }: RootLayoutProps) => {
  const [isError, setError] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<RestObject[] | null>(null); 

  return (
    <LoadingContext.Provider value={{ isError, setError, data, setData, isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};