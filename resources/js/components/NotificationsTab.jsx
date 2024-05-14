import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useToken } from "../context/TokenContext";



function NotificationsTab() {
  const { token } = useToken();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!token) {
          throw new Error('No se ha encontrado el token de autenticación');
        }

        const response = await axios.get('http://localhost/Invitations/public/api/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotifications(response.data);
        setLoading(false);
        console.log("Hola");
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  function handleAcceptRequest(notificationId) {
    console.log("Aceptar solicitud:", notificationId);
  }

  function handleRejectRequest(notificationId) {
    console.log("Rechazar solicitud:", notificationId);
  }

  return (
    <Container>
      <h1>Notificaciones.</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ListGroup>
          {notifications.map(notification => (
            <ListGroup.Item key={notification.id}>
              <p>{notification.data.sender_name} te ha enviado una solicitud de amistad.</p>
              <Button variant="success" onClick={() => handleAcceptRequest(notification.id)}>Aceptar</Button>{' '}
              <Button variant="danger" onClick={() => handleRejectRequest(notification.id)}>Rechazar</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default NotificationsTab;

  