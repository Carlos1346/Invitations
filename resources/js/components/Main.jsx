import React from 'react';
import Menu from "./Menu";
import Example from "./Example";
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Login';

//import AuthPage from './AuthPage';

function Main() {
  return (
    <Routes>
      <Route path="/Invitations/public/"
        element={<Menu />}>
        {/* <Route index element={<Home /> } /> */}
        <Route path="listcard" element={<LoginForm />} />


        <Route path="*"
          element={<Navigate replace to="/Invitations/public/" />} />
      </Route>



    </Routes>


  )
}

export default Main;
