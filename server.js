const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Serve static files
app.use(express.static('public'));

// Define your routes and route handlers here

// Handle POST request to create a new blog post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  // Process and store the new blog post in the database or perform any necessary actions

  // Send a response indicating the success of the blog post creation
  res.status(200).send('New blog post created successfully!');
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/bloggingplatform.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

  