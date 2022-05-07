import React, { useEffect, useState } from 'react';
import { deleteRoutineByRoutineId, postRoutine, getMe, getMyRoutines, patchRoutine } from '../api';
import UpdateForms from './UpdateForm';

const MyRoutines = (props) => {

    const { routines, setRoutines, username, loggedIn } = props;
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
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
                                    onChange={handleGoalChange} /><button onClick={handleEdit(routine.id)}>Submit Edited Routine</button> </> : null}

                            {<button onClick={(event) => { handleDelete(routine.id, event) }}>Delete</button>}

                        </div>
                    )}
                </div>

            </>

        </>)
}


export default MyRoutines;
