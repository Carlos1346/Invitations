import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useToken } from '../context/TokenContext'; // Importar el hook useToken desde el archivo TokenContext.js

function EventCard() {
    const { token } = useToken(); // Obtener el token del contexto
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Verificar si el token está presente
                if (!token) {
                    throw new Error(
                        "No se ha encontrado el token de autenticación"
                    );
                }

                // Realizar la solicitud a la API para obtener los eventos
                const response = await axios.get(
                    "http://localhost/Invitations/public/api/events_index",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Almacenar los eventos en el estado del componente
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        // Llamar a la función para obtener los eventos cuando el componente se renderice
        fetchEvents();
    }, [token]); // Ejecutar cuando el token cambie

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
                {events.map((event) => (
                    <Col key={event.id} xs={12} md={6} lg={4}>
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
        </Container>
    );
}

export default EventCard;
