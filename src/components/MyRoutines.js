import React, { useEffect, useState } from 'react';
import { deleteRoutineByRoutineId, postRoutine,getMyRoutines, patchRoutine } from '../api';

const MyRoutines = (props) => {

    const {routines, setRoutines, username, user, myRoutines, setMyRoutines } = props;
    const [createName, setCreateName] = useState("");
    const [createGoal, setCreateGoal] = useState("");
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [editOpen, setEditOpen] = useState(false);


console.log(user, username)

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


    const handleEdit = async (id) => {
        const sendRoutine = await patchRoutine(id, name, goal);
       const newMyRoutine = myRoutines.map(routine => {if (routine.id === id) return sendRoutine; else {return routine}})
setMyRoutines(newMyRoutine);
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
                    {<button onClick={(event) => { handleDelete(routine.id, event) }}>Delete</button>}
                </div>
            )}</div>
        </div>
        </div>)
}


export default MyRoutines;