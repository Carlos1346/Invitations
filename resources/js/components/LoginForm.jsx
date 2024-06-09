import React, { useState } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToken } from "../context/TokenContext";

function LoginForm() {
    const { saveToken } = useToken();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost/Invitations/public/api/login",
                formData
            );
            const token = response.data.token;
            saveToken(token);
            console.log("Token guardado:", token);

            navigate("/Invitations/public/Dashboard/events");
        } catch (error) {
            setError(error.response.data.error);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Row>
                <Col></Col>
                <Col xs={5}>
                    <h2>Iniciar sesión</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <h1></h1>
                        <Button variant="primary" type="submit">
                            Iniciar sesión
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>

            {/* Modal para mostrar el error */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Usuario o contraseña incorrectos</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Volver a intentar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default LoginForm;
