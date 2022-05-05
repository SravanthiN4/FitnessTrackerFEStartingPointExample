import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './Home';
import Routines from './Routines';
import MyRoutines from './MyRoutines';
import Activities from './Activities';
import myActivities from './myActivities';
import User from './User';
import Login from './Login'
import RegisterLogin from './RegisterLogin';
import { getAllActivities } from '../api';

const App = () => {
 const [routines, setRoutines] = useState([]);
 const [activities, setActivities] = useState([]);

//  userEffect(()=> {
//      allActivities = await getAllActivities;
     
//  })

 const [name, setName] = useState("");
 const [goal,setGoal] = useState("");
 const [isPublic,setIsPublic] = useState(false);
 




    const [loggedIn, setLoggedIn] = useState(false);


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
                <h1 className='header'>Fitness Tracker</h1>
                    <div id= "buttonRoutesBox">
                     <button className="button"><Link id='link' to="/login">Login</Link></button>
                     <button className="button"><Link id='link' to="/signUp">SignUp</Link></button>
                     <button className="button"><Link id='link' to="/user">User</Link></button>  
                     <button className="button"><Link id='link' to="/myRoutines">MyRoutines</Link></button>  
                     <button className="button"><Link id='link' to="/myActivities">MyActivities</Link></button>  

                    </div>
                </div>

                <div id="myProfile">
                        <Route path="/login"><Login setLoggedIn={setLoggedIn}
                                loggedIn={loggedIn}/>Login
                        </Route>

                        <Route path="/signUp"
                            setLoggedIn={setLoggedIn}
                            loggedIn={loggedIn}><RegisterLogin/>Sign Up
                        </Route>

                        <Route path="/user" loggedIn={loggedIn}><User/>
                            <div>
                                <Route path="/myRoutines"><MyRoutines/></Route>
                                <button className="LogOut"
                                    onClick={logOut}>Log out</button>
                            </div>

                            <div>
                            <Route path="/myActivities"><myActivities/></Route>
                                <button className="LogOut"
                                    onClick={logOut}>Log out</button> 
                            </div>

                        </Route>

    

                    </div>


            <div className='link'>
               
             <Link id='routineLink' to = "/routines">Routines</Link>
             <Route path = "/routines"><Routines routines = {routines} setRoutines = {setRoutines}/></Route>  

            <Link className='link' to = "/myRoutines">MyRoutines</Link>
            <Route path = "/myRoutines"><MyRoutines name = {name} setName = {setName} goal = {goal} setGoal = {setGoal} isPublic = {isPublic} setIsPublic = {setIsPublic} routines = {routines} setRoutines = {setRoutines}/></Route>

            <Link id='activitiesLink' to = "/activities">Activities</Link>
            <Route path = "/activities"><Activities activities = {activities} setActivities = {setActivities}/></Route>

            <Link id='myActivitiesLink' to ='myActivities'>My Activities</Link>
            <Route path = '/myActivities' ></Route>
             </div>
           


            </BrowserRouter>


        </div>);
        }
        export default App;


