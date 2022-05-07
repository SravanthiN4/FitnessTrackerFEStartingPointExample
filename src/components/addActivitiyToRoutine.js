import React, {useEffect, useState} from 'react';
import { postActivityToRoutine } from '../api';





const addActivityToRoutine = (props) => {

    const {routines, setRoutines} = props;
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);
    const [activityId, setActivityId] = useState(0);
    

    
    const handleAddActivityToRoutine = async () => {
        console.log("creating a new activity to routine");


        const routineData = await postActivityToRoutine(count,duration)
        console.log("routineData", routineData)

        const newRoutineList = [
            routineData,
            ...routines
        ]
        console.log("newRoutineList", newRoutineList)
        setRoutines(newRoutineList);

        setName("");
        setGoal("");
        setIsPublic(false);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleGoalChange = (event) => {
        setGoal(event.target.value);
    }

    const handleIsPublic = () => {
        setIsPublic(!isPublic)
    }

    


    return (
        <div className="activitiesBox">
        <div className="postActivities">
            Name:
            <input value={name}
                onChange={handleNameChange}/>
            Goal :
            <input value={goal}
                onChange={handleGoalChange}/>
            Public :
            <input type="checkbox"
            name="isPublic"
            value={isPublic} 
            onChange={handleIsPublic} />
    
            <button onClick={handleRoutine}>
                Submit New Routine
            </button>
        </div>
        


        {
        routines.map(routine => <div className='activities'
            key={
                routine.id
        }>
            <h2>
               
                Routine Name : {
                routine.name
            }</h2>
            <h2>Routine Goal: {
                routine.goal
            }</h2>
            
            {<button key={routine.id} onClick={() => {setEditOpen({open:!editOpen, id: routine.id})}} editOpen={editOpen}>Edit</button>}
            {editOpen.open && editOpen.id === routine.id ? <UpdateForms id={routine.id}/> : null}

             {<button onClick = {(event)=> {handleDelete(routine.id, event)}}>Delete</button>}
        </div>)
    } </div>);


}
     
     


export default MyRoutines;
