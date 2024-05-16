import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useToken } from "../context/TokenContext";

const RequestsList = () => {
    const [pendingFriendRequests, setPendingFriendRequests] = useState([]);
    const { token } = useToken();

    useEffect(() => {
        fetchPendingFriendRequests();
    }, []);

    const fetchPendingFriendRequests = () => {
        axios.get('http://localhost/Invitations/public/api/getrequest', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setPendingFriendRequests(response.data.pendingFriendRequests);
        })
        .catch(error => {
            console.error('Error fetching pending friend requests:', error);
        });
    };

    const handleAccept = (friendRequestId) => {
        axios.put(`http://localhost/Invitations/public/api/friend_requests/accept/${friendRequestId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Friend request accepted for ID:', friendRequestId);
            // Actualizar la lista de solicitudes después de aceptar
            fetchPendingFriendRequests();
        })
        .catch(error => {
            console.error('Error accepting friend request:', error);
        });
    };

    const handleReject = (userId) => {
        axios.post('/api/rejectFriendRequest', { userId })
        .then(response => {
            console.log('Friend request rejected for user with ID:', userId);
            // Actualizar la lista de solicitudes después de rechazar
            fetchPendingFriendRequests();
        })
        .catch(error => {
            console.error('Error rejecting friend request:', error);
        });
    };

    return (
        <div>
            <h2>Solicitudes de Amistad Pendientes</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingFriendRequests.map(request => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.name}</td>
                            <td>{request.email}</td>
                            <td>
                                <Button variant="success" onClick={() => handleAccept(request.id)}>Aceptar</Button>{' '}
                                <Button variant="danger" onClick={() => handleReject(request.id)}>Rechazar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default RequestsList;
