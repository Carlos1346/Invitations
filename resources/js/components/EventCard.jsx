import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Card,
    ListGroup,
    Button,
    Spinner,
} from "react-bootstrap";
import { useToken } from "../context/TokenContext";

function EventCard() {
    const tokenContext = useToken();
    const token = tokenContext.token;
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(
        function fetchEvents() {
            async function fetchData() {
                try {
                    if (!token) {
                        throw new Error(
                            "No se ha encontrado el token de autenticación"
                        );
                    }

                    const response = await axios.get(
                        "http://localhost/Invitations/public/api/events_index",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    // Agregar un campo adicional "asistencia" a cada evento
                    const eventsWithAttendance = response.data.map(function (
                        event
                    ) {
                        return {
                            ...event,
                            asistencia: null, 
                        };
                    });

                    setEvents(eventsWithAttendance);
                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            }

            fetchData();
        },
        [token]
    );

    function handleToggleAttendance(eventId, asistira) {
        return async function () {
            try {
                // Buscar el evento por ID
                const updatedEvents = events.map(function (event) {
                    if (event.id === eventId) {
                        // Cambiar el estado de asistencia del evento
                        return {
                            ...event,
                            asistencia: asistira, // Establecer el estado de asistencia seleccionado
                        };
                    }
                    return event;
                });

                setEvents(updatedEvents);

                if (!token) {
                    throw new Error(
                        "No se ha encontrado el token de autenticación"
                    );
                }

                if (asistira) {
                    await axios.post(
                        "http://localhost/Invitations/public/api/mark_attendance",
                        {
                            event_id: eventId,
                            asistira: true,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                } else {
                    // Si el usuario no asistirá al evento
                    await axios.delete(
                        `http://localhost/Invitations/public/api/event_attendances_destroy/${eventId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                }

                console.log("Asistencia actualizada correctamente");
            } catch (error) {
                setError("Error al actualizar la asistencia");
            }
        };
    }

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Container>
            <h1>Inicio</h1>
            <Row>
                {events.map(function (event) {
                    return (
                        <Col key={event.id} xs={12} md={6} lg={4}>
                            <Card className="mb-4">
                                <Card.Img
                                    variant="top"
                                    src="https://media.istockphoto.com/id/513550806/es/foto/adolescente-hipster-amigos-de-fiesta-por-soplado-colorido-confeti-de-manos.jpg?s=612x612&w=0&k=20&c=OUSiKR3uVcXV0fxjw20rZpJYq5B7XHz7hE-mKb_9OQo="
                                />
                                <Card.Body>
                                    <Card.Title>
                                        Nombre del evento: {event.event_name}
                                    </Card.Title>
                                    <Card.Text>
                                        Descripcion: {event.event_description}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>
                                        Direccion: {event.event_address}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Fecha:{" "}
                                        {new Date(
                                            event.event_date
                                        ).toLocaleDateString()}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Creado:{" "}
                                        {new Date(
                                            event.created_at
                                        ).toLocaleDateString()}
                                    </ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Button
                                        variant={
                                            event.asistencia === true
                                                ? "secondary"
                                                : "primary"
                                        }
                                        disabled={event.asistencia === true}
                                        onClick={handleToggleAttendance(
                                            event.id,
                                            true
                                        )}
                                    >
                                        Asistiré
                                    </Button>{" "}
                                    <Button
                                        variant={
                                            event.asistencia === false
                                                ? "secondary"
                                                : "primary"
                                        }
                                        disabled={event.asistencia === false}
                                        onClick={handleToggleAttendance(
                                            event.id,
                                            false
                                        )}
                                    >
                                        No Asistiré
                                    </Button>{" "}
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default EventCard;
