console.log("🔹 Server is starting...");

require('dotenv').config(); // Load environment variables at the top

const express = require('express'); // Import Express
const cors = require('cors');
const authMiddleware = require('./middleware/auth'); // Ensure the path is correct
const regRoutes = require('./routes/reg'); // Import auth routes
const contactRoutes = require('./routes/contacts'); // Import contacts routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', regRoutes);
app.use('/api/contacts', (req, res, next) => {
    console.log("🔹 Incoming request to /api/contacts");
    next();
}, authMiddleware, contactRoutes); 

// 404 Route Not Found Handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" });
});

// Server Listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
