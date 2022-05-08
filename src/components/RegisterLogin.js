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
       if (didRegistrationWork === false) {
           setHasTriggeredError(true);
       } else {
        setLoggedIn(didRegistrationWork);}
    }


    const handleChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value)


    const logOut = () => {
        localStorage.removeItem("UserToken");
        setLoggedIn(false);
    }



    return (
        <div className="Signup">
            {loggedIn ? 
                <div>
                    <p>You have already an account and are already signed in, {username}!</p>
                    <p>Not you?<button className="LogOut"
                            onClick={logOut}>Log out</button>
                    </p>
                </div>:
                
            <div>
                <>
                <div className="Signup-content">
                    <p>Please Sign Up below:</p>
        
                    <form onSubmit={handleSubmit}>
                     <div>
                        <label htmlFor='username'>Create Username:</label>
                        <input type='text' name='username'value={username} onChange={handleChange}/>
                    </div>
        
                    <div>
                        <label htmlFor='password'>Create Password:</label>
                        <input type='password' name='password' value={password}onChange={handlePasswordChange}/> {hasTriggeredError && <p style={{color: 'red'}}>Whoopse, looks like you need to fix something! Please check password length!</p>}
                    </div>
        
                        <div id='submitButton'>
                        <button className="submit" type='submit'>Submit</button>
                        </div>         
                    </form>
                </div>
                </>
            </div>
            } 
        </div>
        )
        }

export default RegisterLogin