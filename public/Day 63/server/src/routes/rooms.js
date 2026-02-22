const express = require('express');
const crypto = require('crypto');
const Room = require('../models/Room');

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const name = req.body?.name || 'Untitled Room';
    const code = crypto.randomBytes(3).toString('hex'); // 6-char code
    const room = await Room.create({ code, name, participants: [] });
    res.status(201).json({ code, name });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create room' });
  }
});

router.get('/:code', async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.params.code });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ code: room.code, name: room.name });
  } catch {
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

module.exports = router;