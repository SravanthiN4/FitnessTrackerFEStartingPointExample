
import React, {useState} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';


const User = (props) => {

    const {loggedIn, setLoggedIn, username} = props;
    console.log("username", {username});
    
    const logOut = () => {
        localStorage.removeItem("UserToken");
        setLoggedIn(false);
    }
    



    return (
    <BrowserRouter>
    <div id="user"> 
        {
        loggedIn ? <> {
            <div className='userContent'>
                <h1>Welcome, {username}!</h1> <p>Not you?<button className="LogOut" onClick={logOut}>Log out</button></p>
            </div>
            
        } </> : <div>No user logged in! </div>
    } 
    </div>
    </BrowserRouter>
    );
};


export default User;
