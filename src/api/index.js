import React from 'react';


export const activities = async () => {
    return fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json())
        .then(result => {
          console.log(result);
        })
        .catch(console.error);
}