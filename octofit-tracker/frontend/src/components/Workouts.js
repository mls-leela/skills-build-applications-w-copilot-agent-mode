import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        setLoading(false);
        console.log('Fetched workouts:', results);
        console.log('Endpoint:', endpoint);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching workouts:', err);
      });
  }, [endpoint]);

  if (loading) return <div>Loading workouts...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Workouts</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Duration</th>
            <th>Calories Burned</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, idx) => (
            <tr key={workout.id || idx}>
              <td>{workout.id}</td>
              <td>{workout.name}</td>
              <td>{workout.duration}</td>
              <td>{workout.calories_burned}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Workouts;
