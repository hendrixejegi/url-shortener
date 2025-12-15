const { generateString } = require('../lib/utils');
const URL = require('../models/url.model');

const createShortURL = async (req, res) => {
  const { url, custom } = req.body;

  if (!url) res.status(400).json({ msg: 'Missing required field: url' });

  if (custom) {
    const isExisting = await URL.findOne({ shortURL: custom });

    if (isExisting) {
      return res
        .status(400)
        .json({ msg: 'Custom url exists. Try another one' });
    }
  }

  const newLink = await URL.create({
    originalURL: url,
    shortURL: custom || generateString(5),
  });

  res.status(201).json({ msg: 'Link created', data: newLink });
};

const redirectShortURL = async (req, res) => {
  const { code } = req.params;

  const link = await URL.findOne({ shortURL: code });

  if (!link) {
    res.status(404).json({ msg: 'Short URL code not found' });
  } else {
    res.status(302).redirect(link.originalURL);
  }
};

module.exports = { createShortURL, redirectShortURL };
