const express = require('express');
const fs = require('node:fs/promises');
const path = require('node:path');

const app = express();
const DBPath = './db.json';

// Helper function to read DB
async function readDB(location) {
  try {
    const filePath = path.resolve(location);
    const contents = await fs.readFile(filePath, { encoding: 'utf-8' });
    console.log('Data read successfully');
    return JSON.parse(contents);
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

app.get('/', (req, res) => {
  res.send('Hello world');
});

const port = 3000;

const start = async () => {
  const data = await readDB(DBPath);

  app.listen(port, () => {
    console.log(`server is listening at ${port}...`);
  });
};

start();
