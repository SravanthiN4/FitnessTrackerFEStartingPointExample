import React, {useState} from "react";
import {registerUser} from "../api/index.js";

const RegisterLogin = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [hasTriggeredError, setHasTriggeredError] = useState(false);
    const {loggedIn, setLoggedIn} = props


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

    if (hasTriggeredError) 
        return <p style={{ color: 'red' }}> Whoopse,
        looks like you need to fix something !</p>

    

    return (
    
    <div id='SignUp-container'>
            {!loggedIn? <>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Create Username:</label>
                <input type='text' name='username' value={username} onChange={handleChange} />
                <label htmlFor='password'>Create Password:</label>
                <input type='password' name='password' value={password} onChange={handlePasswordChange} />
                {hasTriggeredError &&
                    <p style={{ color: 'red' }}> Whoopse, looks like you need to fix something! </p>
                }
                <button id="submit" type='submit'>Submit</button>
            </form> </> :
            <p>You already have an account and are signed in!</p>}
        </div>)

}


export default RegisterLogin
