import { useState, useEffect } from 'react';

const locationPositions = {
  "Main Gate": { x: 300, y: 40 },
  "Library": { x: 130, y: 160 },
  "Cafeteria": { x: 470, y: 160 },
  "Admin Block": { x: 300, y: 260 },
  "Hostel": { x: 130, y: 380 },
  "Sports Ground": { x: 470, y: 380 }
};

const ANIMATION_DURATION_MS = 3000; // how long the full trip takes

function CampusMap({ locations = [], allRoutes = [], path = [], from, to }) {
  const idToName = {};
  locations.forEach((loc) => {
    idToName[loc.id] = loc.name;
  });

  const [progress, setProgress] = useState(0); // 0 = start, 1 = finished

  
  const pathPoints = path
    .map((name) => locationPositions[name])
    .filter((point) => point);

  
  useEffect(() => {
    setProgress(0);

    if (pathPoints.length < 2) return; 

    const stepTime = 30; // update every 30 milliseconds
    const increment = stepTime / ANIMATION_DURATION_MS;

    const intervalId = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= 1 ? 1 : next;
      });
    }, stepTime);

    
    return () => clearInterval(intervalId);
  }, [path.join('-')]);

  
  function getCurrentPositionAndDrawnPoints() {
    if (pathPoints.length < 2) return { current: null, drawnPoints: [] };

    const segmentLengths = [];
    let totalLength = 0;

    for (let i = 0; i < pathPoints.length - 1; i++) {
      const dx = pathPoints[i + 1].x - pathPoints[i].x;
      const dy = pathPoints[i + 1].y - pathPoints[i].y;
      const length = Math.sqrt(dx * dx + dy * dy);
      segmentLengths.push(length);
      totalLength += length;
    }

    const targetDistance = progress * totalLength;
    let coveredDistance = 0;
    const drawnPoints = [pathPoints[0]];

    for (let i = 0; i < segmentLengths.length; i++) {
      const segmentLength = segmentLengths[i];

      if (coveredDistance + segmentLength >= targetDistance) {
        const remaining = targetDistance - coveredDistance;
        const ratio = segmentLength === 0 ? 0 : remaining / segmentLength;

        const startPoint = pathPoints[i];
        const endPoint = pathPoints[i + 1];

        const currentX = startPoint.x + (endPoint.x - startPoint.x) * ratio;
        const currentY = startPoint.y + (endPoint.y - startPoint.y) * ratio;

        drawnPoints.push({ x: currentX, y: currentY });
        return { current: { x: currentX, y: currentY }, drawnPoints };
      }

      coveredDistance += segmentLength;
      drawnPoints.push(pathPoints[i + 1]);
    }

    return { current: pathPoints[pathPoints.length - 1], drawnPoints };
  }

  const { current, drawnPoints } = getCurrentPositionAndDrawnPoints();
  const drawnLinePoints = drawnPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox="0 0 600 420" className="campus-map">
      
      {allRoutes.map((route) => {
        const sourceName = idToName[route.source_id];
        const destName = idToName[route.destination_id];
        const sourcePos = locationPositions[sourceName];
        const destPos = locationPositions[destName];

        if (!sourcePos || !destPos) return null;

        return (
          <line
            key={route.id}
            x1={sourcePos.x}
            y1={sourcePos.y}
            x2={destPos.x}
            y2={destPos.y}
            stroke="#2a3352"
            strokeWidth={2}
          />
        );
      })}

      
      {drawnPoints.length > 1 && (
        <polyline
          points={drawnLinePoints}
          fill="none"
          stroke="#6c7cff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      
      {locations.map((loc) => {
        const pos = locationPositions[loc.name];
        if (!pos) return null;

        let dotColor = '#5a6488';
        if (loc.name === from) dotColor = '#4ade80';
        if (loc.name === to) dotColor = '#f87171';
        if (path.includes(loc.name) && loc.name !== from && loc.name !== to) {
          dotColor = '#6c7cff';
        }

        return (
          <g key={loc.id}>
            <circle cx={pos.x} cy={pos.y} r="12" fill={dotColor} />
            <text x={pos.x} y={pos.y - 18} textAnchor="middle" fontSize="12" fill="#c5cae9">
              {loc.name}
            </text>
          </g>
        );
      })}

      
      {current && (
        <text
          x={current.x}
          y={current.y}
          fontSize="22"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          🛸
        </text>
      )}
    </svg>
  );
}

export default CampusMap;