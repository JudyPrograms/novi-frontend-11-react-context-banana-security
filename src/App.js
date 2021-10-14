import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// import {AuthContext} from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";


function App() {

    // const {isAuth} = useContext(AuthContext);

    return (
        <>
            <NavBar/>
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/signin">
                        <SignIn/>
                    </Route>
                    <Route exact path="/signup">
                        <SignUp/>
                    </Route>
                    {/*<Route path="/profile">*/}
                    {/*    {isAuth ? <Profile/> : <Redirect to="/"/>}*/}
                    {/*</Route>*/}

                    <PrivateRoute path="/profile">
                        <Profile/>
                    </PrivateRoute>

                </Switch>
            </div>
        </>
    );
}

export default App;
