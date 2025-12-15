const express = require('express');
const {
  createShortURL,
  redirectShortURL,
} = require('../controller/url.controller');

const router = express.Router();

router.route('/shorten').post(createShortURL);
router.route('/:code').get(redirectShortURL);

module.exports = router;
