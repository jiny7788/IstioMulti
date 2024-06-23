import {createContext, useState } from "react";
import LocalStorage from "../utils/local-storage";
import { ACCESS_TOKEN } from "../constants";

export const AuthContext = createContext({
    auth: false,        // login 여부
    setAuth: () => {},
    signIn: () => {},   // login 함수
    signOut: () => {},  // logout 함수
});

export const AuthContextProvider = ({children}) => {
    const storage = new LocalStorage(ACCESS_TOKEN);
    const [auth, setAuth] = useState(
        storage.get() !== null && storage.get() !== undefined);
    const signIn = () => {
        console.log('singIn.....');
        storage.set('accessToken');
        setAuth(true);
    };
    const signOut = () => {
        console.log('signOut....');
        storage.remove();
        setAuth(false);
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};