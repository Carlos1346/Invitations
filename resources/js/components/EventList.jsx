import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { useToken } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const { token } = useToken();
    const navigate = useNavigate(); // Agregar el hook useNavigate

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    "http://localhost/Invitations/public/api/indexUserEvents",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setEvents(response.data.events);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const handleEdit = (eventId) => {
        console.log("Edit event with id:", eventId);
        navigate(`/Invitations/public/Dashboard/eventEdit/${eventId}`);
    };

    const handleDelete = async (eventId) => {
        try {
            await axios.delete(
                `http://localhost/Invitations/public/api/events_destroy/${eventId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Actualizar la lista de eventos después de eliminar
            setEvents(events.filter((event) => event.id !== eventId));
            console.log("Evento eliminado exitosamente");
        } catch (error) {
            console.error("Error al eliminar evento:", error);
        }
    };

    return (
        <>
            <h1>Tus eventos.</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.event_name}</td>
                            <td>{event.event_date}</td>
                            <td>{event.event_address}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => handleEdit(event.id)}
                                >
                                    Editar
                                </Button>{" "}
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(event.id)}
                                >
                                    Eliminar
                                </Button>{" "}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default EventList;
