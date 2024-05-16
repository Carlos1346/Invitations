import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { useToken } from "../context/TokenContext";
import { useNavigate } from 'react-router-dom';




function NotificationsTab() {
  const { token } = useToken();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Agregar el hook useNavigate


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

  function handleViewRequest(notificationId) {
    navigate(`/Invitations/public/Dashboard/requestList`);

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
              <Button variant="success" onClick={() => handleViewRequest()}>Ir a Solicitudes de Amistad</Button>{' '}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default NotificationsTab;

  