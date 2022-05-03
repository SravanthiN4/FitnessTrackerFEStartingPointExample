import React, { useEffect, useState } from 'react';
import Activities from './Activities';
import ColorBox from './ColorBox';

const App = () => {
    // useEffect(async () => {
    //     console.log("IN HERE")
    //     const res = await fetch("https://fitnesstrac-kr.herokuapp.com/api/activities")
    //     // const res = await fetch("heroku-link");
    //     // const res = await fetch("localhost:3000");
    //     const json = await res.json();
    //     // setReq(json);
    //     console.log(json)
    //     // return () => { }
    // }, [])

    return (
        <>
            <h1>
                Hello World!
            </h1>
            <ColorBox boxColor="blue"></ColorBox>
            <ColorBox boxColor="red"></ColorBox>
            <ColorBox boxColor="green"></ColorBox>
            <Activities></Activities>
        </>
    );
};

export default App;