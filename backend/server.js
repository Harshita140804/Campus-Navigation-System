require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');


const locationRoutes = require('./routes/locationRoutes');
const navigationRoutes = require('./routes/navigationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/locations', locationRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});