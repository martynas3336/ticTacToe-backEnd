const knex = require('knex');
const { v4:uuid } = require('uuid');
const config = require('../../config');

const { isTrio, checkGame, isGameCompleted, isGameWon, isGameDraw, getNextPlayer, getLastPlayer, iToTiles, getWinningTiles } = require('../utils');

const defaultGrid = [0,0,0,0,0,0,0,0,0];
const db = knex(config.db);

// fetch tiles by id or create if not exist
const getTile = async (id) => new Promise(async (resolve, reject) => {
  const tiles = await db.select().table('tile').where({id});
  if(tiles.length === 0) {
    // if tiles does not exist, create a new one
    const newId = uuid();
    const newGrid = [...defaultGrid];
    await db('tile').insert({id:newId, grid:newGrid.join(',')});
    await createLog(newId, 'Initializing new game.');
    return resolve({id:newId, grid:newGrid});
  } else {
    return resolve({id:tiles[0].id, grid:tiles[0].grid.split(',').map(t => Number(t))});
  }
})

// update tiles
const updateTile = async (id, data) => new Promise(async (resolve, reject) => {
  const currentTile = await getTile(id);
  await db('tile').update(data).where({id});
  const newTile = await getTile(id);
  return resolve(newTile);
})

// reset tile
const resetTile = async (id) => new Promise(async (resolve, reject) => {
  const tile = await updateTile(id, {grid:defaultGrid.join(',')})
  await createLog(id, 'The game has been reset.');
  return resolve(tile);
})

// click tile
const clickTile = async (id, i) => new Promise(async (resolve, reject) => {
  const currentTile = await getTile(id);
  if(isGameCompleted(currentTile.grid)) {
    return resolve(currentTile);
  } else {
    let newGrid = [...currentTile.grid];

    if(newGrid[i] === 0) {
      const nextPlayer = getNextPlayer(newGrid);
      newGrid[i] = nextPlayer;
      const newTile = await updateTile(currentTile.id, {id:currentTile.id, grid:newGrid.join(',')});
      await createLog(id, `Player ${nextPlayer === 2 ? 'X' : 'O'} selected tile [${iToTiles(i)}]`);
      if(isGameWon(newTile.grid))
        await createLog(id, `Game has been completed. Player ${nextPlayer === 2 ? 'X' : 'O'} won with tiles ${getWinningTiles(newTile.grid).map(t => `[${iToTiles(t)}]`)}`);
      if(isGameDraw(newTile.grid))
        await createLog(id, `Game draw.`);
      return resolve(newTile);
    } else {
      return resolve(currentTile);
    }
  }
})

// create log
const createLog = async (tileId, main) => new Promise(async (resolve, reject) => {
  const id = uuid();
  const log = await db('log').insert({id, tileId, main, createdAt:new Date(Date.now())});
  return resolve(log);
})

// fetch logs
const fetchLogs = async (id) => new Promise(async (resolve, reject) => {
  const logs = db.select().table('log').where({tileId:id}).orderBy('createdAt', 'desc').limit(20);
  return resolve(logs);
})

module.exports.getTile = getTile;
module.exports.updateTile = updateTile;
module.exports.resetTile = resetTile;
module.exports.clickTile = clickTile;
module.exports.fetchLogs = fetchLogs;
