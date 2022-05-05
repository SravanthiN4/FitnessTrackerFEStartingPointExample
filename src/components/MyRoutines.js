import React, {useEffect, useState} from 'react';
import {getRoutines, postRoutine} from '../api';


const MyRoutines = (props) => {
    const {routines, setRoutines} = props;

    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const handleRoutine = async () => {
        console.log("creating a new routine");
        

        const routineData = await postRoutine(name,goal,isPublic)
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

    const handleIsPublic = (event) => {
        setIsPublic(event.target.value);
    }

    return (<div className="activitiesBox">
        <div className="postActivities">
            Name:
            <input value={name}
                onChange={handleNameChange}/>
            Goal :
            <input value={goal}
                onChange={handleGoalChange}/>
           isPublic:
           <input type = 'checkbox' value={isPublic}
                onChange={handleIsPublic}/>
            <button type = 'submit' onClick={handleRoutine}>
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

             <h2>Routine Public: {
                routine.isPublic
            }</h2>

        </div>)
    } </div>);
};

export default MyRoutines;
