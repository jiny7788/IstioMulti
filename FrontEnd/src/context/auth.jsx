import {createContext, useState } from "react";
import LocalStorage from "../utils/local-storage";
import { ACCESS_TOKEN } from "../constants";
import UserService from "../apis/UserService";

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
    const signIn = (id, password) => {
        UserService.getOneUser(id).then((res) => {
            if (res.data.userPassword === password) {
                storage.set('accessToken');
                setAuth(true);
            } else {
                storage.remove();
                setAuth(false);                
                alert('비밀번호가 일치하지 않습니다.');
            }
        });
    };

    const signOut = () => {
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