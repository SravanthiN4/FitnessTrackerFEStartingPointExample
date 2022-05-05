import React, { useEffect, useState } from 'react';
import  { getAllActivities, postActivity }  from '../api/index';



const myActivities = (props) => {
    const {activities, setActivities} = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handlePostActivity = async () => {
        console.log("creating a new activity");

        const activityData = await postActivity(name, description)
        console.log("activityData", activityData)

        const newActivityList = [activityData, ...activities]
        console.log("newActivityList", newActivityList)
        setActivities(newActivityList);

        setName("");
        setDescription("");
 }

        const handleNameChange = (event) => {
            setName(event.target.value);
        }

        const handleDescriptionChange = (event) => {
            setDescription(event.target.value);
        }


    return (

    
       
        <div className = "activitiesBox">
            <div className="postActivities">
                Name: <input value={name} onChange={handleNameChange}/>
                Description : <input value={description} onChange={handleDescriptionChange}/>
                <button onClick={handlePostActivity}>
                    Submit New Activity
                    </button>
            </div>

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

export default myActivities;