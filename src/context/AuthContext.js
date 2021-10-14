import React, {useState, createContext} from 'react';
import {useHistory} from 'react-router-dom';

export const AuthContext = createContext({});


function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: "",
    });

    const history = useHistory();

    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        loginFunction: login,
        logoutFunction: logout,
    }
    
    function login(email) {
        toggleIsAuth({
            ...isAuth,
            isAuth: true,
            user: email,
        })
        console.log('Gebruiker is ingelogd!')
        history.push('/profile')
    }
    
    function logout() {
        toggleIsAuth({
            ...isAuth,
            isAuth: false,
        })
        console.log('Gebruiker is uitgelogd!')
        history.push('/')
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;