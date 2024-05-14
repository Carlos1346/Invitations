import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Badge, Button } from "react-bootstrap"; // Importar Button
import axios from "axios";
import { useToken } from "../context/TokenContext";

function NavDashboard() {
    const navigate = useNavigate();
    const { token } = useToken();
    const [darkMode, setDarkMode] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3); // Inicializar el estado de notificaciones en 0
    const [loadingNotifications, setLoadingNotifications] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleLogout = async () => {
        try {
            if (!token) {
                throw new Error("No se ha encontrado el token de autenticación");
            }

            await axios.post("http://localhost/Invitations/public/api/logout", null, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Cierre de sesión exitoso");
            navigate("/Invitations/public/start");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost/Invitations/public/api/notifications", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setNotificationCount(response.data.total); // Actualizar el estado de notificaciones con el total de notificaciones recibidas
                setLoadingNotifications(false);
            } catch (error) {
                console.error("Error al obtener notificaciones:", error);
                setLoadingNotifications(false);
            }
        };

        fetchNotifications();
    }, [token]);

    return (
        <>
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
                <Navbar expand="lg" className={darkMode ? "bg-dark text-light" : "bg-light"}>
                    <Container fluid>
                        <Navbar.Brand as={Link} to="events">Invitations</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                                <Nav.Link as={Link} to="calendar">Calendario</Nav.Link>
                                
                                <NavDropdown title="Busqueda" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="searchFriends">Buscar amigos</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="searchEvents">Buscar eventos</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Eventos" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="createEvent">Crear Evento</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="eventList">Mis eventos</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to="notifications">Notificaciones</Nav.Link>
                                
                                <NavDropdown title="Perfil" id="navbarScrollingDropdown">
                                    <NavDropdown.Item as={Link} to="userProfile">Ver Perfil</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="friendsList">Amigos</NavDropdown.Item>
                                    {/*<NavDropdown.Item as={Link} to="requestList">Solicitudes de Amistad</NavDropdown.Item>*/}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action4">
                                        <Button variant="outline-secondary" onClick={toggleDarkMode}>
                                            {darkMode ? "Modo Claro" : "Modo Oscuro"}
                                        </Button>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        <Button variant="outline-danger" onClick={handleLogout}>
                                            Cerrar Sesión
                                        </Button>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <section style={{ paddingTop: "100px" }}>
                <Container>
                    <Outlet />
                </Container>
            </section>
        </>
    );
}

export default NavDashboard;
