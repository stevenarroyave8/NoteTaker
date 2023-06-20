const express = require('express');
const api = require('./routes/api');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// Use JSON middleware
app.use(express.json());

// Use API routes
app.use('/api', api);

// Use static assets in the public directory
app.use(express.static('public'));

// Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Route for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});