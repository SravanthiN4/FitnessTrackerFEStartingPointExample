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
        setLoggedIn(didLoggedInWork);
       
    }

    const logOut = () => {
        localStorage.removeItem("UserToken");
        setLoggedIn(false);

    }

    const handleChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value)

    if (hasTriggeredError) return <p style={{ color: 'red' }}> Whoopse, looks like you need to fix something! </p>
    return (
        <div className="login">
        <div>
            {!loggedIn? 

                <div className='login-content'>
           { username.length === 0 ?
                <div id='login-text'> Welcome back! Please login below: </div> :
                
                <div> Hello {username}, please enter in your information </div>}
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
                <p style={{ color: 'red' }}> Whoopse, looks like you need to fix something! </p>
                }
                <div id='submitButton'>
                <button className="submit" type='submit'>Submit</button>
                </div>
            </form> 
        </div>
:
            <><p>You are already signed in!</p><p>Not you?<button className="LogOut"
            onClick={logOut}>Log out</button></p></>}
        </div>
        </div>
    )
}
 export default Login;