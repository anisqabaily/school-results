const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
require('dotenv').config();

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) return res.status(400).json({ message: 'Missing' });
  const user = await Users.findOne({ where: { name } });
  if (!user) return res.status(401).json({ message: 'Invalid' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid' });
  const payload = { id: user.id, name: user.name, preemision: user.preemision };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, user: payload });
});

module.exports = router;
