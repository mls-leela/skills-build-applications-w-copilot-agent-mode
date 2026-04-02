import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        setLoading(false);
        console.log('Fetched leaderboard:', results);
        console.log('Endpoint:', endpoint);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching leaderboard:', err);
      });
  }, [endpoint]);

  if (loading) return <div>Loading leaderboard...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Leaderboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, idx) => (
            <tr key={entry.id || idx}>
              <td>{idx + 1}</td>
              <td>{entry.user}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Leaderboard;
