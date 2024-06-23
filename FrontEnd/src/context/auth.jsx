import {createContext, useState } from "react";

export const AuthContext = createContext({
    auth: false,        // login 여부
    setAuth: () => {},
    signIn: () => {},   // login 함수
    signOut: () => {},  // logout 함수
});

export const AuthContextProvider = ({children}) => {
    const [auth, setAuth] = useState(false);
    const signIn = () => {
        console.log('singIn.....');
        setAuth(true);
    };
    const signOut = () => {
        console.log('signOut....');
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