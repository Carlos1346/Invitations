import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet } from 'react-router-dom'
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';



function LoginView() {
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
            <Outlet>
            </Outlet>
          </Container>
        </section>

        <Container>
          <Container style={{ maxWidth: '750px', borderRadius: '10px', overflow: 'hidden', marginTop: '50px' }}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://img.freepik.com/foto-gratis/amigos-tintinean-vasos-bebida-bar-moderno_1150-18971.jpg?size=800&ext=jpg&ga=GA1.1.672697106.1713916800&semt=sph"
                  alt="First slide"
                  style={{ borderRadius: '10px' }}
                />
                <Carousel.Caption>
                  <h3>¡Crea tus mejores eventos!</h3>
                  <p>En nuestra app puedes crear y personalizar tus eventos segun tus necesidades:)</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://weezevent.com/wp-content/uploads/2023/05/12154322/ideas-tema-fiesta.jpg"
                  alt="Second slide"
                  style={{ borderRadius: '10px' }}
                />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://s1.elespanol.com/2023/11/15/actualidad/809929463_237616134_1706x960.jpg"
                  alt="Third slide"
                  style={{ borderRadius: '10px' }}
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Container>
        </Container>
        <div style={{ marginTop: '50px' }}>

          <footer className="footer mt-auto py-3 bg-body-tertiary text-black">
            <Container>
              <Row>
                <Col md={6}>
                  <h5>Enlaces Útiles</h5>
                  <ListGroup variant="flush">
                    <Link to="/ruta-del-elemento-1" className="list-group-item list-group-item-action font-weight-bold">Acerca de nosotros.</Link>
                    <Link to="/ruta-del-elemento-2" className="list-group-item list-group-item-action font-weight-bold">Contactanos.</Link>
                    <Link to="/ruta-del-elemento-3" className="list-group-item list-group-item-action font-weight-bold">Servicios.</Link>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <h3>Síguenos en Redes Sociales</h3>
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <a href="https://twitter.com">
                        <FontAwesomeIcon icon={faTwitter} size="4x" style={{ color: '#3b5998' }} />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://facebook.com">
                        <FontAwesomeIcon icon={faFacebook} size="4x" style={{ color: '#3b5998', marginLeft: '30px' }} />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="https://instagram.com">
                        <FontAwesomeIcon icon={faInstagram} size="4x" style={{ color: '#3b5998', marginLeft: '30px' }} />
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </footer>
        </div>
      </div>
    </>
  );

}

export default LoginView;
