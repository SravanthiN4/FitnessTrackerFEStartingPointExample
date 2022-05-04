

import React, { useEffect, useState } from 'react';
import  { getMe }  from '../api/index';

const User = (props) => {
      
   const {loggedIn} = props;

const [me, setMe] = useState()

   async () => {
            const me = await getMe();
            setMe(me);
            console.log(me)
        }
    return (
        <div>
           {!loggedIn? <> 
                <div className='me' key = {me}>
                        <h2>Hello, {me}</h2>
                </div>
                        </> : <div>No user logged in!</div>}

        </div>
       
    );
};


export default User;


