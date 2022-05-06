import React, {useState} from "react";
import { patchRoutine } from "../api";



const UpdateForms =  (props) => {

    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const { routines, setRoutines} = props

    const [hasTriggeredError, setHasTriggeredError] = useState(false);
   

    const handleUpdateRoutine = async (event) => {
        event.preventDefault();
            
        
        const newRoutine = {
                name: name,
                goal: goal,
                isPublic: isPublic
            }

        const sendRoutine = await patchRoutine(newRoutine);
        setRoutines(sendRoutine);

        const found = routines.find(routine => routine.id === id);
        setRoutines([...routines, sendRoutine, found]);
    }

    
    const handleName = (event) => setName(event.target.value);
    const handleGoal = (event) => setGoal(event.target.value);
    
    if (hasTriggeredError) return <p style={{ color: 'red' }}> Whoopse, looks like you need to fix something! </p>



return (
        
    <div>
        {routines && routines.map(routine => <div key={routine.id}>
                <h2>{routine.name}</h2>
                <p>{routine.goal}</p>
                <div>
                <label>New Name</label>
                <input onChange={handleName}></input>
                <label>New Goal</label>
                <input onChange={handleGoal}></input>
            
                <button onClick={() => handleUpdateRoutine(routine.id)}>Update Routine</button>
                </div>
            </div>)}
      </div>
);
}

export default UpdateForms