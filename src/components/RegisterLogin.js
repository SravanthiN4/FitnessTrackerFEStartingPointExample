import React, {useState} from "react";
import {registerUser} from "../api/index.js";

const RegisterLogin = (props) => {

    

    const [hasTriggeredError, setHasTriggeredError] = useState(false);
    const {loggedIn, setLoggedIn, username, setUsername, password, setPassword} = props;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setUsername('');
        setPassword('');

        const userObject = {
            username: username,
            password: password
        }

        const didRegistrationWork = await registerUser(userObject);
        setLoggedIn(didRegistrationWork);
    }

    const handleChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value)


    const logOut = () => {
        localStorage.removeItem("UserToken");
        setLoggedIn(false);
    }



    return (<div id='SignUp-container'> {
        loggedIn ? <>
            <p>You have already an account and are already signed in, {username}!</p>
            <p>Not you?<button className="LogOut"
                    onClick={logOut}>Log out</button>
            </p>
        </> : <>
            <div>Please Sign Up below:</div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Create Username:</label>
                <input type='text' name='username'
                    value={username}
                    onChange={handleChange}/>
                <label htmlFor='password'>Create Password:</label>
                <input type='password' name='password'
                    value={password}
                    onChange={handlePasswordChange}/> {
                hasTriggeredError && <p style={
                    {color: 'red'}
                }>
                    Whoopse, looks like you need to fix something!
                </p>
            }
                <button id="submit" type='submit'>Submit</button>
            </form>
        </>
    } </div>)

}


export default RegisterLogin
