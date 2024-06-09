import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useToken } from "../context/TokenContext";

function UserEditForm() {
    const { token } = useToken();

    // Estado para los campos del formulario y mensajes de éxito/error
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Manejar cambios en los campos del formulario
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    // Cargar los datos del usuario desde el servidor
    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(
                    "http://localhost/Invitations/public/api/showAuthenticatedUser",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const userData = response.data;
                // Establecer los datos del usuario en el estado formData
                setFormData({
                    name: userData.name,
                    email: userData.email,
                    password: "",
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchUserData();
    }, [token]);

    // Enviar la solicitud de actualización al servidor
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.put(
                "http://localhost/Invitations/public/api/update",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage(response.data.message);
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(error.response.data.error);
            setSuccessMessage("");
        }
    }

    return (
        <Container className="py-5" style={{ backgroundColor: "#fff" }}>
            <h1>Editar Usuario</h1>
            {successMessage && (
                <Alert variant="success">{successMessage}</Alert>
            )}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Actualizar Usuario
                </Button>
            </Form>
        </Container>
    );
}

export default UserEditForm;
