// سكربت بسيط لإنشاء مستخدم مدير داخل جدول users
// تشغيل: node seed/create-admin.js بعد تعديل .env وتوصيل DB
const bcrypt = require('bcrypt');
const db = require('../src/models');
const sequelize = db.sequelize;
const Users = db.Users;
require('dotenv').config();

async function run() {
  await sequelize.authenticate();
  const name = process.env.SEED_ADMIN_NAME || 'admin';
  const pass = process.env.SEED_ADMIN_PASS || 'admin123';
  const hash = await bcrypt.hash(pass, 10);
  const [user, created] = await Users.findOrCreate({
    where: { name },
    defaults: { password: hash, preemision: 'admin,add,edit,delete' }
  });
  console.log('Admin user ready:', user.name);
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
