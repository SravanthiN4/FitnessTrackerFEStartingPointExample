
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
      
    if(json.data === null){
        return false;
    }
    else {
       localStorage.setItem('UserToken', json.data.token);
       return true;
    }
}


export const login = async (userObject) => {
    const URL = `${baseUrl}/users/login`; 
    
    const response = await fetch (URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
      })
      const json = await response.json();
      
      if(json.data === null){
          return false;
      }
      else {
         localStorage.setItem('UserToken', json.data.token);
         return true;
      }
}


// export const getMe = async () => {
//     const URL = `${baseUrl}/users/me`; 
//     const response = await fetch(URL, {
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer TOKEN_STRING_HERE'
//   },
// })
// const json = await response.json();
      
// if(json.data === null){
//     return false;
// }
// else {
//    localStorage.setItem('UserToken', json.data.token);
//    return true;
// }
// }


// export const getMyRoutines = async () => {



// }




