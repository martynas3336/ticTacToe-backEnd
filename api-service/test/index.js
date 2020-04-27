const app = require("../");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { v4:uuid } = require('uuid');

const { expect, assert } = chai;
chai.use(chaiHttp);

const checkError = (err) => {
  expect(err).to.be.null;
}

const checkRes = (res) => {
  assert.isObject(res);
}

const check200Status = (res) => {
  expect(res).to.have.status(200);
}

const check404Status = (res) => {
  expect(res).to.have.status(404);
}

const check500Status = (res) => {
  expect(res).to.have.status(500);
}


const checkBody = (res) => {
  expect(res).to.have.property('body');
}

const checkTiles = (tiles) => {
  assert.isObject(tiles);

  expect(tiles).to.have.property('id');
  assert.isString(tiles.id);
  expect(tiles.id.length).to.be.equal(36);

  expect(tiles).to.have.property('grid');
  assert.isArray(tiles.grid);
  expect(tiles.grid.length).to.be.equal(9);
  expect(tiles.grid.filter(g => g === 0).length + tiles.grid.filter(g => g === 1).length + tiles.grid.filter(g => g === 2).length).to.be.equal(9);
}

const checkLog = (log) => {
  assert.isObject(log);

  expect(log).to.have.property('id');
  assert.isString(log.id);
  expect(log.id.length).to.be.equal(36);

  expect(log).to.have.property('tileId');
  assert.isString(log.tileId);
  expect(log.tileId.length).to.be.equal(36);

  expect(log).to.have.property('main');
  assert.isString(log.main);

  expect(log).to.have.property('createdAt');
  assert.isString(log.createdAt);
}


describe('Api', () => {

  let tiles_1;

  it('Invalid page', async () => {
    chai
    .request(app)
    .get('/')
    .end((err, res) => {
      checkError(err);
      check404Status(res);
    })
  })

  it('Get unexisting tile / Create new tiles', async () => {
    await chai
    .request(app)
    .get('/api/tiles')
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      tiles_1 = res.body;
    })
  })

  it('Get existing tiles', async () => {
    await chai
    .request(app)
    .get('/api/tiles')
    .set('Auth', tiles_1.id)
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.id).to.be.equal(tiles_1.id);
    })
  })

  it('Update existing tile invalid cell', async () => {
    await chai
    .request(app)
    .post('/api/tiles/clickTile/10')
    .set('Auth', tiles_1.id)
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.id).to.be.equal(tiles_1.id);
      expect(res.body.grid.filter(g => g === 0).length).to.be.equal(9);
    })
  })

  it('Update existing tile unmarked cell #1', async () => {
    await chai
    .request(app)
    .post('/api/tiles/clickTile/0')
    .set('Auth', tiles_1.id)
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.id).to.be.equal(tiles_1.id);
      expect(res.body.grid[0]).to.be.equal(2);
    })
  })

  it('Update existing tile unmarked cell #2', async () => {
    await chai
    .request(app)
    .post('/api/tiles/clickTile/3')
    .set('Auth', tiles_1.id)
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.id).to.be.equal(tiles_1.id);
      expect(res.body.grid[3]).to.be.equal(1);
    })
  })

  it('Update existing tile marked cell', async () => {
    await chai
    .request(app)
    .post('/api/tiles/clickTile/0')
    .set('Auth', tiles_1.id)
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.id).to.be.equal(tiles_1.id);
      expect(res.body.grid[0]).to.be.equal(2);
    })
  })

  it('Update existing tile unmarked cell #3', async () => {
    await chai
    .request(app)
    .post('/api/tiles/clickTile/1')
    .set('Auth', tiles_1.id)
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.id).to.be.equal(tiles_1.id);
      expect(res.body.grid[1]).to.be.equal(2);
    })
  })

  it('Update existing tile unmarked cell #4', async () => {
    await chai
    .request(app)
    .post('/api/tiles/clickTile/4')
    .set('Auth', tiles_1.id)
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.id).to.be.equal(tiles_1.id);
      expect(res.body.grid[4]).to.be.equal(1);
    })
  })

  it('Update existing tile unmarked cell #5', async () => {
    await chai
    .request(app)
    .post('/api/tiles/clickTile/2')
    .set('Auth', tiles_1.id)
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.id).to.be.equal(tiles_1.id);
      expect(res.body.grid[2]).to.be.equal(2);
    })
  })

  it('Update existing tile unmarked cell after game has ended', async () => {
    await chai
    .request(app)
    .post('/api/tiles/clickTile/8')
    .set('Auth', tiles_1.id)
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.id).to.be.equal(tiles_1.id);
      expect(res.body.grid[8]).to.be.equal(0);
    })
  })


  it('Get existing tiles log', async () => {
    await chai
    .request(app)
    .get('/api/tiles/logs')
    .set('Auth', tiles_1.id)
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      assert.isArray(res.body);
      res.body.forEach(checkLog);
    })
  })

  it('Get unexisting tiles log #1', async () => {
    await chai
    .request(app)
    .get('/api/tiles/logs')
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      assert.isArray(res.body);
      res.body.forEach(checkLog);
    })
  })

  it('Get unexisting tiles log #2', async () => {
    await chai
    .request(app)
    .get('/api/tiles/logs')
    .set('Auth', uuid())
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      assert.isArray(res.body);
      res.body.forEach(checkLog);
    })
  })

  it('Reset existing tiles', async () => {
    await chai
    .request(app)
    .post('/api/tiles/reset')
    .set('Auth', tiles_1.id)
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.id).to.be.equal(tiles_1.id);
      expect(res.body.grid.filter(g => g === 0).length).to.be.equal(9);
    })
  })

  it('Reset unexisting tiles', async () => {
    await chai
    .request(app)
    .post('/api/tiles/reset')
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.grid.filter(g => g === 0).length).to.be.equal(9);
    })
  })

  it('Reset unexisting tiles #2', async () => {
    await chai
    .request(app)
    .post('/api/tiles/reset')
    .then(res => {
      checkRes(res);
      check200Status(res);
      checkBody(res);
      checkTiles(res.body);
      expect(res.body.grid.filter(g => g === 0).length).to.be.equal(9);
    })
  })
})
