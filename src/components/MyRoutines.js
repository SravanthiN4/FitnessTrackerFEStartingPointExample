import React, {useState, useEffect } from 'react';
import { deleteRoutineByRoutineId, postRoutine, getMe, patchRoutine, postActivityToRoutine, deleteRoutine_Activity, patchRoutine_Activity, getAllActivities } from '../api';


const MyRoutines = (props) => {

    const { routines, setRoutines, username, activities, setActivities } = props;
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [count, setCount] = useState(0);
    const [activityId, setActivityId] = useState(0);
    const [duration, setDuration] = useState(0);
    const [activityList, setActivityList] = useState([]);
    const [activity, setActivity] = useState('any');
    
    const [addedCount,setAddedCount] = useState(0);
    const [addedDuration, setAddDuration] = useState(0);
    const [addedActivityId, setNewActivityId] = useState(0);
    
    

    const [isPublic, setIsPublic] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [activityOpen, setActivityOpen] = useState(false);

      
    useEffect(async () => {
        const getActivityRoutine = await getAllActivities();
        setActivities(activityList);
     },[setActivities])

    //delete routine
    const handleDelete = async (routineId, event) => {
        event.preventDefault();
        await deleteRoutineByRoutineId(routineId);
        console.log("in delete", routines);
        const remainingRoutines = routines.filter((routine) => routineId !== routine.id);
        setRoutines(remainingRoutines);
    }

    //delete activity
    const handleDeleteActivity = async (routineActivityId, event) => {
        event.preventDefault();
       const deletedActivity =  await deleteRoutine_Activity(routineActivityId);
        console.log("in activity delete", deletedActivity);
        const remainingRoutines = routines.filter((routine) => routineActivityId !== routine.id);
        setRoutines(remainingRoutines);
    }

    
 //create routine
    const handleRoutine = async (event) => {
        event.preventDefault();
        console.log("creating a new routine");


        const routineData = await postRoutine(name, goal, isPublic)
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

    const handleCount = (event) => {
        setCount(event.target.value);
    }

   const handleDuration = (event) => {
       setDuration(event.target.value);
   }

   const handleActivityId = (event) => {
        setActivityId(event.target.value);
    }


    // const isAuthorFunction = async (username) => {
    //     const user = await getMe(username);
    //     return user;
    // }

    // const user = isAuthorFunction({ username });
    // console.log(user.object)
   
    //routine update
    const handleEdit = async (id) => {

        const sendRoutine = await patchRoutine(id, name, goal);

    }

    //routine activity update
    const handleEditActivity = async (routineActivityId) => {

        const sendRoutineActivity = await patchRoutine_Activity(routineActivityId, count, duration);

    }
    
    //add activity to routine
    const handleAdd = async (routineId,event) => {
        
        event.preventDefault();
        const sendActivity = await postActivityToRoutine(routineId, activityId, count, duration);
        const newCount = sendActivity.count;
        const newDuration = sendActivity.duration;
        const newActivityId = sendActivity.activityId;
        setAddedCount(newCount);
        setAddDuration(newDuration);
        setNewActivityId(newActivityId);

    }

    return (

        <> <div>
            <div className="boxForContent">
                Name:
                <input value={name}
                    onChange={handleNameChange} />
                Goal :
                <input value={goal}
                    onChange={handleGoalChange} />
                Public :
                <input type="checkbox"
                    name="isPublic"
                    value={isPublic}
                    onChange={handleIsPublic} />

                <button onClick={handleRoutine}>
                    Submit New Routine
                </button>
            </div>
        </div>
            <>
                <div> 
                    {routines.map(routine =>
                        <div className="activities" key={routine.id}>
                            <h2>Routine Name : {routine.name}</h2>
                            <p> Routine Goal : {routine.goal}</p> 
                            
                           
                            {<button key={routine.id} onClick={() => { setEditOpen({ open: !editOpen, id: routine.id }) }} editOpen={editOpen}>Edit</button>}
                            {editOpen.open && editOpen.id === routine.id ? <> Name:
                                <input value={name}
                                    onChange={handleNameChange} />
                                Goal :
                                <input value={goal}
                                    onChange={handleGoalChange} /><button onClick={(event) => { handleEdit(routine.id) }}>Submit Edited Routine</button> </> : null}
            
                            { 
                            <button key={routine.name} onClick={() => { setAddOpen({ open: !addOpen, id: routine.id }) }} addOpen={addOpen}>Add</button>}

                                {addOpen.open && addOpen.id === routine.id ? 
                                
                                <> 
                                Count:
                                <input value={count}
                                    onChange={handleCount} />
                                Duration :
                                <input value={duration}
                                    onChange={handleDuration} />
                                ActivityId:
                                <input value={activityId}
                                    onChange={handleActivityId}/>
   
                            <button onClick={(event) => { handleAdd(routine.id,event) }}>Submit Added Activity</button> 
                            
                                <p>Count : {addedCount}</p>
                                <p>Duration : {addedDuration}</p>
                                <p>ActivityId : {addedActivityId}</p>
                          
                          
                            <label>
                                Activities <span>({ activityList.length })</span>
                            </label>
                            <select 
            
                                value={ activity } 
                                onChange={(event) => setActivities(event.target.value)}>
                                <option value="any">Any</option>
                                {activityList.map((activity, idx) =>
                                <option key={ `${ idx }:${ activity.name }`} value={ activity.name }>
                                { activity.name }
                                </option>
                                )}
                            </select>
                            

                                {<button onClick={(event) => { handleDeleteActivity(activityId, event) }}>DeleteActivity</button>}
                            
                                {<button key={routine.id} onClick={() => { setActivityOpen({ open: !activityOpen, id: routine.id }) }} activityOpen={activityOpen}>Edit Activity</button>}
                                {activityOpen.open && activityOpen.id === routine.id ? <> Name:
                                <input value={count}
                                    onChange={handleCount} />
                                Goal :
                                <input value={duration}
                                    onChange={handleDuration} /><button onClick={(event) => { handleEditActivity(routine.id) }}>Submit Edited Routine</button> </> : null}
                            
                            </> 
      
                            : null}

                            
                            {<button onClick={(event) => { handleDelete(routine.id, event) }}>Delete</button>}
                            
                        </div>
                        
                    )}
                </div>

            </>

        </>)
}




export default MyRoutines;

