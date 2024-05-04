import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'; // Agrega useNavigate
import { Container, Navbar, Nav, NavDropdown, Form, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useToken } from '../context/TokenContext'; // Importa el hook useToken desde el archivo TokenContext.js

function NavDashboard() {
  const navigate = useNavigate(); // Usa useNavigate para la redirección
  const { token } = useToken();
  const [darkMode, setDarkMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1); // Número de notificaciones

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Aquí puedes agregar lógica adicional para cambiar el tema de tu aplicación
  };

  const handleLogout = async () => {
    try {
      if (!token) {
        throw new Error("No se ha encontrado el token de autenticación");
      }

      await axios.post(
        'http://localhost/Invitations/public/api/logout',
        null,
        { headers: { Authorization: `Bearer ${token}` } } // Corrige cómo pasas los encabezados
      );

      console.log('Cierre de sesión exitoso');
      navigate("/Invitations/public/start"); // Redirige al usuario después del cierre de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Puedes mejorar esto mostrando un mensaje de error al usuario
    }
  };

  return (
    <>
      <Navbar expand="lg" className={darkMode ? "bg-dark text-light" : "bg-light"}>
        <Container fluid>
          <Navbar.Brand as={Link} to="#">Invitations</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="events">Eventos</Nav.Link>
              <Nav.Link href="#action2">Calendario</Nav.Link>
              <Nav.Link as={Link} to="Paco">Probar Componentes</Nav.Link>
              <NavDropdown title="Eventos" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Crear Evento</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Recuerdos</NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
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
                <Badge variant="danger">{notificationCount}</Badge>
              )}
            </Link>
            <Button variant="outline-danger" className="ms-2" onClick={toggleDarkMode}>
              {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </Button>
            <Button variant="outline-danger" className="ms-2" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section style={{ marginTop: '50px' }}>
        <Container>
          <Outlet />
        </Container>
      </section>
    </>
  );
}

export default NavDashboard;

