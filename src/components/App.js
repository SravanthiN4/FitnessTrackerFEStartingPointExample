import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './Home';
import Routines from './Routines';
import MyRoutines from './MyRoutines';
import Activities from './Activities';
import User from './User';

const App = () => {
    // useEffect(async () => {
    //     console.log("IN HERE")
    //     const res = await fetch("https://fitnesstrac-kr.herokuapp.com/api/activities")
    //     // const res = await fetch("heroku-link");
    //     // const res = await fetch("localhost:3000");
    //     const json = await res.json();
    //     // setReq(json);
    //     console.log(json)
    //     // return () => { }
    // }, [])

    return (
        <div className='app'>
        <BrowserRouter>
        
            <h1 className='header'>Fitness Tracker</h1>

            <Link className='link' to = "/myRoutines">MyRoutines</Link>
            <Route path = "/myRoutines"><MyRoutines/></Route>

            <Link className='link' to = "/activities">Activities</Link>
            <Route path = "/activities"><Activities/></Route>

            <Link className='link' to = "/routines">Routines</Link>
            <Route path = "/routines"><Routines/></Route>

            <Link className='link' to = "/user">User</Link>
            <Route path = "/user"><User/></Route> 
       
            <Link className='link' to = "/home">Home</Link>
            <Route path = "/user"><Home/></Route> 

           

            

            

           
        
        </BrowserRouter>
        </div>
    );
};

export default App;