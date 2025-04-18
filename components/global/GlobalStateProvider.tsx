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
    voucher_id: number | null
    cartsList: CartItem[] | [];
    sale : number | null,
    saveUser: (userData: User) => void;
    saveVoucherId: (data: number) => void;
    saveCartsList: (data: CartItem[]) => void;
    saveSale : (data : number) => void ;
}

// Default values for global state
const defaultState: GlobalState = {
    user: null,
    voucher_id: null,
    cartsList: [],
    sale : null,
    saveUser: () => { },
    saveVoucherId: () => { },
    saveCartsList: () => { },
    saveSale: () => { }
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
    const [voucher_id, setVoucherId] = useState<number | null>(null);

    const [cartsList, setCartsList] = useState<CartItem[]>([])
    const [sale, setSaveSale] = useState<number | null>(null)

    const saveUser = (userData: User) => {
        setUser(userData);
    };

    const saveVoucherId = (data: number) => {
        setVoucherId(data)
    }

    const saveCartsList = (cartDataList: CartItem[]) => {
        setCartsList(cartDataList)
    }
    const saveSale = (data : number) => {
        setSaveSale(data)
    }

    return (
        <GlobalStateContext.Provider value={{ user, voucher_id, cartsList, sale , saveUser, saveVoucherId, saveCartsList, saveSale }}>
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
