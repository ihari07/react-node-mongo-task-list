const express = require('express');
const router = express.Router();
const List = require('../models/List');

const validateUser = (req, res, next) => {
  next(); 
};

// Get all lists
router.get('/', validateUser, async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a list
router.post('/', validateUser, async (req, res) => {
  const list = new List({ name: req.body.name, items: [] });
  try {
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add item to a list
router.post('/:id/items', validateUser, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    list.items.push({ title: req.body.title, details: req.body.details });
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit a list
router.put('/:id', validateUser, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    list.name = req.body.name || list.name;
    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit an item
router.put('/:listId/items/:itemId', validateUser, async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    const item = list.items.id(req.params.itemId);
    item.title = req.body.title || item.title;
    item.details = req.body.details || item.details;
    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete list
router.delete('/:id', validateUser, async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.json({ message: 'List deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;