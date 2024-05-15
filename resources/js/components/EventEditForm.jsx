import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useToken } from "../context/TokenContext";

const EventEditForm = () => {
    const { token } = useToken();
    const { eventId } = useParams(); // Obtener el ID del evento de los parámetros de la URL

    const [formData, setFormData] = useState({
        event_name: "",
        event_date: "",
        event_address: "",
        event_description: "",
        event_rules: "",
        public_private: "",
    });

    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost/Invitations/public/api/events_show/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Establecer el estado del formulario con los datos del evento obtenidos del servidor
                const eventData = response.data; // Aquí debes asegurarte de que la estructura de response.data coincida con la estructura de formData
                setFormData({
                    event_name: eventData.event_name,
                    event_date: eventData.event_date,
                    event_address: eventData.event_address,
                    event_description: eventData.event_description,
                    event_rules: eventData.event_rules,
                    public_private: eventData.public_private,
                });
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [eventId, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost/Invitations/public/api/events_update/${eventId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccessMessage("Evento actualizado exitosamente"); // Actualizar el mensaje de éxito
            console.log("Evento actualizado exitosamente");
        } catch (error) {
            console.error("Error al actualizar evento:", error);
        }
    };

    return (
        <>
            <Container className="py-5" style={{ backgroundColor: "#fff" }}>
                <h1>¡Edita tu evento!</h1>
                {successMessage && (
                    <Alert variant="success" onClose={() => setSuccessMessage("")} dismissible>
                        {successMessage}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="event_name">
                        <Form.Label>Nombre del Evento</Form.Label>
                        <Form.Control type="text" name="event_name" value={formData.event_name} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="event_date">
                        <Form.Label>Fecha del Evento</Form.Label>
                        <Form.Control type="date" name="event_date" value={formData.event_date} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="event_address">
                        <Form.Label>Dirección del Evento</Form.Label>
                        <Form.Control type="text" name="event_address" value={formData.event_address} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="event_description">
                        <Form.Label>Descripción del Evento</Form.Label>
                        <Form.Control as="textarea" rows={3} name="event_description" value={formData.event_description} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="event_rules">
                        <Form.Label>Reglas del Evento</Form.Label>
                        <Form.Control as="textarea" rows={3} name="event_rules" value={formData.event_rules} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="public_private">
                        <Form.Label>Público / Privado</Form.Label>
                        <Form.Control as="select" name="public_private" value={formData.public_private} onChange={handleChange} required>
                            <option value="">Seleccione una opción</option>
                            <option value="public">Público</option>
                            <option value="private">Privado</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Actualizar Evento
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default EventEditForm;
