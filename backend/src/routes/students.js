const express = require('express');
const router = express.Router();
const { InfoStudent } = require('../models');
const auth = require('../middlewares/auth');
const requirePermission = require('../middlewares/permission');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const { Op } = require('sequelize');

router.get('/search', auth, async (req, res) => {
  const q = req.query.name || '';
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 30;
  const offset = (page - 1) * limit;
  const where = q ? { name_student: { [Op.like]: `%${q}%` } } : {};
  const { count, rows } = await InfoStudent.findAndCountAll({ where, limit, offset, order: [['name_student','ASC']] });
  res.json({ total: count, page, results: rows });
});

router.get('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const s = await InfoStudent.findOne({ where: { id_stud: id } });
  if (!s) return res.status(404).json({ message: 'Not found' });
  res.json(s);
});

router.post('/', auth, requirePermission('add'), async (req, res) => {
  try {
    const created = await InfoStudent.create(req.body);
    res.json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, requirePermission('edit'), async (req, res) => {
  const id = req.params.id;
  const updated = await InfoStudent.update(req.body, { where: { id_stud: id } });
  res.json({ updated });
});

router.delete('/:id', auth, requirePermission('delete'), async (req, res) => {
  const id = req.params.id;
  await InfoStudent.destroy({ where: { id_stud: id } });
  res.json({ message: 'deleted' });
});

router.get('/:id/print', auth, async (req, res) => {
  const id = req.params.id;
  const s = await InfoStudent.findOne({ where: { id_stud: id } });
  if (!s) return res.status(404).json({ message: 'Not found' });

  const qrPayload = `${s.id_stud}|${s.Year}|${s.name_student}`;
  const qrDataUrl = await QRCode.toDataURL(qrPayload);

  res.setHeader('Content-disposition', `inline; filename=student_${s.id_stud}.pdf`);
  res.setHeader('Content-type', 'application/pdf');

  const doc = new PDFDocument({ size: 'A4' });
  doc.pipe(res);

  doc.fontSize(18).text(`شهادة نتيجة`, { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`الاسم: ${s.name_student}`);
  doc.text(`المدرسة/المعهد: ${s.school}`);
  doc.text(`الصف: ${s.saf || ''} - المستوى: ${s.level || ''}`);
  doc.text(`العام: ${s.Year} - الدور: ${s.door || ''}`);
  doc.text(`التقدير: ${s.tkder} - المجموع: ${s.Sum} - النسبة: ${s.nsba}%`);
  doc.moveDown();

  const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(base64Data, 'base64');
  doc.image(buffer, { fit: [120, 120], align: 'right' });

  doc.end();
});

module.exports = router;
