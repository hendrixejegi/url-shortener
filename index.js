require('dotenv').config();
const express = require('express');
const { resolve } = require('node:path');
const connectDB = require('./db/connect-db');
const errorHandler = require('./middleware/error-handler');
const CustomError = require('./lib/errors');
const URLRoute = require('./routes/url.route');

const app = express();

// Middlewares
app.use(express.static(resolve('./public')));
app.use(express.json());

app.use('/api/v1/url', URLRoute);

// Route to test error handling
app.get('/api/v1/error', (req, res) => {
  throw new CustomError({
    message: 'A 504 error was thrown',
    statusCode: 504,
    code: 'ERR_GATEWAY',
  });
});

// Catch all route
app.all('/*splat', (req, res) => {
  res.status(404).send('Not found');
});

app.use(errorHandler);

const port = process.env.PORT;

const start = async () => {
  await connectDB(process.env.MONGO_URI);

  app.listen(port, () => {
    console.log(`server is listening at ${port}...`);
  });
};

start();
