import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
//Vistas
//import LoginView from '../components/LoginView';
import LoginPage from '../pages/LoginPage';

//Componentes
import LoginForm from '../components/LoginForm';
import NavDashboard from '../components/NavDashboard';
import RegisterForm from '../components/RegisterForm';
import EventCard from '../components/EventCard';



function Main() {
  return (
    <Routes>
      {/* Ruta para la vista inicial "Start" */}
      <Route path="/Invitations/public/Start"
        element={<LoginPage />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />

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
