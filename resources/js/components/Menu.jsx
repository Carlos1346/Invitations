import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet } from 'react-router-dom'
import Image from 'react-bootstrap/Image';


function Menu() {
  return (
    <>
      <div style={{
        backgroundImage: "url('https://fondosmil.co/fondo/36833.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',

      }}>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Invitations</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="listcard">Iniciar Sesion</Nav.Link>
                <Nav.Link as={Link} to="listproduct">Registrarse</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <section style={{ marginTop: '50px' }}>
          <Container>
            <Outlet>
            </Outlet>
          </Container>
        </section>
      </div>
    </>
  );

}

export default Menu;
