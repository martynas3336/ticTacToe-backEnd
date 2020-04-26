const express = require('express');
const { getTile, updateTile, resetTile, clickTile, fetchLogs } = require('./tiles');

const app = express();
const port = 5020;


// get current tiles
app.get('/api/tiles', (req, res, next) => {
  const id = req.header('Auth') || '';
  getTile(id).then(_res => {
    res.json(_res);
  });
})

// reset tiles
app.post('/api/tiles/reset', (req, res, next) => {
  const id = req.header('Auth') || '';
  resetTile(id).then(_res => {
    res.json(_res);
  });
})

// update single tile
app.post('/api/tiles/clickTile/:_i', (req, res, next) => {
  const i = Number(req.params._i);
  if(typeof i !== 'number') i = -1;
  clickTile(req.header('Auth'), i).then(_res => {
    res.json(_res);
  })
})

// fetch logs
app.get('/api/tiles/logs', (req, res, next) => {
  const id = req.header('Auth') || '';
  fetchLogs(id).then(_res => {
    res.json(_res);
  })
})

// log errors
app.use((err, req, res, next) => {
  console.log(err);
})


app.listen(port, () => {
  console.log(`Listening port ${port}`)
})
