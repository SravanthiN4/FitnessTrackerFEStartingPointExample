import React, { useState } from 'react'
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
        <div>
            {loggedIn? <>
            <p>You are already signed in, {username}!</p>
            <p>Not you?<button className="LogOut"
                    onClick={logOut}>Log out</button>
            </p>
        </> : <>
            <div className="login">
                <div> Hello {username}, please enter in your information </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input type='text' name='username' value={username} onChange={handleChange} />
                <label htmlFor='password'>Password:</label>
                <input type='password' name='password' value={password} onChange={handlePasswordChange} />
                {hasTriggeredError &&
                <p style={{ color: 'red' }}> Whoopse, username or password is incorrect! </p>
                }
                <button className="submit" type='submit'>Submit</button>
            </form> 
        </div></> }
        </div>
    )
}
 export default Login;