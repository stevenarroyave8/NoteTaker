const api = require('express').Router();
const uuid = require('uuid').v4;
const { readFromFile, writeToFile, readAndAppend } = require('../helper/fsUtil');

api.get('/notes', async (req, res) => {
  const db = await readFromFile('./db/db.json');
  const parsedDb = JSON.parse(db);
  res.json(parsedDb);
});

api.post('/notes', (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).send('Bad Request: body is empty');
  }
  if (typeof body !== 'object') {
    return res.status(400).send('Bad Request: body is not an object');
  }
  if (!body.title) {
    return res.status(400).send("Bad Request: body doesn't contain title");
  }
  if (!body.text) {
    return res.status(400).send("Bad Request: body doesn't contain text");
  }

  body.id = uuid();

  readAndAppend(body, './db/db.json');
  res.status(200).json(body);
});

api.delete('/notes/:id', async (req, res) => {
  const id = req.params.id;
  const db = await readFromFile('./db/db.json');
  const parsedDb = JSON.parse(db);

  const dbFiltered = parsedDb.filter((note) => note.id !== id);
  if (parsedDb.length === dbFiltered.length) {
    return res.status(404).send(`Note with ID ${id} was not found`);
  }

  writeToFile('./db/db.json', dbFiltered, `\nData deleted from ./db/db.json`);
});

module.exports = api;