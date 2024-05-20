import React, { createContext, useEffect, useState } from "react";
import { IAuthProvider, IContext, IUser } from "./types";
import { LoginRequest, ProfileRequest, getUserLocalStorage, setUserLocalStorage } from "./util";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        const user = getUserLocalStorage();

        if (user) {
            setUser(user);
        }
    }, []);

    async function authenticate (email: string, password: string) {
        const response = await LoginRequest(email, password);

        const payload = {token: response.tokens.access, email};

        setUser(payload);
        setUserLocalStorage(payload);
    }

    async function getProfile (access_token: string) {
        const response = await ProfileRequest(access_token);

        const data = {name: response.name, email: response.email, avatar: response.avatar.high};
        
        return data;
    }


    function logout () {
        setUser(null);
        setUserLocalStorage(null);
    }

    return (
        <AuthContext.Provider value={{...user, authenticate, logout, getProfile}}>
            {children}
        </AuthContext.Provider>
    )
}