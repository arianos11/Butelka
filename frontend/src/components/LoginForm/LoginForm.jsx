import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './LoginForm.scss';

const LoginForm = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function login(e) {
        e.preventDefault();
        axios.post('/api/authorization/login', {email: email, password: password})
            .then(response => {
                axios.defaults.headers.common['authorization'] = response.data.token;
                console.log(response);
            })
            .catch(err => {
                delete axios.defaults.headers.common["Authorization"];
                console.log(err);
            });
    }

    function change(e) {
        if(e.target.name === "email") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
    }

    return (
        <>
            <input onChange={e => change(e)} type="email" name="email" id="email"/>
            <input onChange={e => change(e)} type="password" name="password" id="password"/>
            <button onClick={e => login(e)}>Zaloguj się</button>
        </>
    )
}

export default LoginForm;