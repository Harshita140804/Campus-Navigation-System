import { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const endpoint = isRegistering ? 'register' : 'login';
    const url = `http://localhost:5000/api/auth/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'Something went wrong');
        return;
      }

      if (isRegistering) {
        setMessage('Registered successfully! Now please log in.');
        setIsRegistering(false);
      } else {
        
        localStorage.setItem('token', data.token);
        onLoginSuccess();
      }

    } catch (error) {
      console.error('Request failed:', error);
      setMessage('Could not reach the server');
    }
  };

  return (
    <div className="app-container">
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>

      <div className="selector">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="selector" style={{ marginTop: '10px' }}>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit} style={{ marginTop: '15px' }}>
        {isRegistering ? 'Register' : 'Login'}
      </button>

      {message && <p style={{ marginTop: '10px' }}>{message}</p>}

      <p style={{ marginTop: '15px', cursor: 'pointer', textDecoration: 'underline' }}
         onClick={() => { setIsRegistering(!isRegistering); setMessage(''); }}>
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </p>
    </div>
  );
}

export default Login;