import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
//Vistas
import LoginPage from '../pages/LoginPage';
import '/resources/css/Main.css';

//Componentes
import LoginForm from '../components/LoginForm';
import NavDashboard from '../components/NavDashboard';
import RegisterForm from '../components/RegisterForm';
import EventCard from '../components/EventCard';
import Example from '../components/Example';



function Main() {
  return (
    <div style={{
      //backgroundImage: "url('https://fondosmil.co/fondo/36833.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      backgroundColor: "rgb" 
      

    }}>
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

      <Route path="/Invitations/public/Dashboard/Paco" element={<Example />}></Route>


    </Routes>

    </div>


  )
}

export default Main;
