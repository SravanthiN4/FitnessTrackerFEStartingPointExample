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
    const [activityEditOpen, setActivityEditOpen] = useState(false);

    const [editName, setEditHandleName] = useState("");
    const [editGoal, setEditHandleGoal] = useState("");

    const [editCount, setEditCount] = useState(0);
    const [editDuration, setEditDuration] = useState(0);



useEffect(() => { (async () => {
  const getActivityRoutine = await getAllActivities();
  setActivityList(getActivityRoutine)
})();
}, []);

const handleDeleteActivity = async (routineActivityId, event) => {
  event.preventDefault();
 const deletedActivity =  await deleteRoutine_Activity(routineActivityId);
  const userName = localStorage.getItem('username');
  const myRoutines = await getMyRoutines(userName);
  setMyRoutines(myRoutines);
}



    const handleDelete = async (routineId, event) => {
        event.preventDefault();
        await deleteRoutineByRoutineId(routineId);
        const remainingRoutines = myRoutines.filter((routine) => routineId !== routine.id);
        setRoutines(remainingRoutines);
    }
 
    // const handleCreateRoutine = async () => {
    //     console.log("creating a new routine");
    //     const routineData = await postRoutine(name, goal, isPublic)
    //     setName("");
    //     setGoal("");
    //     setIsPublic(false);
    //     const userName = localStorage.getItem('username');
    //     const myRoutines = await getMyRoutines(userName);
    //     setMyRoutines(myRoutines);
      
    // }

    const handleCreateRoutine = async (event) => {
      event.preventDefault();
      console.log("creating a new routine");
      try{const routineData = await postRoutine(name, goal, isPublic)
      const newRoutineList = [
          routineData,
          ...routines
      ]
      setMyRoutines(newRoutineList);}
      catch(error){
        console.log(error)
      }
  }

    const handleNameChange = (event) => {
      event.preventDefault();
        setName(event.target.value);
    }

    const handleGoalChange = (event) => {
      event.preventDefault();
        setGoal(event.target.value);
    }

    const handleCreateNameChange = (event) => {
      event.preventDefault();
      setCreateName(event.target.value);
  }

  const handleCreateGoalChange = (event) => {
    event.preventDefault();
      setCreateGoal(event.target.value);
  }

    const handleIsPublic = () => {
        setIsPublic(!isPublic)
    }


const handleCount = (event) => {
  event.preventDefault();
    setCount(event.target.value);
}

const handleDuration = (event) => {
  event.preventDefault();
   setDuration(event.target.value);
}


const handleEditCount = (event) => {
  event.preventDefault();
setEditCount(event.target.value);
}

const handleEditDuration = (event) => {
  event.preventDefault();
    setEditDuration(event.target.value)
}


    const handleEdit = async (id) => {
        const sendRoutine = await patchRoutine(id, name, goal);
       const newMyRoutine = myRoutines.map(routine => {if (routine.id === id) return sendRoutine; else {return routine}})
setMyRoutines(newMyRoutine);
    }

    const handleEditActivity = async (routineActivityId) => {
      const sendRoutineActivity = await patchRoutine_Activity(routineActivityId, editCount, editDuration);
      const userName = localStorage.getItem('username');
      const myRoutines = await getMyRoutines(userName);
      setMyRoutines(myRoutines);
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
      setMyRoutines(myRoutines);
      })();
    }, []);
    
        return (<div>
           <div> <h2>Create a new routine:</h2>
           <form onSubmit={(event) => { handleCreateRoutine(event) }}>
                <div>
                <label htmlFor='name'>Name:</label>
                <input type='text' name='name' value={createName} onChange={handleCreateNameChange} />
                </div>

                <div>
                <label htmlFor='goal'>Goal:</label>
                <input type='goal' name='goal' value={createGoal} onChange={handleCreateGoalChange} />
                </div>

                <div>
                <label htmlFor='isPublic'>Is Public?</label>
                <input type='checkbox' name='isPublic' value={isPublic} onChange={handleIsPublic} />
                </div>

                <div id='submitButton'>
                <button className="submit" type='submit'>Submit new routine</button>
                </div>
            </form> 
          
        </div> 
        <div> <h2> Here all your routines </h2> 

        <div>{!myRoutines? <div> Nothing to show, yet! Add a routine! </div> : <div> {myRoutines.map(routine =>
                <div className="activities" key={routine.id}>
                    <h2>routine name: {routine.name}</h2>
                    <p>routine goal: {routine.goal}</p> 
                    <div>{routine.activities.map(activity => <div key ={activity.id}>
                    <p>activity name:{activity.name}</p>
                    <p>activity description:{activity.description}</p>
                    <p>activity count:{activity.count}</p>
                    <p>activity duration:{activity.duration}</p>
                    
                    {<button key={activity.id} onClick={() => { setActivityEditOpen({ open: !activityEditOpen, id: activity.id }) }} activityEditOpen={activityEditOpen}>Edit Activity</button>}
                                {activityEditOpen.open && activityEditOpen.id === activity.id ? <> New Activity count:
                                <input value={editCount}
                                    onChange={handleEditCount} />
                                New Activity Duration :
                                <input value={editDuration}
                                    onChange={handleEditDuration} /><button onClick={(event) => { handleEditActivity(activity.routineActivityId, event) }}>Submit Edited Activity</button> </> : null}
                            
                            {<button onClick={(event) => { handleDeleteActivity(activity.routineActivityId, event) }}>DeleteActivity</button>}
                    </div>)}</div>
                    { 
                            <button key={routine.name} onClick={() => { setAddOpen({ open: !addOpen, id: routine.id }) }} addOpen={addOpen}>Add an activity to a routine</button>}

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
                            
                            <label>
                                Activities <span>({ activityList.length })</span>
                            </label>
                            <select 
            
                                value={ activity } 
                                onChange={(event) => setActivity(event.target.value)}>
                                <option value="any">Select a new activity to add</option>
                                {activityList.map((activity, idx) =>
                                <option key={ `${ idx }:${ activity.name }`} value={ activity.id }>
                                { activity.name }
                                </option>
                                )}
                            </select>
   
                            <button onClick={(event) => { handleAdd(routine.id,event) }}>Submit Added Activity</button> 
                            
                            </> 
      
                            : null}



                    {<button key={routine.id} onClick={() => { setEditOpen({ open: !editOpen, id: routine.id }) }} editOpen={editOpen}>Edit the routine</button>}
                    {editOpen.open && editOpen.id === routine.id ? <> New Routine Name:
                        <input value={name}
                            onChange={handleNameChange} />
                        New Routine Goal :
                        <input value={goal}
                            onChange={handleGoalChange} /><button onClick={(event) => {handleEdit(routine.id, event)}}>Submit Edited Routine</button> </> : null}
                   
                   
                   
                   
                    {<button onClick={(event) => { handleDelete(routine.id, event) }}>Delete</button>}
                </div>
            ) }</div> }</div>
        </div>
        </div>)
}


export default MyRoutines;