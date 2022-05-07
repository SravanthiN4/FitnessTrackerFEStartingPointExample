import React, {useEffect, useState} from 'react';
import { deleteRoutineByRoutineId, postRoutine } from '../api';
import AddActivitiesToRoutines from './AddActivitiyToRoutine';

import UpdateForms from './UpdateForm';

const MyRoutines = (props) => {

    const {routines, setRoutines} = props;
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [editOpen, setEditOpen] = useState(false)
    console.log("publicfirst",isPublic);

    const handleDelete = async (routineId, event) => {
        event.preventDefault();
        await deleteRoutineByRoutineId(routineId);
        console.log("in delete",routines);
        const remainingRoutines = routines.filter((routine) => routineId !== routine.id);
        setRoutines(remainingRoutines);
    }

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

    const handleIsPublic = () => {
        setIsPublic(!isPublic)
    }

    return (
        
        <div className='contentBox'>
        <div className="boxForContent">
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

             {<button key={routine.id} onClick={() => {setEditOpen({open:!editOpen, id: routine.id})}} editOpen={editOpen}>Add</button>}
            {editOpen.open && editOpen.id === routine.id ? <AddActivitiesToRoutines id={routine.id}/> : null}
            
             
        </div>)
    } </div>);


}

export default MyRoutines;
