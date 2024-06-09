import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useToken } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";

function EventCreateForm() {
    const { token } = useToken();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        event_name: "",
        event_date: "",
        event_address: "",
        event_description: "",
        event_rules: "",
        public_private: "",
    });

    const [successMessage, setSuccessMessage] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost/Invitations/public/api/events_create",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage("Evento creado exitosamente");
            console.log("Evento creado exitosamente");
            navigate("/Invitations/public/Dashboard/eventList");
        } catch (error) {
            console.error("Error al crear evento:", error);
        }
    }

    return (
        <Container className="py-5" style={{ backgroundColor: "#fff" }}>
            <h1>¡Crea un nuevo evento!</h1>
            {successMessage && (
                <Alert
                    variant="success"
                    onClose={() => setSuccessMessage("")}
                    dismissible
                >
                    {successMessage}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="event_name">
                    <Form.Label>Nombre del Evento</Form.Label>
                    <Form.Control
                        type="text"
                        name="event_name"
                        value={formData.event_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="event_date">
                    <Form.Label>Fecha del Evento</Form.Label>
                    <Form.Control
                        type="date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="event_address">
                    <Form.Label>Dirección del Evento</Form.Label>
                    <Form.Control
                        type="text"
                        name="event_address"
                        value={formData.event_address}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="event_description">
                    <Form.Label>Descripción del Evento</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="event_description"
                        value={formData.event_description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="event_rules">
                    <Form.Label>Reglas del Evento</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="event_rules"
                        value={formData.event_rules}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="public_private">
                    <Form.Label>Público / Privado</Form.Label>
                    <Form.Control
                        as="select"
                        name="public_private"
                        value={formData.public_private}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="public">Público</option>
                        <option value="private">Privado</option>
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Crear Evento
                </Button>
            </Form>
        </Container>
    );
}

export default EventCreateForm;
