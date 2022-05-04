import React, { useEffect, useState } from 'react';
import  { getAllActivities }  from '../api/index';



const Activities = (props) => {
    const {activities, setActivities} = props;

    useEffect(() => {
        (async () => {
            const activities = await getAllActivities();
            console.log("activities",activities);
            setActivities(activities);
        })();
    }, []);
    return (
       
        <div className = "activitiesBox">
           {
               activities.map(activity => 
                    <div className='activities' key = {activity.id}>
                        <h2> Activity Name : {activity.name}</h2>
                        <h2>Activity Description: {activity.description}</h2>

                    {/* <div className='activity'>
                        <h2>Activity Details : </h2>
                        {routine.activities.map(rActivity => <div key = {rActivity.id}>
                            <h2>Name : {rActivity.name}</h2>
                            <h2>Description : {rActivity.description}</h2>
                            <h2>Duration: {rActivity.duration}</h2>
                            <h2>Count: {rActivity.count}</h2>

                        </div>)}

                        </div> */}

                        </div>
                )
           }
        </div>
       
    );
};

export default Activities;