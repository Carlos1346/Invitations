import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useToken } from "../context/TokenContext";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";

function EventSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]); // Estado para almacenar los eventos
    const { token } = useToken();

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost/Invitations/public/api/events_search?termino=${searchTerm}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSearchResults(response.data);
            console.log("Eventos encontrados exitosamente");
        } catch (error) {
            console.error("Error al buscar eventos:", error);
            setSearchResults([]);
        }
        setLoading(false);
    };

    const handleToggleAttendance = (eventId, asistira) => {
        return async () => {
            try {
                // Actualizar el estado de asistencia del evento correspondiente
                const updatedEvents = events.map((event) => {
                    if (event.id === eventId) {
                        return {
                            ...event,
                            asistencia: asistira,
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

                // Enviar la solicitud correspondiente al backend
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
                console.error("Error al actualizar la asistencia:", error);
            }
        };
    };

    return (
        <>
            <h1>¡Encuentra los mejores eventos!</h1>
            <Container className="py-5" style={{ backgroundColor: "#fff" }}>
                <Row className="justify-content-center mb-4">
                    <Col xs={12} md={8}>
                        <form onSubmit={handleSearch}>
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Buscar eventos"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <Button variant="primary" type="submit">
                                    Buscar
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : (
                    
                    <Row>
                        {searchResults.map((event) => (
                            <Col key={event.id} xs={12} md={6} lg={4}>
                                <Card className="mb-4">
                                    <Card.Img
                                        variant="top"
                                        src="https://media.istockphoto.com/id/513550806/es/foto/adolescente-hipster-amigos-de-fiesta-por-soplado-colorido-confeti-de-manos.jpg?s=612x612&w=0&k=20&c=OUSiKR3uVcXV0fxjw20rZpJYq5B7XHz7hE-mKb_9OQo="
                                    />
                                    <Card.Body>
                                        <Card.Title>
                                            Nombre del evento:{" "}
                                            {event.event_name}
                                        </Card.Title>
                                        <Card.Text>
                                            Descripcion:{" "}
                                            {event.event_description}
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
                                            disabled={
                                                event.asistencia === true
                                            }
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
                                            disabled={
                                                event.asistencia === false
                                            }
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
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
}

export default EventSearch;
