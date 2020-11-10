import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <MainPage />
      <LoginPage />
    </div>
  );
}

export default App;
