require('dotenv').config();
const express = require('express');
const { generateString } = require('./lib/utils');
const { resolve } = require('node:path');
const connectDB = require('./db/connect-db');
const URL = require('./models/url.model');

const app = express();

// Middlewares
app.use(express.static(resolve('./public')));
app.use(express.json());

// Route for shortening URLs
app.post('/shorten', async (req, res) => {
  const { url } = req.body;

  if (!url) res.status(400).json({ msg: 'Missing required field: url' });

  try {
    const newLink = await URL.create({
      originalURL: url,
      shortURL: generateString(5),
    });

    res.status(201).json({ msg: 'Link created', data: newLink });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// Route for redirect
app.get('/:code', async (req, res) => {
  const { code } = req.params;

  try {
    const link = await URL.findOne({ shortURL: code });

    if (!link) {
      res.status(404).json({ msg: 'Short URL code not found' });
    } else {
      res.status(302).redirect(link.originalURL);
    }
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }

  res.send('you will be redirected');
});

// Catch all route
app.all('/*splat', (req, res) => {
  res.status(404).send('Not found');
});

const port = process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`server is listening at ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
