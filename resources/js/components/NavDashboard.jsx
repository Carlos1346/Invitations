import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';

function NavDashboard() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Aquí puedes agregar lógica adicional para cambiar el tema de tu aplicación
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    console.log('Cerrar sesión');
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
            <Button variant="outline-danger" className="ms-2" onClick={toggleDarkMode}>
              {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
            </Button>
            <Button variant="outline-danger" className="ms-2" onClick={handleLogout}>
              Perfil
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
