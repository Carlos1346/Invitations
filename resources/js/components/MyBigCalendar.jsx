import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from "axios";
import { useToken } from "../context/TokenContext";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";

// Localizador de momento para la configuración del calendario
const localizer = momentLocalizer(moment);

const MyBigCalendar = () => {
    const { token } = useToken();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                if (!token) {
                    throw new Error(
                        "No se ha encontrado el token de autenticación"
                    );
                }

                const response = await axios.get(
                    "http://localhost/Invitations/public/api/list_user_events",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchEvents();
    }, [token]);

    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <h1>Calendario de eventos.</h1>
            <div style={{ height: 600, padding: 10, background: "white" }}>
                <Calendar
                    localizer={localizer}
                    events={events.map((event) => ({
                        id: event.id,
                        title: event.event_name,
                        start: new Date(event.event_date),
                        end: new Date(event.event_date),
                        address: event.event_address,
                        description: event.event_description,
                    }))}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                        borderRadius: 10,
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                    }}
                    components={{
                        event: EventComponent,
                    }}
                    onSelectEvent={(event) => setSelectedEvent(event)}
                    popup
                    showMultiDayTimes
                    views={["month", "day"]}
                />

                {/* Modal para mostrar información adicional del evento */}
                <Modal
                    show={selectedEvent}
                    onHide={() => setSelectedEvent(null)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {selectedEvent && selectedEvent.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            <strong>Fecha:</strong>{" "}
                            {selectedEvent &&
                                moment(selectedEvent.start).format(
                                    "DD/MM/YYYY"
                                )}
                        </p>
                        <p>
                            <strong>Dirección:</strong>{" "}
                            {selectedEvent && selectedEvent.address}
                        </p>
                        <p>
                            <strong>Descripción:</strong>{" "}
                            {selectedEvent && selectedEvent.description}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setSelectedEvent(null)}
                        >
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

const EventComponent = ({ event }) => (
    <div
        style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: 5,
            borderRadius: 5,
        }}
    >
        <FontAwesomeIcon icon={faBirthdayCake} size="1x" />{" "}
        <strong className="event-title" title={event.title}>
            {event.title}
        </strong>
    </div>
);

export default MyBigCalendar;
