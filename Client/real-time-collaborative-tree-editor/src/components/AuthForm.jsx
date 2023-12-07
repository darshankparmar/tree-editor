import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../services/api';

const AuthForm = ({ type, onAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);

      // Validate inputs
      if (!username || !password) {
        setError('Please fill in all fields');
        return;
      }

      const response = await axios.post(`/auth/${type}`, { username, password });
      console.log(response);
      const token = response.data.token;

      // Save the token to local storage
      localStorage.setItem('authToken', token);

      // Call the onAuth function to handle authentication in the parent component
      onAuth();
      location.reload();
    } catch (error) {
      console.error('Authentication Error:', error.response.data.error);

      if (error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred during authentication');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

AuthForm.propTypes = {
  type: PropTypes.oneOf(['login', 'register']).isRequired,
  onAuth: PropTypes.func.isRequired,
};

export default AuthForm;
