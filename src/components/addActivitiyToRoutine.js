import React, {useState} from 'react';
import {postActivityToRoutine } from '../api';



const AddActivitiesToRoutines = (props) => {

   // const {routines, setRoutines} = props;
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);
    const {activities, setActivities} = props;

   
 const handleRoutine = async () => {
        console.log("creating a new activity");


        const routineActivityData = await postActivityToRoutine(routineId, activityId, count, duration)
        console.log("routineData", routineActivityData)


        const newActivityRoutineList = [
            routineActivityData,
            ...activities
        ]
        console.log("newActivityRoutineList", newActivityRoutineList)
        setActivities(newActivityRoutineList);

        setCount(0);
        setDuration(0);
       
    }

    const handleCountChange = (event) => {
        setCount(event.target.value);
    }

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    }

    return (
        
        <div className='contentBox'>
        <div className="boxForContent">
            Name:
            <input value={count}
                onChange={handleCountChange}/>
            Goal :
            <input value={duration}
                onChange={handleDurationChange}/>
    
            <button onClick={handleRoutine}>
                Submit New Routine with Activity
            </button>
            </div>
       {
        activities.map(activity => <div className='activities'
            key={
                activity.id
        }>
            <h2>
               
                Activity Count : {
                activity.count
            }</h2>
            <h2>Routine Duration: {
                activity.duration
            }</h2>
            
             
        </div>)
    } </div>);


}

export default AddActivitiesToRoutines;
