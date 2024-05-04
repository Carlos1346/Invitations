import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function LoginNavbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="">Invitations</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="login">Iniciar Sesion</Nav.Link>
                            <Nav.Link as={Link} to="register">Registrarse</Nav.Link>
                        </Nav>
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

export default LoginNavbar;
