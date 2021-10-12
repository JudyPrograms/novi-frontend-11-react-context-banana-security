import React, {useState, createContext} from 'react';
import {useHistory} from 'react-router-dom';

export const AuthContext = createContext(false);


function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState(false);
    const history = useHistory();

    const data = {
        isAuth: isAuth,
        loginFunction: login,
        logoutFunction: logout,
    }
    
    function login() {
        toggleIsAuth(true)
        console.log('Gebruiker is ingelogd!')
        history.push('/profile')
    }
    
    function logout() {
        toggleIsAuth(false)
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