import React from 'react';


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
