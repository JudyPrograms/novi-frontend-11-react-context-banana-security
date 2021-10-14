import React, {useState, createContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from "axios";
import jwt_decode from 'jwt-decode';
// import jwtDecode from "jwt-decode"; HEEFT DIT EEN ANDERE WERKING ????????????????????????????????????????????


export const AuthContext = createContext({});


function AuthContextProvider({children}) {

    // Context initialiseren:
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: {},
        status: 'pending',
    });

    // WERKT NIET !!!!!!!!!!! WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET
    const [userData, setUserData] = useState({})

    const history = useHistory();

    // data die wordt meegegeven aan context.provider element in de return van dit context component
    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        loginFunction: login,
        logoutFunction: logout,
    }

    // wat moet gebeuren als er gerefresht wordt en er is al een token of nog niet
    useEffect(() => {

        const token = localStorage.getItem('token')

        if (token) {

            // // gegevens ophalen (zie login functie??????)
            // async function getUser(token, user) {
            //     try {
            //         const result = await axios.get(`http://localhost:3000/600/users/${user}`, {
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 Authorization: `Bearer ${token}`,
            //             }
            //         })
            //         console.log("Function getUser, try is gelukt")
            //
            //         console.log("Result from get request:", result)
            //
            //         // !!!!!!!!!!!
            //         // setUserData({
            //         //     email: result.data.email,
            //         //     username: result.data.username,
            //         //     id: result.data.id,
            //         // })
            //
            //     } catch (e) {
            //         console.error(e.response.data)
            //     }
            //
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                // !!!!!!!!!!!
                // user: userData,
                status: 'done',
            })
            // }

        } else {

            toggleIsAuth({
                ...isAuth,
                status: 'done',
            })

        }

        console.log(token)

    }, [])

    // functie die wordt gebruikt bij het inloggen op SignIn.js
    function login(jwToken) {

        localStorage.setItem('token', jwToken)

        const decodedToken = jwt_decode(jwToken)

        // functie om gebruikersgegevens op te halen:
        async function getUser(token, user) {
            try {
                const result = await axios.get(`http://localhost:3000/600/users/${user}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                console.log("Function getUser, try is gelukt")

                console.log("Result from get request:", result)

                // WERKT NIET !!!!!!!!!!! WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET
                setUserData({
                    email: result.data.email,
                    username: result.data.username,
                    id: result.data.id,
                })

            } catch (e) {
                console.error(e.response.data)
            }

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                // WERKT NIET !!!!!!!!!!! WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET  WERKT NIET
                user: userData,
            })

            console.log("Username after toggleIsAuth:", isAuth.user)

            console.log('Gebruiker is ingelogd!')
            history.push('/profile')

        }

        // specifieke gebruikersgegevens ophalen met token en user id
        getUser(jwToken, parseInt(decodedToken.sub))
    }

    // functie die wordt gebruikt bij het uitloggen
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
            {/* alleen als er een token is wordt de status 'done' en de app.js gerenderd*/}
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;