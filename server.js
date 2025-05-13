const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const applianceRoutes = require('./routes/applianceRoutes');
const Appliance = require('./models/Appliance');

// Middleware
app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Routes
app.use('/', applianceRoutes);

// Redirect root to /display
app.get('/', (req, res) => {
    res.redirect('/display');
});

// Display Web Page with MongoDB Data
app.get('/display', async (req, res) => {
    try {
        const appliances = await Appliance.find();
        res.render('display', { appliances });
    } catch (err) {
        res.status(500).send('Error fetching appliance data');
    }
});

// Connect DB and Start Server
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));