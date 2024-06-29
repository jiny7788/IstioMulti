import {createContext, useState } from "react";
import LocalStorage from "../utils/local-storage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import UserService from "../apis/UserService";
import CryptoJS from 'crypto-js';

export const AuthContext = createContext({
    auth: false,        // login 여부
    setAuth: () => {},
    signIn: () => {},   // login 함수
    signOut: () => {},  // logout 함수
});

export const AuthContextProvider = ({children}) => {
    const storage = new LocalStorage(ACCESS_TOKEN);
    const refreshToken = new LocalStorage(REFRESH_TOKEN);
    const [auth, setAuth] = useState(
        storage.get() !== null && storage.get() !== undefined);
    const signIn = (id, password) => {
        // 비밀번호 암호화
        var pwdWordArray = CryptoJS.enc.Utf8.parse(password);
        var s256 = CryptoJS.SHA512(pwdWordArray);
        var base64 = CryptoJS.enc.Base64.stringify(s256);

        // 암보화된 비밀번호와 사용자가 입력한 비밀번호 비교
        let user = {
            userId: id,
            userPassword: base64,
        };

        UserService.login(user).then((res) => {
            if (res.data.accessToken !== null && res.data.accessToken !== undefined) {
                storage.set(res.data.accessToken);
                refreshToken.set(res.data.refreshToken);
                setAuth(true);
            } else {
                storage.remove();
                refreshToken.remove();
                setAuth(false);                
                alert('등록되지 않은 사용자이거나 비밀번호가 일치하지 않습니다.');
            }
        });
    };

    const signOut = () => {
        storage.remove();
        refreshToken.remove();
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