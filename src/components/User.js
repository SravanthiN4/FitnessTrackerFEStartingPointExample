
import React, {useState} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {CgLogOut} from 'react-icons/cg'


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
                <h1>Welcome, {username}!</h1> <p className='notYou'>Not you?<button className="signOut" onClick={logOut}>Log out <CgLogOut/></button></p>
            </div>
            
        } </> : <div>No user logged in! </div>
    } 
    </div>
    </BrowserRouter>
    );
};


export default User;
