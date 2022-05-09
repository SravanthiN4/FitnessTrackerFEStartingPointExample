
import React, {useState, useEffect} from 'react';
import { getMe } from '../api';


const User = (props) => {

    const {loggedIn, setLoggedIn, username, setUsername, user, setUser} = props;
    
    const logOut = () => {
        localStorage.removeItem("UserToken");
        localStorage.removeItem("username");
        setLoggedIn(false);
    }
    
    const userName = localStorage.getItem('username');


    return (<div> {
        loggedIn ? <> {
            <div className='me'>
                <h2>Hello, {userName}</h2> <p>Not you?<button className="LogOut"
        onClick={logOut}>Log out</button>
</p>
            </div>
        } </> : <div>No user logged in! </div>
    } </div>);
};


export default User;
