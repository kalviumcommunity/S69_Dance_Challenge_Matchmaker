const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('./model/Item');

// POST - Add a new item
router.post('/items', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // JWT Token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
  
      // Set token in HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000, // 1 day
      });
  
      res.json({ message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// GET - Fetch all items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ message: 'Items found', items });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET - Fetch all entities (duplicate of /items for frontend compatibility)
router.get('/entities', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ message: 'Entities found', items });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET - Fetch a single item by ID
router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT - Update an item by ID
router.put('/items/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const updated = await Item.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Updated successfully', updated });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE - Remove an item by ID
router.delete('/items/:id', async (req, res) => {
    try {
        const deleted = await Item.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted', deleted });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



module.exports = router;
