import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Vistas
import LoginPage from '../pages/LoginPage';

// Componentes
import LoginForm from '../components/LoginForm';
import NavDashboard from '../components/NavDashboard';
import RegisterForm from '../components/RegisterForm';
import EventCard from '../components/EventCard';
import Example from '../components/Example';
import FriendsList from '../components/FriendList';

function Main() {
  return (
    <Routes>
      {/* Ruta para la vista inicial "Start" */}
      <Route path="/Invitations/public/Start" element={<LoginPage />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        {/* <Route path="*" element={<Navigate replace to="/Invitations/public/Start" />} /> */}
      </Route>

      {/* Ruta para la vista después de la autenticación "Dashboard" */}
      <Route path="/Invitations/public/Dashboard" element={<NavDashboard />}>
        <Route path="events" element={<EventCard />} />
      </Route>

      <Route path="/Invitations/public/Dashboard/Paco" element={<FriendsList />} />
    </Routes>
  );
}

export default Main;

