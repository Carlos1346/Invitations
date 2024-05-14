import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap"; // Importar Button desde react-bootstrap
import Spinner from 'react-bootstrap/Spinner';
import { useToken } from "../context/TokenContext";

function EventSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useToken();

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost/Invitations/public/api/events_search?termino=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSearchResults(response.data);
            console.log("Eventos encontrados exitosamente");
        } catch (error) {
            console.error("Error al buscar eventos:", error);
            setSearchResults([]);
        }
        setLoading(false);
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
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                <Row xs={1} md={2} lg={4} className="g-4">
                    {searchResults.map((event, index) => (
                        <Col key={index}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{event.event_name}</Card.Title>
                                    <Card.Text>{event.event_description}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="primary">Asistir</Button>
                                    <Button variant="secondary">Ver evento</Button>
                                </Card.Footer>
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
