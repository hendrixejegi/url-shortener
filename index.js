require('dotenv').config();
const express = require('express');
const { randomUUID } = require('node:crypto');
const { readDB, writeDB, generateString } = require('./lib/utils');
const { resolve } = require('node:path');

const app = express();

// Middlewares
app.use(express.static(resolve('./public')));
app.use(express.json());

/**
 *
 * @param {string} url
 * @return {{id:string; originalURL: string; shortURL: string}}
 */
function createLink(url) {
  return {
    id: randomUUID(),
    originalURL: url,
    shortURL: generateString(5),
  };
}

/**
 *
 * @param {{id:string; originalURL: string; shortURL: string}} data
 */
async function addLink(data) {
  const contents = await readDB();
  contents.db.push(data);
  await writeDB(contents);
}

// Route for shortening URLs
app.post('/shorten', async (req, res) => {
  const { url } = req.body;

  if (!url) res.status(400).json({ msg: 'Missing required field: url' });

  try {
    const newLink = createLink(url);
    await addLink(newLink);
    res.status(201).json({ msg: 'Link created', data: newLink });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// Route for redirect
app.get('/:code', async (req, res) => {
  const { code } = req.params;
  console.log(code);

  try {
    const { db } = await readDB();

    const link = db.find((item) => item.shortURL === code);

    if (!link) {
      res.status(404).json({ msg: 'Short URL code not found' });
    } else {
      res.status(302).redirect(link.originalURL);
    }
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }

  console.log(db);

  res.send('you will be redirected');
});

// Catch all route
app.all('/*splat', (req, res) => {
  res.status(404).send('Not found');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is listening at ${port}...`);
});
