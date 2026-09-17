const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const db = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const pathRoutes = require('./routes/pathRoutes');
const progressRoutes = require('./routes/progressRoutes');

const app = express();

// CORS Configuration
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);
const vercelPreviewOrigin = /^https:\/\/[a-z0-9-]+-geetha-123\.vercel\.app$/;

const corsOptions = {
    origin: (origin, callback) => {
        const normalizedOrigin = origin?.replace(/\/$/, '');
        if (!origin || allowedOrigins.includes(normalizedOrigin) || vercelPreviewOrigin.test(normalizedOrigin)) {
            return callback(null, true);
        }

        return callback(new Error('Origin is not allowed by CORS'));
    },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
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

if (require.main === module) {
    const PORT = config.PORT;
    app.listen(PORT, () => {
        console.log(`🚀 LearnPath REST API running on http://localhost:${PORT}`);
    });
}

module.exports = app;
