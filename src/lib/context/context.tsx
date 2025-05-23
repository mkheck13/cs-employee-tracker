'use client'

import { createContext, useContext, useEffect, useState } from "react";

interface AppContext {
    isLoggedIn: boolean;
    setIsLoggedIn: (bool: boolean) => void;
    employeeId: number;
    setEmployeeId: (id: number) => void;
    jobTitles: string[];
}

const AppContext = createContext<AppContext>({
    isLoggedIn: false,
    setIsLoggedIn: (bool: boolean) => '',
    employeeId: 0,
    setEmployeeId: (id: number) => {},
    jobTitles: []
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [employeeId, setEmployeeId] = useState(0);

        const jobTitles = [
        "Customer Support",
        "IT Support Specialist",
        "Software Engineer"
    ];

    useEffect(() => {
        const checkLogin = () => {
            let loggedIn = false;

            if(localStorage.getItem('user')) loggedIn = true;
            if(sessionStorage.getItem('user')) loggedIn = true;
        
            setIsLoggedIn(loggedIn);
        }

        checkLogin();
    }, [])

    return (
        <AppContext.Provider value={ { isLoggedIn, setIsLoggedIn, employeeId, setEmployeeId, jobTitles } } >
            { children}
        </AppContext.Provider >
    )
}

export const useAppContext = () => useContext(AppContext);