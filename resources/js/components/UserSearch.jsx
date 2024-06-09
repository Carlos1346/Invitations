import React, { useState } from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Image,
    Alert,
} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useToken } from "../context/TokenContext";

function UserSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); 
    const { token } = useToken();

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost/Invitations/public/api/users_search?termino=${searchTerm}`
            );
            setSearchResults(response.data);
            console.log("Usuario Encontrado exitosamente");
        } catch (error) {
            console.error("Error al buscar usuarios:", error);
            setSearchResults([]);
        }
        setLoading(false);
    };

    const handleSendFriendRequest = async (userId) => {
        try {
            const response = await axios.post(
                "http://localhost/Invitations/public/api/friend_requests",
                {
                    user_id2: userId,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.message);
            setSuccessMessage("Solicitud de amistad enviada correctamente"); 
        } catch (error) {
            console.error("Error al enviar solicitud de amistad:", error);
        }
    };    

    return (
        <>
            <h1>¡Encuentra a tus amigos!</h1>
            <Container className="py-5" style={{ backgroundColor: "#fff" }}>
                <Row className="justify-content-center mb-4">
                    <Col xs={12} md={8}>
                        <form onSubmit={handleSearch}>
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Buscar usuarios"
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
                {successMessage && (
                    <Alert
                        variant="success"
                        onClose={() => setSuccessMessage("")}
                        dismissible
                    >
                        {successMessage}
                    </Alert>
                )}
                {loading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : Array.isArray(searchResults) && searchResults.length > 0 ? (
                    <Row xs={1} md={2} lg={4} className="g-4">
                        {searchResults.map((user, index) => (
                            <Col key={index}>
                                <Card>
                                    <Image
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYdNqtlCcXrbZxKY49iDTBctqpjnYNFfkFc97PW1y2Lg&s"
                                        roundedCircle
                                    />
                                    <Card.Body>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card.Text>{user.email}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button
                                            variant="primary"
                                            onClick={() =>
                                                handleSendFriendRequest(user.id)
                                            }
                                        >
                                            Enviar solicitud
                                        </Button>
                                        {/*<Button variant="secondary" onClick={() => handleViewUser(user.id)}>Ver usuario</Button>*/}
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div>No se encontraron resultados</div>
                )}
            </Container>
        </>
    );
}

export default UserSearch;
