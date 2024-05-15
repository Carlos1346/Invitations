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
import FriendsList from '../components/FriendsList';
import MyBigCalendar from '../components/MyBigCalendar';
import EventCreateForm from '../components/EventCreateForm';
import EventList from '../components/EventList';

import '../../css/Main.css'
import UserSearch from '../components/UserSearch';
import NotificationsTab from '../components/NotificationsTab';
import UserProfile from '../components/UserProfile';
import EventSearch from '../components/EventSearch';
import RequestsList from '../components/RequestList';
import EventEditForm from '../components/EventEditForm';
import UserEditForm from '../components/UserEditForm';


function Main() {
  return (
    <>    
    <div id='Background'>    
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
        <Route path="calendar" element={<MyBigCalendar />} />
        <Route path="createEvent" element={<EventCreateForm/>} />
        <Route path="eventList" element={<EventList/>} />
        <Route path="searchFriends" element={<UserSearch/>} />
        <Route path="searchEvents" element={<EventSearch/>} />
        <Route path="friendsList" element={<FriendsList/>} />
        <Route path="notifications" element={<NotificationsTab/>} />
        <Route path="userProfile" element={<UserProfile/>} />
        <Route path="requestList" element={<RequestsList/>} />
        
        <Route path="eventEdit/:eventId" element={<EventEditForm />} />
        <Route path="userEdit" element={<UserEditForm />} />



      </Route>
    </Routes>
    </div>
    </>
  );
}

export default Main;

