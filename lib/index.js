const express = require('express');
const { v4:uuid } = require('uuid');
const knex = require('knex');
const config = require('../config');

const db = knex(config.db);
const app = express();
const port = 5020;

const defaultGrid = [0,0,0,0,0,0,0,0,0];

// get current tiles
app.get('/api/tiles', (req, res, next) => {
  const id = req.header('Auth') || '';

  // select corresponding tile
  db().select().table('tile').where({id}).then(rows => {

    // if tile does not exist, create a new one
    if(rows.length === 0) {

      const newId = uuid();
      const grid = defaultGrid.join(',');

      db('tile').insert({db, grid}).then(() => {
        // resolve tile
        res.json({id, grid});
      })

    } else {
      // resolve tile
      res.json(rows[0])
    }
  })
})

app.post('/api/tiles/reset', (req, res, next) => {

})


// update single tile
app.post('/api/tiles/updateTile', (req, res, next) => {

})


app.listen(port, () => {
  console.log(`Listening port ${port}`)
})
