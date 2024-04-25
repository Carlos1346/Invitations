import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
//Vistas
import LoginView from './LoginView';

//Componentes
import LoginForm from './LoginForm';
import NavDashboard from './NavDashboard';
import RegisterForm from './RegisterForm';
import EventCard from './EventCard';


function Main() {
  return (
    <Routes>
      {/* Ruta para la vista inicial "Start" */}
      <Route path="/Invitations/public/Start"
        element={<LoginView />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="events" element={<EventCard />} />

        {/*<Route path="*" element={<Navigate replace to="/Invitations/public/Start" />} />*/}
      </Route>

      {/* Ruta para la vista despues de la autenticación "Dashboard" */}
      <Route path="/Invitations/public/Dashboard"
        element={<NavDashboard />}>

        <Route path="events" element={<EventCard />} />


      </Route>


    </Routes>


  )
}

export default Main;
