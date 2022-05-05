import React from 'react';
import { useEffect,useState} from 'react';
import { getRoutines, patchRoutine } from '../api';
import { deleteRoutineByRoutineId } from '../api';


const DeleteForm = (props) => {
    
    const {routines, setRoutines} = props;
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    
  
    function handleDeleteRoutine(id) {
        deleteRoutineByRoutineId(id);
        const deletedRoutines = routines.filter(routine => routine.id !== id);
        setRoutines(deletedRoutines);
    }


   return (
        
        <div>
            {routines.map(routine => <div key={routine.id}>
                   
                    <h2>{routine.name}</h2>
                    <p>{routine.goal}</p>
                    <button onClick={() => handleDeleteRoutine(routine.id)}>Delete Routine</button>
                    
                    
                    
                    
                </div>)}
          </div>
    );
}

export default DeleteForm;