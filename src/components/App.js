import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './Home';
import Routines from './Routines';
import MyRoutines from './MyRoutines';
import Activities from './Activities';
import User from './User';

const App = () => {
 const [routines, setRoutines] = useState([]);
 const [name, setName] = useState("");
 const [goal,setGoal] = useState("");
 const [isPublic,setIsPublic] = useState(false);
 const [activities, setActivities] = useState([]);
 const [isLoggedIn,setIsLoggedIn] = useState(false);

    return (
        <div className='app'>
        <BrowserRouter>
        
            <h1 className='header'>Fitness Tracker</h1>

            <Link className='link' to = "/myRoutines">MyRoutines</Link>
            <Route path = "/myRoutines"><MyRoutines name = {name} setName = {setName} goal = {goal} setGoal = {setGoal} isPublic = {isPublic} setIsPublic = {setIsPublic}/></Route>

            <Link className='link' to = "/activities">Activities</Link>
            <Route path = "/activities"><Activities activities = {activities} setActivities = {setActivities}/></Route>

            <Link className='link' to = "/routines">Routines</Link>
            <Route path = "/routines"><Routines routines = {routines} setRoutines = {setRoutines}/></Route>

            <Link className='link' to = "/user">User</Link>
            <Route path = "/user"><User/></Route> 
       
            <Link className='link' to = "/home">Home</Link>
            <Route path = "/home"><Home/></Route> 

        </BrowserRouter>
        </div>
    );
};

export default App;