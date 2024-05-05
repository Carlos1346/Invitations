import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useToken } from "../context/TokenContext"; // Importar el hook useToken desde el archivo TokenContext.js
import ListGroup from "react-bootstrap/ListGroup";

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
                <Col>
                    {events.map((event) => (
                        <Row key={event.id}>
                            <Card style={{ width: "60%", marginLeft: "20%", marginTop: "30px" }}>
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
                                    {/*<ListGroup.Item>Creado: {event.created_at}</ListGroup.Item>*/}
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link href="#">Asistire</Card.Link>
                                    <Card.Link href="#">No Asistire</Card.Link>
                                </Card.Body>
                            </Card>
                        </Row>
                    ))}
                </Col>
            </Row>
        </Container>
    );
}

export default EventCard;
