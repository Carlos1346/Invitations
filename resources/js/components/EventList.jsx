import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { useToken } from "../context/TokenContext";


const EventList = () => {
    const [events, setEvents] = useState([]);
    const { token } = useToken();


    useEffect(() => {
        // Función para obtener eventos desde el backend
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost/Invitations/public/api/indexUserEvents',
                    {

                        headers: {
                            Authorization: `Bearer ${token}`,
                        },

                    });
                setEvents(response.data.events);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        // Llamar a la función para obtener eventos cuando el componente se monte
        fetchEvents();
    }, []);

    const handleEdit = (eventId) => {
        // Aquí puedes implementar la lógica para editar el evento
        console.log('Edit event with id:', eventId);
    };

    const handleShow = (eventId) => {
        // Aquí puedes implementar la lógica para mostrar el detalle del evento
        console.log('Show event with id:', eventId);
    };

    const handleDelete = (eventId) => {
        // Aquí puedes implementar la lógica para eliminar el evento
        console.log('Delete event with id:', eventId);
    };

    return (
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
                {events.map(event => (
                    <tr key={event.id}>
                        <td>{event.event_name}</td>
                        <td>{event.event_date}</td>
                        <td>{event.event_address}</td>
                        <td>
                            <Button variant="info" onClick={() => handleShow(event.id)}>Mostrar</Button>{' '}
                            <Button variant="warning" onClick={() => handleEdit(event.id)}>Editar</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(event.id)}>Eliminar</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default EventList;
