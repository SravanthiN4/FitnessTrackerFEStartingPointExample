import React, { useEffect, useState } from 'react';
import { deleteRoutineByRoutineId, postRoutine,getMyRoutines, patchRoutine, postActivityToRoutine, deleteRoutine_Activity, patchRoutine_Activity, getAllActivities } from '../api';

const MyRoutines = (props) => {

    const {routines, setRoutines, username, user, myRoutines, setMyRoutines, activities, setActivities } = props;
    const [createName, setCreateName] = useState("");
    const [createGoal, setCreateGoal] = useState("");
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [activityId, setActivityId] = useState(0);
    const [duration, setDuration] = useState(0);
    const [activityList, setActivityList] = useState([]);
    const [activity, setActivity] = useState('any');
    
    const [addedCount,setAddedCount] = useState(0);
    const [addedDuration, setAddDuration] = useState(0);
    const [addedActivityId, setNewActivityId] = useState(0);
    const [addOpen, setAddOpen] = useState(false);
    const [activityOpen, setActivityOpen] = useState(false);

    const [editName, setEditHandleName] = useState("");
    const [editGoal, setEditHandleGoal] = useState("");

    const [editCount, setEditCount] = useState(0);
    const [editDuration, setEditDuration] = useState(0);


console.log(user, username)

useEffect(async () => {
  const getActivityRoutine = await getAllActivities();
  setActivityList(getActivityRoutine)
  console.log("ar",getActivityRoutine);
},[])

const handleDeleteActivity = async (routineActivityId, event) => {
  event.preventDefault();
 const deletedActivity =  await deleteRoutine_Activity(routineActivityId);
  console.log("in activity delete", deletedActivity);
  const remainingRoutines = routines.filter((routine) => routineActivityId !== routine.id);
  setRoutines(remainingRoutines);
}



    const handleDelete = async (routineId, event) => {
        event.preventDefault();
        await deleteRoutineByRoutineId(routineId);
        console.log("in delete", myRoutines);
        const remainingRoutines = myRoutines.filter((routine) => routineId !== routine.id);
        setRoutines(remainingRoutines);
    }
 
    const handleRoutine = async () => {
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

    const handleCreateNameChange = (event) => {
      setCreateName(event.target.value);
  }

  const handleCreateGoalChange = (event) => {
      setCreateGoal(event.target.value);
  }

    const handleIsPublic = () => {
        setIsPublic(!isPublic)
    }

    const handleName = (event) => {
      setName(event.target.value);
  }

  const handleGoal = (event) => {
      setGoal(event.target.value);
  }

  const editHandleName = (event) => {
    setEditHandleName(event.target.value);
}
const editHandleGoal = (event) => {
    setEditHandleGoal(event.target.value);
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

const handleEditCount = (event) => {
setEditCount(event.target.value);
}

const handleEditDuration = (event) => {
    setEditDuration(event.target.value)
}


    const handleEdit = async (id) => {
        const sendRoutine = await patchRoutine(id, name, goal);
       const newMyRoutine = myRoutines.map(routine => {if (routine.id === id) return sendRoutine; else {return routine}})
setMyRoutines(newMyRoutine);
    }

    const handleEditActivity = async (routineActivityId) => {

      const sendRoutineActivity = await patchRoutine_Activity(routineActivityId, count, duration);

  }
  
  //add activity to routine
  const handleAdd = async (routineId,event) => {
      
      event.preventDefault();
      const sendActivity = await postActivityToRoutine(routineId, activity, count, duration);
      const newCount = sendActivity.count;
      const newDuration = sendActivity.duration;
      const newActivityId = sendActivity.activityId;
      setAddedCount(newCount);
      setAddDuration(newDuration);
      setNewActivityId(newActivityId);

  }


    useEffect(() => { (async () => {
      const userName = localStorage.getItem('username');
      const myRoutines = await getMyRoutines(userName);
      console.log("myRoutines", myRoutines, typeof(myRoutines), JSON.parse(JSON.stringify(myRoutines)));
      setMyRoutines(myRoutines);
      })();
    }, []);
    
        return (<div>
           <div> <h2>Create a new routine:</h2>
            <div className="boxForContent">
                Name:
                <input value={createName}
                    onChange={handleCreateNameChange} />
                Goal :
                <input value={createGoal}
                    onChange={handleCreateGoalChange} />
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
        <div><p></p></div>
        <div> <h2> Here all your routines </h2> 
       {/* <pre><code>{JSON.stringify(myRoutines, null, 2)}</code></pre> */}

        <div>{myRoutines.map(routine =>
                <div className="activities" key={routine.name}>
                    <h2>{routine.name}</h2>
                    <p>{routine.goal}</p> 
                    {<button key={routine.id} onClick={() => { setEditOpen({ open: !editOpen, id: routine.id }) }} editOpen={editOpen}>Edit</button>}
                    {editOpen.open && editOpen.id === routine.id ? <> Name:
                        <input value={name}
                            onChange={handleNameChange} />
                        Goal :
                        <input value={goal}
                            onChange={handleGoalChange} /><button onClick={(event) => {handleEdit(routine.id, event)}}>Submit Edited Routine</button> </> : null}
                   
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
                                <input value={activity}
                                    onChange={(event) => setActivity(event.target.value)}/>
   
                            <button onClick={(event) => { handleAdd(routine.id,event) }}>Submit Added Activity</button> 
                            
                                <p>Count : {addedCount}</p>
                                <p>Duration : {addedDuration}</p>
                                <p>ActivityId : {addedActivityId}</p>
                          
                          
                            <label>
                                Activities <span>({ activityList.length })</span>
                            </label>
                            <select 
            
                                value={ activity } 
                                onChange={(event) => setActivity(event.target.value)}>
                                <option value="any">Any</option>
                                {activityList.map((activity, idx) =>
                                <option key={ `${ idx }:${ activity.name }`} value={ activity.id }>
                                { activity.name }
                                </option>
                                )}
                            </select>
                            

                                {<button onClick={(event) => { handleDeleteActivity(activities.id, event) }}>DeleteActivity</button>}
                            
                                {<button key={routine.id} onClick={() => { setActivityOpen({ open: !activityOpen, id: routine.id }) }} activityOpen={activityOpen}>Edit Activity</button>}
                                {activityOpen.open && activityOpen.id === routine.id ? <> Name:
                                <input value={editCount}
                                    onChange={handleEditCount} />
                                Goal :
                                <input value={editDuration}
                                    onChange={handleEditDuration} /><button onClick={(event) => { handleEditActivity(routine.id) }}>Submit Edited Routine</button> </> : null}
                            
                            </> 
      
                            : null}
                   
                   
                    {<button onClick={(event) => { handleDelete(routine.id, event) }}>Delete</button>}
                </div>
            )}</div>
        </div>
        </div>)
}


export default MyRoutines;