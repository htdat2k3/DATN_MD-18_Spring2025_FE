import { CartItem, ProductDetail } from '@/constants/Types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the global state
export interface User {
    full_name: string;
    email: string;
    user_id: number,
    address: string,
    phone_number: string
}

interface GlobalState {
    user: User | null;
    cartsList: CartItem[] | [];
    saveUser: (userData: User) => void;
    saveCartsList: (data: CartItem[]) => void;
}

// Default values for global state
const defaultState: GlobalState = {
    user: null,
    cartsList: [],
    saveUser: () => { },
    saveCartsList: () => { }
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
    const [cartsList, setCartsList] = useState<CartItem[]>([])

    const saveUser = (userData: User) => {
        setUser(userData);
    };

    const saveCartsList = (cartDataList: CartItem[]) => {
        setCartsList(cartDataList)
    }

    return (
        <GlobalStateContext.Provider value={{ user, cartsList, saveUser, saveCartsList }}>
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
