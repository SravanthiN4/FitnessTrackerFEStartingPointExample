import React, {useState} from 'react';

import { postRoutine, deleteRoutineByRoutineId } from '../api';
import UpdateForm from './UpdateForm';



const MyRoutines = (props) => {
    const {name, setName} = props;
    const {goal, setGoal} = props;
    const {isPublic, setIsPublic} = props;
    const [editOpen, setEditOpen] = useState(false)
    
    const {routines, setRoutines} = props;

    //delete routine
    
     function handleDeleteRoutine(id) {
        deleteRoutineByRoutineId(id);

        const newRoutine = routines.filter(routine => routine.id !== id);
        setRoutines(newRoutine);
    }

    //create routine
    const handleRoutineButtonClick = async() => {
        console.log("Create a Routine ...");
        
       const data = await postRoutine(name,goal,isPublic);
        console.log("data",data);
        

        
        const newRoutineList = [data, ...routines]
        console.log("newlist",newRoutineList);
        setRoutines(newRoutineList);
        

        setName("");
        setGoal("");
        setIsPublic(false);
        
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
      }
      const handleGoalChange = (event) => {
        setGoal(event.target.value);
      }
      const handleIsPublic = (event) => {
        setIsPublic(event.target.value);
      }

     console.log("routines", routines);

    return (
       
        <div className='postRoutine'>
               Name: <input value={name} onChange={handleNameChange} />
                Goal :<input value={goal} onChange={handleGoalChange} />
                <label htmlFor='isPublic'> Is Public? </label>
                 <input type='checkbox' name='isPublic' value={isPublic} onChange={handleIsPublic} />
               Submit: <button onClick={handleRoutineButtonClick}>
                Make New Routine Request!
                </button>

                {routines.map (routine => 
                    <div key = {routine.id}>
                    <p>Name : {routine.name}</p>
                    <p>Goal : {routine.goal}</p>
                    <p>isPublic : {routine.isPublic ? "true": "false"}</p>
                    
                    <button onClick={() => handleDeleteRoutine(routine.id)}>Delete Routine</button> 
                    
                    { <button key={routine.id} onClick={() => {setEditOpen({open:!editOpen, id: routine.id})}} editOpen={editOpen}>Edit</button>}
                    { editOpen.open && editOpen.id === routine.id ? <UpdateForm routineId={routine.id}/> : null}
                    </div>

                    )}
                
        </div>


    );
};



export default MyRoutines;