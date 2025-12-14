const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
  originalURL: { type: String, required: true },
  shortURL: { type: String, required: true },
});

const URL = mongoose.model('URL', URLSchema);

module.exports = URL;
