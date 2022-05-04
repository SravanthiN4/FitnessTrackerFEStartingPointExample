import React, {useState, useEffect} from 'react';
import { getAllActivities} from '../api'


// need to getAllActivities if a user is not logged in
// need to getActivities 

const Activities = (props) => {
console.log(getAllActivities)

    const {activities, setActivities} = props;


useEffect(() => {
    (async () => {
        const activities = await getAllActivities();
        console.log(activities)
        setActivities(activities);
    })();
}, []);


    return (

        <div>
            {
            activities.map( activity => 
                   <div className="activity" key = {activity.id}> 
                   <h2>Activity Name: {activity.name}</h2>
                   <h2>Activitiy Description: {activity.description}</h2>
                   </div>)
            }

        </div>
    
    );
};

export default Activities;