require('dotenv').config();
const express = require('express');
const { randomUUID } = require('node:crypto');

const app = express();

/**
 *
 * @param {{id:string; originalURL: string; shortenedURL: string}} data
 */
async function addLink(data) {
  const contents = await readDB();
  contents.db.push(data);
  await writeDB(contents);
}

// addLink({
//   id: randomUUID(),
//   originalURL: 'https://google.com',
//   shortenedURL: generateURL(5),
// });

app.get('/', (req, res) => {
  res.send('Hello world');
});

const port = process.env.PORT;

const start = async () => {
  app.listen(port, () => {
    console.log(`server is listening at ${port}...`);
  });
};

start();
