import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Form,
    Button,
    Badge,
} from "react-bootstrap";
import axios from "axios";
import { useToken } from "../context/TokenContext";

function NavDashboard() {
    const navigate = useNavigate();
    const { token } = useToken();
    const [darkMode, setDarkMode] = useState(false);
    const [notificationCount, setNotificationCount] = useState(1);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleLogout = async () => {
        try {
            if (!token) {
                throw new Error(
                    "No se ha encontrado el token de autenticación"
                );
            }
            

            await axios.post(
                "http://localhost/Invitations/public/api/logout",
                null,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Cierre de sesión exitoso");
            navigate("/Invitations/public/start");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };
    

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1000,
                }}
            >
                <Navbar
                    expand="lg"
                    className={darkMode ? "bg-dark text-light" : "bg-light"}
                >
                    <Container fluid>
                        <Navbar.Brand as={Link} to="events">
                            Invitations
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                
                                navbarScroll
                            >

                                <Nav.Link as={Link} to="calendar">Calendario</Nav.Link>
                                <NavDropdown
                                    title="Eventos"
                                    id="navbarScrollingDropdown"
                                >
                                    <NavDropdown.Item href="#action3">
                                        Crear Evento
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Mis eventos
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action4">
                                        Agenda
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Recuerdos
                                    </NavDropdown.Item>
                                </NavDropdown>
                                
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        
                                    />
                                    <Button variant="outline-success">Buscar</Button>
                                </Form>

                                <Link to="/notificaciones" className="nav-link">
                                    Notificaciones{" "}
                                    {notificationCount > 0 && (
                                        <Badge variant="danger">
                                            {notificationCount}
                                        </Badge>
                                    )}
                                </Link>
                                <NavDropdown
                                    title="Perfil"
                                    id="navbarScrollingDropdown"
                                >
                                    <NavDropdown.Item href="#action3">
                                        Ver Perfil
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Amigos
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Recuerdos
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Solicitudes de Amistad
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action4">
                                        <Button
                                            variant="outline-secondary"
                                            onClick={toggleDarkMode}
                                        >
                                            {darkMode ? "Modo Claro" : "Modo Oscuro"}
                                        </Button>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        <Button
                                            variant="outline-danger"
                                            onClick={handleLogout}
                                        >
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
