import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function PrivateRoute({children, ...rest}) {

    const {isAuth} = useContext(AuthContext);

    return (
        <Route {...rest}>
            {/*Ik krijg deze helaas nog niet aan de praat omdat ik volgens de foutmelding geen {children} mag
            plaatsen op deze manier. Ik snap dit niet, jij?*/}
            {isAuth ? {children} : <Redirect to='/'/>}
        </Route>
    );
}

export default PrivateRoute;