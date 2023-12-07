import { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm';
import DocumentTree from './components/DocumentTree';
import PresenceList from './components/PresenceList';

const App = () => {
  const [authToken, setAuthToken] = useState(null);

  const handleAuth = (token) => {
    setAuthToken(token);
  };

  useEffect(() => {
    setAuthToken(localStorage.getItem('authToken'));
  }, [])

  const handleLogout = () => {
    // Remove the token from localStorage or perform any additional logout logic
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  return (
    <div>
      {authToken ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <DocumentTree />
          <PresenceList />
        </div>
      ) : (
        <AuthForm type="login" onAuth={handleAuth} />
      )}
    </div>
  );
};

export default App;
