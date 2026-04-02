import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        setLoading(false);
        console.log('Fetched users:', results);
        console.log('Endpoint:', endpoint);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching users:', err);
      });
  }, [endpoint]);

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id || idx}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
