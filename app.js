const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Modules
const video = require('./modules/video');

const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config({path : 'variables.env'});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// middleware
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/videos', video.videoRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});