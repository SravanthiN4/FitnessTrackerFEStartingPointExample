import React, {useState} from "react";
import { patchRoutine } from "../api";


const UpdateForm =  (props) => {

    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const {loggedIn, routines, setRoutines} = props

    const [hasTriggeredError, setHasTriggeredError] = useState(false);
   

    const handleSubmit = async (id) => {
        const newRoutine = {
            name : name,
            goal : goal,
            isPublic : isPublic
            
        }
            
        const sendRoutine = await patchRoutine(newRoutine,id);
        console.log("sendRoutine",sendRoutine);
        setRoutines(sendRoutine);


        const found = routines.find(routine => routine.id === id);
        setRoutines([...routines, sendRoutine, found]);

        setName('');
            setGoal('');
            setIsPublic(false);
           
    }

    
    const handleName = (event) => setName(event.target.value);
    const handleGoal = (event) => setGoal(event.target.value)
    const handlePublic = (event) => setIsPublic(event.target.value)
    

    if (hasTriggeredError) return <p style={{ color: 'red' }}> Whoopse, looks like you need to fix something! </p>

    return (
        <div >
            {!loggedIn ? 
            <>
            <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input type='text' name='Name' value={name} onChange={handleName} />
            <label htmlFor='goal'>Goal</label>
            <input type='text' name='goal' value={goal} onChange={handleGoal} />
            <label htmlFor='isPublic'> Is Public? </label>
            <input type='checkbox' name='isPublic' value={isPublic} onChange={handlePublic} />
                
                <button type='submit'>Submit</button>
            </form> </> :  
            null}
        </div>
    )

}

export default UpdateForm

