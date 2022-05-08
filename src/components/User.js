
import React, {useState, useEffect} from 'react';
import { getMe } from '../api';


const User = (props) => {

<<<<<<< HEAD
    const {loggedIn, setLoggedIn, username} = props;
    console.log("username", {username});
=======
    const {loggedIn, setLoggedIn, username, setUsername, user, setUser} = props;
>>>>>>> BranchToFixUserExp-Co-
    
    const logOut = () => {
        localStorage.removeItem("UserToken");
        setLoggedIn(false);
    }
    



     useEffect(async () => {
        const user = await getMe(username);
        setUser(user);
        setUsername(user.username)
        console.log(user);
    }, []);

    return (<div> {
        loggedIn ? <> {
            <div className='me'>
                <h2>Hello, {username}</h2> <p>Not you?<button className="LogOut"
        onClick={logOut}>Log out</button>
</p>
            </div>
        } </> : <div>No user logged in! </div>
    } </div>);
};


export default User;
