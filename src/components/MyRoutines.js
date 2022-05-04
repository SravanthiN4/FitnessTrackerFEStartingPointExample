import React from 'react';
import { postRoutine } from '../api';



const MyRoutines = (props) => {
    const {name, setName} = props;
    const {goal, setGoal} = props;
    const {isPublic, setIsPublic} = props;
    

    const handlePostButtonClick = async() => {
        console.log("Create a Routine ...");
       const data = await postRoutine(name,goal,isPublic);
        console.log(data);
        const newRoutine = data.routine;

        console.log(newRoutine);

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
      

    return (
       
        <div className='postRoutine'>
               Name: <input value={name} onChange={handleNameChange} />
                Goal :<input value={goal} onChange={handleGoalChange} />
                isPublic : <input value={isPublic} onChange={handleIsPublic} />
               Submit: <button onClick={handlePostButtonClick}>
                Make New Routine Request!
                </button>
        </div>
      
       
    );
};

export default MyRoutines;