import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useToken } from '../context/TokenContext'; // Importar el hook useToken desde el archivo TokenContext.js

function FriendsList() {
  const { token } = useToken(); // Obtener el token del contexto
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // Verificar si el token está presente
        if (!token) {
          throw new Error('No se ha encontrado el token de autenticación');
        }

        // Realizar la solicitud a la API para obtener la lista de amigos
        const response = await axios.get('http://localhost/Invitations/public/api/friendships/getfriends', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Almacenar la lista de amigos en el estado del componente
        setFriends(response.data.friends);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    // Llamar a la función para obtener la lista de amigos cuando el componente se renderice
    fetchFriends();
  }, [token]); // Ejecutar cuando el token cambie

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Lista de Amigos.</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
           
          </tr>
        </thead>
        <tbody>
          {friends.map(friend => (
            <tr key={friend.id}>
              <td>{friend.name}</td>
              <td>{friend.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FriendsList;
