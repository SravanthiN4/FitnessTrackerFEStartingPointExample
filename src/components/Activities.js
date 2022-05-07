import React, { useEffect, useState } from 'react';
import  { getAllActivities, postActivity }  from '../api/index';



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

        <div className = "contentBox">
            <div className="boxForContent">
            <h1>Take a look at all of our activities!</h1>

           {
               activities.map(activity => 
                    <div className='content' key = {activity.id}>
                        <h2> Activity Name : {activity.name}</h2>
                        <h2>Activity Description: {activity.description}</h2>
                 </div>)
           }
           </div>
        </div>
    );
};

export default Activities;