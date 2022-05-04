const baseUrl = 'https://fitnesstrac-kr.herokuapp.com/api';


export const registerUser = async (userObject) => {
    const url = `${baseUrl}/users/register`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
    })
    const json = await response.json();

    if (json.data === null) {
        return false;
    } else {
        localStorage.setItem('UserToken', json.data.token);
        return true;
    }
}


export const login = async (userObject) => {
    const URL = `${baseUrl}/users/login`;

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
    })
    const json = await response.json();

    if (json.data === null) {
        return false;
    } else {
        localStorage.setItem('UserToken', json.data.token);
        return true;
    }
}


export const getMe = async () => {
    const URL = `${baseUrl}/users/me`;
    try {
        const url = `${baseUrl}/users/me`;
        console.log(url);
        const token = localStorage.getItem('UserToken')
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("this is my getMe error!", error)
    }
}


export const getMyRoutines = async (username) => {

    const token = localStorage.getItem('UserToken');
    let response;
    try {
        if (token) {
            response = await fetch(`${baseUrl}/users/${username}/routines`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })

        } else {
            response = await fetch(`${baseUrl}/users/${username}/routines`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
        const returnedRoutine = await response.json()
        return returnedRoutine;

    } catch (error) {
        console.log("error in getMyRoutines!")
        throw error;
    }

};


export const getAllActivities = async () => {

    let response;
    try {
        response = await fetch(`${baseUrl}/activities`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const returnedActivities = await response.json()
        return returnedActivities;
    } catch (error) {
        console.log("error in getAllActivities!")
        throw error;
    }

}

export const postActivity = async (name, description) => {
    const token = localStorage.getItem('UserToken');
    let response;
    try {
        response = await fetch(`${baseUrl}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(
                {name: name, description: description}
            )
        })
        const postedActivity = await response.json()
        return postedActivity;
    } catch (error) {
        console.log("error in postActivity!")
        throw error;
    }
}


export const patchActivity = async (activityId, name, description) => {

    let response;
    try {
        response = await fetch(`${baseUrl}/activities/${activityId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {name: name, description: description}
            )
        })
        const patchedActivity = await response.json()
        return patchedActivity;
    } catch (error) {
        console.log("error in patchActivity!")
        throw error;
    }
}


export const getRoutineByActivityId = async (activityId) => {

    let response;
    try {
        response = await fetch(`${baseUrl}/activities/${activityId}/routines`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const routines = await response.json()
        return routines;
    } catch (error) {
        console.log("error in getRoutineByActivityId!")
        throw error;
    }
}


export const getRoutines = async () => {

    let response;
    try {
        response = await fetch(`${baseUrl}/routines`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const routines = await response.json()
        console.log("api",routines)
        return routines;
    } catch (error) {
        console.log("error in getRoutines!")
        throw error;
    }
}

export const postRoutine = async (name, goal, isPublic) => {
    const token = localStorage.getItem('UserToken');
    let response;
    try {
        response = await fetch(`${baseUrl}/routines`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(
                {name: name, goal: goal, isPublic: isPublic}
            )
        })
        const postedRoutine = await response.json()
        return postedRoutine;
    } catch (error) {
        console.log("error in postRoutine!")
        throw error;
    }
}


export const patchRoutine = async (routineId, name, goal, isPublic) => {
    const token = localStorage.getItem('UserToken');
    let response;
    try {
        response = await fetch(`${baseUrl}/routines/${routineId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(
                {name: name, goal: goal, isPublic: isPublic}
            )
        })
        const patchedRoutine = await response.json()
        return patchedRoutine;
    } catch (error) {
        console.log("error in patchRoutine!")
        throw error;
    }
}


export const deleteRoutineByRoutineId = async (routineId) => {
    const token = localStorage.getItem('UserToken');
    let response;
    try {
        if (token) {
            response = await fetch(`${baseUrl}/routines${routineId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })

        }
        const deletedRoutine = await response.json()
        return deletedRoutine;
    } catch (error) {
        console.log("error in deleteRoutine!")
        throw error;
    }
}


export const postActivityToRoutine = async (routineId, activityId, count, duration) => {
    const token = localStorage.getItem('UserToken');
    let response;
    try {
        response = await fetch(`${baseUrl}/routines/${routineId}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(
                {activityId: activityId, count: count, duration: duration}
            )
        })
        const postedActivityToRoutine = await response.json()
        return postedActivityToRoutine;
    } catch (error) {
        console.log("error in postActivityToRoutine!")
        throw error;
    }
}

export const patchRoutine_Activity = async (routineActivityId, count, duration) => {
    const token = localStorage.getItem('UserToken');
    let response;
    try {
        response = await fetch(`${baseUrl}/routine_activities/${routineActivityId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(
                {count: count, duration: duration}
            )
        })
        const patched_routine_activity = await response.json()
        return patched_routine_activity;
    } catch (error) {
        console.log("error in patch_routine_activity!")
        throw error;
    }
}

export const deleteRoutine_Activity = async (routineActivityId, count, duration) => {
    const token = localStorage.getItem('UserToken');
    let response;
    try {
        response = await fetch(`${baseUrl}/routine_activities/${routineActivityId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        const deleted_routine_activity = await response.json()
        return deleted_routine_activity;
    } catch (error) {
        console.log("error in delete_routine_activity!")
        throw error;
    }
}