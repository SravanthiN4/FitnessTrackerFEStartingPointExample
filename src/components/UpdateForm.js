import React, {useState} from "react";
import { patchRoutine } from "../api";


const UpdateForms =  (props) => {

    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState('');
    const {loggedIn, routines, setRoutines} = props;

    const [hasTriggeredError, setHasTriggeredError] = useState(false);
   

    const handleSubmit = async (id) => {
        event.preventDefault();
            
        
        const newRoutine = {
                name: name,
                goal: goal,
                isPublic: isPublic
            
        }
        const sendRoutine = await patchRoutine(newRoutine,id);
        console.log(sendRoutine);
        setRoutines(sendRoutine);

        setName('');
        setGoal('');
            
    }

    
    const handleName = (event) => setName(event.target.value);
    const handleGoal = (event) => setGoal(event.target.value)
    const handlePublic = (event) => setIsPublic(event.target.value)

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
            <label htmlFor='goal'>Public</label>
            <input type='checkbox' name='isPublic' value={isPublic} onChange={handlePublic} />
                
                <button id="summit" type='submit'>Submit</button>
            </form> </> :  
            null}
        </div>
    )

}



export default UpdateForms