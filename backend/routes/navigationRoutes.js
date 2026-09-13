const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { dijkstra, buildGraph } = require('../utils/dijkstra');
const verifyToken = require('../middleware/authMiddleware');

// Average human walking speed, used to estimate time
const WALKING_SPEED_METERS_PER_MIN = 80; // ~4.8 km/h

// GET all routes (edges) - for testing raw data
router.get('/routes', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM routes');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
});

// GET shortest path between two locations
router.get('/shortest-path', async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({ error: 'Both "from" and "to" query parameters are required' });
        }

        const [locations] = await db.query('SELECT * FROM locations');
        const [routes] = await db.query('SELECT * FROM routes');

        const graph = buildGraph(locations, routes);

        if (!graph[from] || !graph[to]) {
            return res.status(404).json({ error: 'One or both locations not found' });
        }

        const result = dijkstra(graph, from, to);

        if (result.path.length === 0) {
            return res.status(404).json({ error: 'No path exists between these locations' });
        }

        const estimatedTimeMinutes = Math.round(result.distance / WALKING_SPEED_METERS_PER_MIN);

        res.json({
            path: result.path,
            totalDistance: result.distance,
            estimatedTimeMinutes
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to calculate shortest path' });
    }
});

module.exports = router;