const mongoose = require('mongoose');

const ListItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String },
  dateAdded: { type: Date, default: Date.now },
});

const ListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [ListItemSchema],
});

module.exports = mongoose.model('List', ListSchema);