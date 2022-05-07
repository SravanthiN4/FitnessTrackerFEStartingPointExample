import React, {useState} from "react";
import { patchRoutine } from "../api";


const UpdateForms =  (props) => {

    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState('');
    const {routines, setRoutines} = props;
    const {loggedIn} = props;

    const [hasTriggeredError, setHasTriggeredError] = useState(false);
    console.log("routines",routines);
   
    const handleSubmit = async (event,id) => {
        event.preventDefault();
    
        const newRoutine = {
                name: name,
                goal: goal,
            
        }
        const sendRoutine = await patchRoutine(id, name, goal);
        console.log("afterupdate",routines);

        const found = routines.find(routine => routine.id === id);
        console.log(found);
        setRoutines([...routines, sendRoutine, found]);

      
    }

    
    const handleName = (event) => setName(event.target.value);
    const handleGoal = (event) => setGoal(event.target.value)

    if (hasTriggeredError) return <p style={{ color: 'red' }}> Whoopse, looks like you need to fix something! </p>

    return (
        <div>
            {!loggedIn ? 
            <>
            <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='Name' value={name} onChange={handleName} />
            <label htmlFor='goal'>Goal</label>
            <input type='text' name='goal' value={goal} onChange={handleGoal} />
                
                <button type='submit'>Submit</button>
            </form> </> :  
            null}
        </div>
    )

}



export default UpdateForms