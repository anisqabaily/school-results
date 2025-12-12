const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');
const requirePermission = require('../middlewares/permission');

router.post('/change-password', auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findByPk(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) return res.status(400).json({ message: 'Old password incorrect' });
  const hash = await bcrypt.hash(newPassword, 10);
  user.password = hash;
  await user.save();
  res.json({ message: 'Password changed' });
});

router.post('/', auth, requirePermission('admin'), async (req, res) => {
  const { name, password, preemision } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const created = await Users.create({ name, password: hash, preemision });
  res.json(created);
});

module.exports = router;
