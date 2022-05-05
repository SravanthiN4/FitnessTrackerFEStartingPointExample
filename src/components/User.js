import React from 'react';


const User = (props) => {

    const {loggedIn, setLoggedIn, username} = props;
    
    const logOut = () => {
        localStorage.removeItem("UserToken");
        setLoggedIn(false);
    }

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
