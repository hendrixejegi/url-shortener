const express = require('express');
const { randomUUID } = require('node:crypto');
const { readFile, writeFile } = require('node:fs/promises');
const path = require('node:path');

const app = express();
const DBPath = './db.json';

/**
 * Helper function to read DB
 * @returns {Promise<{db: {id:string; originalURL: string; shortenedURL: string}[]}>}
 */
async function readDB() {
  try {
    const filePath = path.resolve(DBPath);
    const contents = await readFile(filePath, { encoding: 'utf-8' });
    console.log('Data read successfully');
    return JSON.parse(contents);
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

/**
 *
 * @param {{id:string; originalURL: string; shortenedURL: string}} data
 */
async function addLink(data) {
  const contents = await readDB();
  contents.db.push(data);
  await writeDB(contents);
}

/**
 * Helper function to write to DB
 * @param {{db: {id:string; originalURL: string; shortenedURL: string}[]}} data
 */
async function writeDB(data) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const filePath = path.resolve(DBPath);
    await writeFile(filePath, jsonString, { encoding: 'utf-8' });
  } catch (error) {
    console.error(error.message);
  }
}

// Helper function to generate random URL
function generateURL(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// addLink({
//   id: randomUUID(),
//   originalURL: 'https://google.com',
//   shortenedURL: generateURL(5),
// });

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
