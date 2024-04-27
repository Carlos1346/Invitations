import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

function EventCard() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Obtener el token del localStorage
        const token = localStorage.getItem('token');
        console.log("Token recuperado:", token);

        // Verificar si el token está presente
        if (!token) {
          throw new Error('No se ha encontrado el token de autenticación');
        }

        // Realizar la solicitud a la API para obtener los eventos
        const response = await axios.get('http://localhost/Invitations/public/api/events_index', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Almacenar los eventos en el estado del componente
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    // Llamar a la función para obtener los eventos cuando el componente se monte
    fetchEvents();
  }, []); // Ejecutar solo una vez al montar el componente

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <h1>Eventos</h1>
      <Row>
        {events.map(event => (
          <Col  xs={12} md={6} lg={4}>
            <Card>
              <Card.Body>
                <Card.Title>{event.event_name}</Card.Title>
                <Card.Text>{event.event_description}</Card.Text>
                {/* Agregar más detalles del evento aquí si es necesario */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ width: '18rem' }} key={event.id} >
      
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </Container>

  );
}

export default EventCard;
