require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// API route to list guitar files
app.get('/api/files', (req, res) => {
  const filesDir = path.join(__dirname, 'public/guitar');
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read files' });
    }

    // Return a list of file names with metadata (like in your JS)
    const fileData = files.map(file => ({
      name: file,
      file: file
    }));

    res.json(fileData);
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

