const express = require('express'); // Import Express
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const regRoutes = require('./routes/reg'); // Import your auth routes

dotenv.config(); // Load environment variables

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', regRoutes); 

// Server Listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
