const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const db = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const pathRoutes = require('./routes/pathRoutes');
const progressRoutes = require('./routes/progressRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/paths', pathRoutes);
app.use('/api/progress', progressRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`🚀 LearnPath REST API running on http://localhost:${PORT}`);
});
