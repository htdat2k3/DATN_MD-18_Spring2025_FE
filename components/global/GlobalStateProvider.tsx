import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the global state
export interface User {
    full_name: string;
    email: string;
}

interface GlobalState {
    user: User | null;
    saveUser: (userData: User) => void;
}

// Default values for global state
const defaultState: GlobalState = {
    user: null,
    saveUser: () => { },
};

// Create the Global State Context
const GlobalStateContext = createContext<GlobalState>(defaultState);

// Define props for the provider
interface GlobalStateProviderProps {
    children: ReactNode;
}

// Create the GlobalStateProvider component
export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const saveUser = (userData: User) => {
        setUser(userData);
    };

    return (
        <GlobalStateContext.Provider value={{ user, saveUser }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook for using the global state
export const useGlobalState = (): GlobalState => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};
