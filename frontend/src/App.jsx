

import { useState, useEffect } from 'react';
import Login from './components/Login';
import './App.css';
import CampusMap from './components/CampusMap';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  );

  const [locations, setLocations] = useState([]);
  const [allRoutes, setAllRoutes] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) return;

    // Fetch locations
    fetch('http://localhost:5000/api/locations')
      .then((response) => response.json())
      .then((data) => {
        console.log('Locations:', data);
        setLocations(data);
      })
      .catch((error) => {
        console.error(
          'Something went wrong while fetching locations:',
          error
        );
      });

    // Fetch routes
    fetch('http://localhost:5000/api/routes')
      .then((response) => response.json())
      .then((data) => {
        console.log('Routes:', data);
        setAllRoutes(data);
      })
      .catch((error) => {
        console.error(
          'Something went wrong while fetching routes:',
          error
        );
      });
  }, [isLoggedIn]);

  const handleFindRoute = () => {
    const token = localStorage.getItem('token');

    const url =
      `http://localhost:5000/api/navigation/shortest-path` +
      `?from=${encodeURIComponent(from)}` +
      `&to=${encodeURIComponent(to)}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Route result:', data);
        setResult(data);
      })
      .catch((error) => {
        console.error(
          'Something went wrong while finding the route:',
          error
        );
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setResult(null);
  };

  if (!isLoggedIn) {
    return (
      <Login
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    );
  }

  return (
    <>
      <div className="stars-background"></div>
      <div className="app-container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1>Campus Navigation System</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <p className="app-subtitle">Find your way across campus</p>

        <div className="selector-row">
          <div className="selector">
            <label>From:</label>

            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              <option value="">-- Select Start --</option>

              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          <div className="selector">
            <label>To:</label>

            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              <option value="">-- Select Destination --</option>

              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleFindRoute}
          disabled={!from || !to}
        >
          Find Route
        </button>

        {result && result.path && (
          <div className="result-box">
            <h2>Recommended Route</h2>

            <p>
              <strong>Path:</strong> {result.path.join(' → ')}
            </p>

            <p>
              <strong>Total Distance:</strong> {result.totalDistance} meters
            </p>

            <p>
              <strong>Estimated Walking Time:</strong>{' '}
              {result.estimatedTimeMinutes} minutes
            </p>
          </div>
        )}

        {result && result.error && (
          <div className="result-box">
            <p style={{ color: 'red' }}>{result.error}</p>
          </div>
        )}

        <CampusMap
          locations={locations}
          allRoutes={allRoutes}
          path={result?.path || []}
          from={from}
          to={to}
        />
      </div>
    </>
  );
}

export default App;