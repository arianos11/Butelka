import React, { useState, useEffect } from 'react';

import "./Check.scss";

import axios from "axios";

const Check = () => {
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('/api').then(data => setData(data.data));
        console.log("USE EFFECT");
    }, [])
 
    return (
        <p>To jest test {data ? data.page : ''}</p>
    )  
}

export default Check;