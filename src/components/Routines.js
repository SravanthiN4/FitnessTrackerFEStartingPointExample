//As any user on the Routines tab, I want to:

//see a list of all public routines showing:
//The routine name, goal, and creator's username
//A list of activities for the routine, 
//including their name, description, and duration and/or count

import React, { useEffect, useState } from 'react';
import  { getRoutines }  from '../api';



const Routines = (props) => {
    const {routines, setRoutines} = props;

    useEffect(() => {
        (async () => {
            const routines = await getRoutines();
            setRoutines(routines);
        })();
    }, []);
    return (
       <div className='contentBox'>
        <div className="boxForContent">
           {
               routines.map(routine => 
                    <div className='content' key = {routine.id}>
                        <h2>Routine Name : {routine.name}</h2>
                        <h2>Routine Goal : {routine.goal}</h2>
                        <h2>Routine Creator : {routine.creatorName}</h2>

                        
                    <h2>Activity Details : </h2>

           {  routine.activities ? (
						routine.activities.map((rActivity) => (
							<div key={rActivity.id}>
								
								<h2>Name : {rActivity.name}</h2>
                                <h2>Description : {rActivity.description}</h2>
                                <h2>Duration: {rActivity.duration}</h2>
                                <h2>Count: {rActivity.count}</h2>
                            </div>
							
						))
					) : null}
                   
                 </div>
                )
           }
        </div>
        </div>
       
    );
};

export default Routines;