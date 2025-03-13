const express = require('express');
const path = require('path');
const fs = require('fs');  // Required to read the posts.json file
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for different pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Define the /blog route to dynamically load posts from posts.json
app.get('/blog', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'posts.json'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading blog data:', err);  // Log the error
      res.status(500).send("Error reading blog data.");
      return;
    }
    try {
      const posts = JSON.parse(data);  // Parse the JSON data
      res.json(posts);  // Send the blog posts as JSON
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);  // Log any parsing errors
      res.status(500).send("Error parsing blog data.");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
