import React, { useState } from 'react';
import { login } from '../api/index';



const Login = (props) => {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const [hasTriggeredError, setHasTriggeredError] = useState(false);
    const {setLoggedIn, loggedIn, username, setUsername, password, setPassword} = props;

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        setUsername('');
        setPassword('');
        
        const userObject = {
            username: username,
            password: password
        }

        const didLoggedInWork = await login(userObject);
        if (didLoggedInWork === false) {
            setHasTriggeredError(true);
        } else {
        setLoggedIn(didLoggedInWork);}

    }

    const logOut = () => {
        localStorage.removeItem("UserToken");
        setLoggedIn(false);

    }

    const handleChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value)

    
    return (
        <div className="login">
            {loggedIn? <>
            <p>You are already signed in, {username}!</p>
            <p>Not you?<button className="LogOut"
                    onClick={logOut}>Log out</button>
            </p>
        </> : <>
            <div className="login-content">
                <div> Hello {username}, please enter in your information </div>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor='username'>Username:</label>
                <input type='text' name='username' value={username} onChange={handleChange} />
                </div>

                <div>
                <label htmlFor='password'>Password:</label>
                <input type='password' name='password' value={password} onChange={handlePasswordChange} />
                </div>

                {hasTriggeredError &&
                <p style={{ color: 'red' }}> Whoopse, username or password is incorrect! </p>
                }
                <div id='submitButton'>
                <button className="submit" type='submit'>Submit</button>
                </div>
            </form> 
        </div></> }
        </div>
    )
}
 export default Login;