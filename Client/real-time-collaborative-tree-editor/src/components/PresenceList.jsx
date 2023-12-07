import { useState, useEffect } from 'react';
import axios from '../services/api';

const PresenceList = () => {
  const [userPresence, setUserPresence] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPresence = async () => {
      try {
        const response = await axios.get('/presence');
        setUserPresence(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user presence:', error);
        setError('Error fetching user presence. Please try again.');
        setLoading(false);
      }
    };

    fetchUserPresence();
  }, []);

  return (
    <div>
      <h2>User Presence</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {(userPresence != null && userPresence.length > 0) && (
        <ul>
          {userPresence.map((user) => (
            <li key={user.user_id}>{user.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PresenceList;
