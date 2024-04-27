import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link} from 'react-router-dom'
import { Row, Col, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

function LoginFooter() {
    return (
        <>
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

        </>
    )
}

export default LoginFooter;