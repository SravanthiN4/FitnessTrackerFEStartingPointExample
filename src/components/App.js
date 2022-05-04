import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './Home';
import Routines from './Routines';
import MyRoutines from './MyRoutines';
import Activities from './Activities';
import User from './User';

const App = () => {
    const [activities, setActivities] = useState([]);    
    const [routines, setRoutines] = useState([]);


    return (
        <div className='app'>
        <BrowserRouter>
        <h1 className='header'>Fitness Tracker</h1>
            <div className="headerBox">
                <div className="routesBox">
                    <button className="button"><Link className='link' to = "/myRoutines">MyRoutines</Link></button>
                    <button className="button"><Link className='link' to = "/activities">Activities</Link></button>
                    <button className="button"><Link className='link' to = "/routines">Routines</Link></button>
                    <button className="button"><Link className='link' to = "/user">User</Link></button> 
                    <button className="button"><Link className='link' to = "/home">Home</Link></button>
                </div>
            </div>
 
            <Route path = "/myRoutines"><MyRoutines/></Route>

            <Route path = "/activities"><Activities activities = {activities} setActivities = {setActivities}/></Route>

            <Route path = "/routines"><Routines routines = {routines} setRoutines = {setRoutines}/></Route>

            <Route path = "/user"><User/></Route> 
       
            <Route path = "/home"><Home/></Route> 
        

        </BrowserRouter>
        </div>
    );
};

export default App;