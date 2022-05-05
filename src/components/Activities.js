import React, { useEffect, useState } from 'react';
import  { getAllActivities, postActivity }  from '../api/index';



const Activities = (props) => {
    const {activities, setActivities} = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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

                 </div>)

           }
        </div>
       
    );
};

export default Activities;