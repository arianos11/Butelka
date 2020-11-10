import React, {useState, useEffect} from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

import './LoginPage.scss';

const LoginPage = () => {
    return (
        <>
            <h1>Login Page</h1>
            <LoginForm />
        </>
    )
}

export default LoginPage;