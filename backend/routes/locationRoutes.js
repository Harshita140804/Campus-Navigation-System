const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all locations
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM locations');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});

module.exports = router;