import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        setLoading(false);
        console.log('Fetched teams:', results);
        console.log('Endpoint:', endpoint);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching teams:', err);
      });
  }, [endpoint]);

  if (loading) return <div>Loading teams...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teams</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr key={team.id || idx}>
              <td>{team.id}</td>
              <td>{team.name}</td>
              <td>{Array.isArray(team.members) ? team.members.join(', ') : team.members}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Teams;
