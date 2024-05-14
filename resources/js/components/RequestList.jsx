import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useToken } from "../context/TokenContext";


function RequestsList() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useToken();


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost/Invitations/public/api/getRequest',
        {

            headers: {
                Authorization: `Bearer ${token}`,
            },

        }); 
        setRequests(response.data.friends);
      } catch (error) {
        setError('Error al cargar las solicitudes de amistad');
      }
    };

    fetchRequests();
  }, []);

  const acceptRequest = (userId) => {
    // Lógica para aceptar la solicitud de amistad
  };

  const rejectRequest = (userId) => {
    // Lógica para rechazar la solicitud de amistad
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>
                <Button variant="success" onClick={() => acceptRequest(request.id)}>Aceptar</Button>{' '}
                <Button variant="danger" onClick={() => rejectRequest(request.id)}>Rechazar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RequestsList;
