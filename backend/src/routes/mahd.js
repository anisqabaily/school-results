const express = require('express');
const router = express.Router();
const { Mahd } = require('../models');
const auth = require('../middlewares/auth');
const requirePermission = require('../middlewares/permission');
const { Op } = require('sequelize');

router.get('/search', auth, async (req, res) => {
  const q = req.query.name || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const offset = (page - 1) * limit;
  const where = q ? { name_student: { [Op.like]: `%${q}%` } } : {};
  const { count, rows } = await Mahd.findAndCountAll({ where, limit, offset, order: [['name_student','ASC']] });
  res.json({ total: count, page, results: rows });
});

module.exports = router;
