import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToken } from "../context/TokenContext";

function RegisterForm() {
    const { saveToken } = useToken();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost/Invitations/public/api/register",
                formData
            );
            const token = response.data.token;
            saveToken(token);
            console.log("Token guardado:", token);

            navigate("/invitations/public/Dashboard/events");
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <Row>
            <Col></Col>
            <Col xs={5}>
                <h2>Registrarse</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
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
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    {error && <p className="text-danger">{error}</p>}
                    <Button variant="primary" type="submit">
                        Registrarse
                    </Button>
                </Form>
            </Col>
            <Col></Col>
        </Row>
    );
}

export default RegisterForm;
