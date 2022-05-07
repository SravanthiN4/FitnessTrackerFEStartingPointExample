import React, { useEffect, useState } from 'react';
import { deleteRoutineByRoutineId, postRoutine, getMe, getMyRoutines, patchRoutine, postActivity, postActivityToRoutine } from '../api';
import UpdateForms from './UpdateForm';

const MyRoutines = (props) => {

    const { routines, setRoutines, username, loggedIn } = props;
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);

    const [isPublic, setIsPublic] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    console.log("publicfirst", isPublic);

    const handleDelete = async (routineId, event) => {
        event.preventDefault();
        await deleteRoutineByRoutineId(routineId);
        console.log("in delete", routines);
        const remainingRoutines = routines.filter((routine) => routineId !== routine.id);
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


    const handleIsPublic = () => {
        setIsPublic(!isPublic)
    }

    const handleCount = (event) => {
        setCount(event.target.value);
    }

    const handleDuration = (event) => {
        setDuration(event.target.value);
    }



    const isAuthorFunction = async (username) => {
        const user = await getMe(username);
        return user;
    }

    const user = isAuthorFunction({ username });
    console.log(user.object)
    // if(user.id === routines.id) {
    //     setIsAuthor(true);
    // }

    const handleEdit = async (id) => {

        const sendRoutine = await patchRoutine(id, name, goal);

    }

    const handleAdd = async () => {

        const sendActivity = await postActivityToRoutine(routineId, activityId, count, duration);

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
                            <h2>{routine.name}</h2>
                            <p>{routine.goal}</p> 

                            {<button key={routine.id} onClick={() => { setEditOpen({ open: !editOpen, id: routine.id }) }} editOpen={editOpen}>Edit</button>}
                            {editOpen.open && editOpen.id === routine.id ? <> Name:
                                <input value={name}
                                    onChange={handleNameChange} />
                                Goal :
                                <input value={goal}
                                    onChange={handleGoalChange} /><button onClick={(event) => { handleEdit(routine.id) }}>Submit Edited Routine</button> </> : null}

                            
                            
                            {<button key={routine.id} onClick={() => { setAddOpen({ open: !addOpen, id: routine.id }) }} addOpen={addOpen}>Add</button>}
                            {addOpen.open && addOpen.id === routine.id ? <> Count:
                                <input value={count}
                                    onChange={handleCount} />
                                Duration :
                                <input value={duration}
                                    onChange={handleDuration} /><button onClick={(event) => { handleAdd(routine.id) }}>Submit Added Activity</button> </> : null}

                            
                            
                            {<button onClick={(event) => { handleDelete(routine.id, event) }}>Delete</button>}

                        </div>
                    )}
                </div>

            </>

        </>)
}


export default MyRoutines;
