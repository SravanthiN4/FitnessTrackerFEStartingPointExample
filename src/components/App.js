import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi'
import {FaRegIdCard} from 'react-icons/fa'
import {BiRun} from 'react-icons/bi'
import {GiWeightLiftingUp} from 'react-icons/gi'
import {CgUserList} from 'react-icons/cg'
import Routines from './Routines';
import MyRoutines from './MyRoutines';
import Activities from './Activities';
import MyActivities from './MyActivities';
import User from './User';
import Login from './Login'
import RegisterLogin from './RegisterLogin';
import { getRoutines, getMe, getMyRoutines} from '../api';

import { getAllActivities } from '../api';


const App = () => {
 const [routines, setRoutines] = useState([]);
 const [myRoutines, setMyRoutines] = useState([]);
 const [activities, setActivities] = useState([]);
 const[user, setUser] = useState();
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

const [loggedIn, setLoggedIn] = useState(false);

 useEffect(async () => {
    const allRoutines = await getRoutines();
    setRoutines(allRoutines);
 },[setRoutines])

 
//  const [username, setUsername] = useState('');
//  const [password, setPassword] = useState('');

 useEffect(async () => {
    const user = await getMe(username);
    setUser(user);
    setUsername(user.username)
}, [setUsername]);

// useEffect(async () => {
//     const routines = await getMyRoutines(username);
//     console.log("routines",routines);
//     setMyRoutines(routines);
// }, [setMyRoutines]);


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
                    {!loggedIn? <>
                    <button className="button"><Link id='link' to="/login">Login <FiLogIn/></Link></button>
                    <button className="button"><Link id='link' to="/signUp">SignUp <FaRegIdCard/> </Link></button>
                    <button className="button"><Link id='link' to="/routines">Public Routines <GiWeightLiftingUp/> </Link></button> 
                    <button className="button"><Link id='link' to="/activities">Public Activities <BiRun/> </Link></button>
                    </> : <>
                    <button className="button"> <Link id='link' to="/user">User <CgUserList/> </Link></button>  
                    <button className="button"><Link id='link' to="/myRoutines">MyRoutines <CgUserList/> <GiWeightLiftingUp/></Link></button> 
                    <button className="button"><Link id='link' to="/myActivities">MyActivities <CgUserList/> <BiRun/> </Link></button>
                    <button className="button"><Link id='link' to="/routines">Public Routines <GiWeightLiftingUp/> </Link></button> 
                    <button className="button"><Link id='link' to="/activities">Public Activities <BiRun/> </Link></button></>} </div>
                </div>
    
                    <Route path="/login"><Login setLoggedIn={setLoggedIn}loggedIn={loggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/></Route>
                    <Route path="/signUp"><RegisterLogin setLoggedIn={setLoggedIn} loggedIn={loggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/></Route>
                    <Route path="/user"><User loggedIn={loggedIn} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername}/></Route> 
                    <Route path ="/routines"><Routines routines = {routines} setRoutines = {setRoutines} username = {username}/></Route>  
                    <Route path = "/myRoutines"><MyRoutines routines = {routines} setRoutines = {setRoutines} loggedIn={loggedIn}/></Route>
                    <Route path = "/activities"><Activities activities = {activities} setActivities = {setActivities}/></Route>
                    <Route path = "/myActivities">< MyActivities activities = {activities} setActivities = {setActivities}/></Route>

            </BrowserRouter>
        </div>);
        }
        export default App;


