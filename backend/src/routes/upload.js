const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const { InfoStudent } = require('../models');
const auth = require('../middlewares/auth');
const requirePermission = require('../middlewares/permission');

const upload = multer({ dest: 'uploads/' });

router.post('/students/bulk', auth, requirePermission('add'), async (req, res) => {
  // multer middleware cannot be used directly in this exported async fn string; create a route with upload.single in server usage
  res.status(400).json({ message: 'Use /api/upload/students/bulk with multipart/form-data and file field named file' });
});

// route with multer
router.post('/students/bulk/file', upload.single('file'), auth, requirePermission('add'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file' });
  const wb = xlsx.readFile(req.file.path);
  const sheetName = wb.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json(wb.Sheets[sheetName]);
  const created = [];
  const errors = [];
  for (const [i, r] of rows.entries()) {
    try {
      const c = await InfoStudent.create({
        id_stud: r.id_stud,
        golos_student: r.golos_student,
        name_student: r.name_student,
        school: r.school,
        Sum: r.Sum,
        nsba: r.nsba,
        tkder: r.tkder,
        level: r.level,
        tkhsos: r.tkhsos,
        shoaba: r.shoaba,
        door: r.door,
        Year: r.Year,
        saf: r.saf,
        id_ked: r.id_ked
      });
      created.push(c);
    } catch (err) {
      errors.push({ row: i+1, error: err.message });
    }
  }
  res.json({ created: created.length, errors });
});

module.exports = router;
