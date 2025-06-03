"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
}

interface FormProviderProps {
  children: ReactNode;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <FormContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};