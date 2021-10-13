import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from "./components/PrivateRoute";

function App() {

    return (
        <>
            <NavBar/>
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/signin">
                        <SignIn/>
                    </Route>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>

                    {/*Ik krijg deze helaas nog niet aan de praat omdat ik volgens de foutmelding geen {children} mag
                    plaatsen op deze manier. Zie ook PrivateRoute-component. Ik snap dit niet, jij?*/}
                    {/*<PrivateRoute path="/profile">*/}
                    {/*    <Profile/>*/}
                    {/*</PrivateRoute>*/}

                </Switch>
            </div>
        </>
    );
}

export default App;
