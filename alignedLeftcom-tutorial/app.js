// Main application file

// Required libraries
const express = require('express');

// App creation
const app = express();
const port = 8080;

// GET - test to see if the server is good
app.get('/', (req, res, next) => {
    res.send('We are live!');
});

// Start the port
app.listen(port, () => {
    console.log(`We're online on port ${port}`);
});

// Error logging middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});
