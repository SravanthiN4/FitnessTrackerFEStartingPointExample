import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './Home';
import Routines from './Routines';
import MyRoutines from './MyRoutines';
import Activities from './Activities';
import User from './User';
import Login from './Login'
import RegisterLogin from './RegisterLogin';

const App = () => {


    const [loggedIn, setLoggedIn] = useState(false);
    const [routines, setRoutines] = useState([])

    useEffect(() => {
        setLoggedIn(!!localStorage.getItem("UserToken"))
    }, []);


    const logOut = () => {
        localStorage.removeItem("UserToken");
        setLoggedIn(false);

    }

    return (<div className='app'>
        
        
            <BrowserRouter>
                <div id="header">
                    <h1 className='header'>Fitness Tracker
                    </h1>
                    <div id="myProfile">


                        <Link className='link' to="/login">Login</Link>
                        <Route path="/login"><Login setLoggedIn={setLoggedIn}
                                loggedIn={loggedIn}/>Login</Route>

                        <Link className='link' to="/signUp">SignUp</Link>
                        <Route path="/signUp"
                            setLoggedIn={setLoggedIn}
                            loggedIn={loggedIn}><RegisterLogin/>Sign Up</Route>

                        <Link className='link' to="/user">User</Link>
                        <Route path="/user" loggedIn={loggedIn}><User/>
                            <div>
                                <Link className='link' to="/myRoutines">MyRoutines</Link>
                                <Route path="/myRoutines"><MyRoutines/></Route>
                                <button className="LogOut"
                                    onClick={logOut}>Log out</button>
                            </div>

                        </Route>

                    </div>

                </div>


                <Link className='link' to="/activities">Activities</Link>
                <Route path="/activities"><Activities/></Route>


                <Link className='link' to="/home">Home</Link>
                <Route path="/home"><Home/></Route>
                <Link className='link' to="/routines">Routines</Link>
                <Route path="/routines"><Routines routines={routines}
                        setRoutines={setRoutines}/></Route>


            </BrowserRouter>


        </div>);
        }
        export default App;
