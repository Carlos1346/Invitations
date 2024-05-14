import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import axios from "axios";
import { useToken } from "../context/TokenContext";
import EventList from '../components/EventList';

import FriendsList from "./FriendsList";

function UserProfile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { token } = useToken();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await axios.get(
                    "http://localhost/Invitations/public/api/showAuthenticatedUser",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUser(response.data);
            } catch (error) {
                setError("Error fetching user data");
            }
        }

        fetchUser();
    }, []);

    const handleDeleteUser = async () => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
            try {
                await axios.delete(
                    `http://localhost/Invitations/public/api/users/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUser(null); // Limpiar el estado del usuario después de eliminarlo
                alert("Usuario eliminado exitosamente.");
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("Hubo un error al eliminar el usuario. Por favor, inténtalo de nuevo.");
            }
        }
    };

    const handleEditUser = () => {
        // Implementa la lógica para editar el usuario aquí
        alert("Función de edición de usuario aún no implementada.");
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="mt-5">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col md={6}>
                                    <div className="text-center text-md-start">
                                        <Image
                                            src={user && user.avatar ? user.avatar : "https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg"}
                                            alt="Profile"
                                            className="profile-image"
                                            fluid // Para que la imagen sea responsive
                                        />
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="text-center text-md-start">
                                        <h2 className="mb-4">Perfil de usuario</h2>
                                        {error && <p className="text-danger">{error}</p>}
                                        {user && (
                                            <div>
                                                <p><strong>Nombre:</strong> {user.name}</p>
                                                <p><strong>Email:</strong> {user.email}</p>
                                                <p><strong>Fecha de creación:</strong> {user.created_at}</p>
                                                {/* Agregar otros detalles del usuario según sea necesario */}
                                                <div className="mt-3">
                                                    <Button variant="danger" onClick={handleDeleteUser}>Eliminar usuario</Button>{' '}
                                                    <Button variant="primary" onClick={handleEditUser}>Editar usuario</Button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Container>
                <EventList />
                <FriendsList />
                

            </Container>

        </Container>

    );
}

export default UserProfile;
