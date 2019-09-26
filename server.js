const express = require('express');
const path = require('path');

const app = express();

app.get('/dist/main.js', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist/main.js'));
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/people', (req, res, next) => {
  res.send([
    { id: 1, name: 'Nathan' },
    { id: 2, name: 'Arthur' }
  ]);
});

app.get('/api/places', (req, res, next) => {
  res.send([
    { id: 1, name: 'Paris' },
    { id: 2, name: 'Berlin'}
  ])
});

app.get('/api/things', (req, res, next) => {
  res.send([
    { id: 1, name: 'Hammer' },
    { id: 2, name: 'Wrench' }
  ]);
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
