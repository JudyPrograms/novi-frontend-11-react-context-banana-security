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
        status: 'pending',
        user: null,
    });
    console.log("1e log context provider na initialize, en na useEffect():", isAuth)

    const history = useHistory();

    // data die wordt meegegeven aan context.provider element in de return van dit context component
    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        loginFunction: login,
        logoutFunction: logout,
    }

    // na een refresh checken of er een token in de local storage staat > zo ja, dan blijft isAuth true
    // en de gebruiker blijft ingelogd, op basis daarvan wordt de pagina gerenderd
    useEffect(() => {

        const jwToken = localStorage.getItem('token')

        if (jwToken) {

            const decodedToken = jwt_decode(jwToken)

            // gegevens ophalen (zie login async functie, die is precies hetzelfde, waarom dubbel ??????)
            // ******************************************************
            async function getUser(token, user) {
                try {
                    const result = await axios.get(`http://localhost:3000/600/users/${user}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    })

                    toggleIsAuth({
                        ...isAuth,
                        isAuth: true,
                        status: 'done',
                        user: {
                            email: result.data.email,
                            username: result.data.username,
                            id: result.data.id,
                        },
                    })

                    console.log('Gebruiker is ingelogd!')
                    history.push('/profile')

                } catch (e) {
                    console.error(e.response.data)
                }
            }
            getUser(jwToken, decodedToken.sub)

            // *****************************************

        } else {

            toggleIsAuth({
                ...isAuth,
                isAuth: false,
                status: 'done',
                user: null,
            })

        }

        // check of token er echt is
        console.log(jwToken)

    }, [])

    // functie die wordt gebruikt bij het clicken op button inloggen op SignIn.js
    // deze functie wordt async getriggerd door de login button in SignIn.js
    // jwToken is de result.data.accessToken van de post request
    function login(jwToken) {

        // verkregen access token in de local storage zetten zodat bij refresh gebruiker ingelogd blijft
        localStorage.setItem('token', jwToken)
        // access token decoderen om data uit te kunnen lezen
        const decodedToken = jwt_decode(jwToken)
        console.log("login functie is aangeroepen, decodedToken:", decodedToken)

        // functie om gebruikersgegevens op te halen
        async function getUser(token, user) {
            try {
                const result = await axios.get(`http://localhost:3000/600/users/${user}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                console.log("getUser functie is aangeroepen, try is gelukt")
                console.log("Result from get request:", result)

                // check of object met gebruikersdata te lezen is:
                console.log(result.data)
                // gebruikersdata in de context opslaan:
                toggleIsAuth({
                    ...isAuth,
                    isAuth: true,
                    status: 'done',
                    user: {
                        email: result.data.email,
                        username: result.data.username,
                        id: result.data.id,
                    },
                })
                // WAAROM GAAT IE TERUG NAAR REGEL 19 EN DOET IE DE VOLGENDE CODE PAS NA EEN RE-RENDER?:
                // checken of userdata in context is opgeslagen:
                console.log("User details after toggleIsAuth:", isAuth.user)

                // als inloggen gelukt is, dan naar profielpagina doorverwijzen:
                console.log('Gebruiker is ingelogd!')
                history.push('/profile')

            } catch (e) {
                console.error(e.response.data)
            }
        }

        // specifieke gebruikersgegevens ophalen met token en user id via de async functie getUser()
        getUser(jwToken, parseInt(decodedToken.sub))
    }

    // functie die wordt gebruikt bij het uitloggen
    function logout() {

        localStorage.removeItem('token')

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