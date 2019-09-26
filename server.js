const express = require('express');
const path = require('path');

const app = express();

app.get('/dist/main.js', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist/main.js'));
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
