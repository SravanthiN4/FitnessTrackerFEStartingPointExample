//As any user on the Routines tab, I want to:

//see a list of all public routines showing:
//The routine name, goal, and creator's username
//A list of activities for the routine, 
//including their name, description, and duration and/or count

import React, { useEffect, useState } from 'react';
import  { getRoutines }  from '../api/index';



const Routines = (props) => {
    const {routines, setRoutines} = props;

    useEffect(() => {
        (async () => {
            const routines = await getRoutines();
            setRoutines(routines);
        })();
    }, []);
    return (
       
        <div>
           {
               routines.map(routine => 
                    <div className='routine' key = {routine.id}>
                        <h2>Routine Name : {routine.name}</h2>
                        <h2>Routine Goal : {routine.goal}</h2>
                        <h2>Routine Creator : {routine.creatorName}</h2>

                    <div className='activity'>
                        <h2>Activity Details : </h2>
                        {routine.activities.map(rActivity => <div key = {rActivity.id}>
                            <h2>Name : {rActivity.name}</h2>
                            <h2>Description : {rActivity.description}</h2>
                            <h2>Duration: {rActivity.duration}</h2>
                            <h2>Count: {rActivity.count}</h2>

                        </div>)}

                        </div>

                        </div>
                )
           }
        </div>
       
    );
};

export default Routines;