import React, {useEffect} from 'react';

import { postRoutine,getMyRoutines } from '../api';



const MyRoutines = (props) => {
    const {name, setName} = props;
    const {goal, setGoal} = props;
    const {isPublic, setIsPublic} = props;
    
    const {routines, setRoutines} = props;

    
    const handlePostButtonClick = async() => {
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
      

    return (
       
        <div className='postRoutine'>
               Name: <input value={name} onChange={handleNameChange} />
                Goal :<input value={goal} onChange={handleGoalChange} />
                isPublic : <input value={isPublic} onChange={handleIsPublic} />
               Submit: <button onClick={handlePostButtonClick}>
                Make New Routine Request!
                </button>

                {routines.map (routine => 
                    <div key = {routine.id}>
                    <p>Name : {routine.name}</p>
                    <p>Goal : {routine.goal}</p>
                    <p>isPublic : {routine.isPublic ? "true": "false"}</p>
                    </div>)}
        </div>


    );
};


export default MyRoutines;