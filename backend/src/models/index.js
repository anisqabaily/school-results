const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mssql',
    logging: false,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
    dialectOptions: process.env.DB_DIALECT === 'mssql' ? {
      // خيارات مفيدة لـ MSSQL; عدّل إذا احتجت instance أو خيارات أمان
      options: {
        encrypt: false
      }
    } : {}
  }
);

const db = { sequelize, Sequelize };

db.InfoStudent = require('./info_student')(sequelize, Sequelize.DataTypes);
db.Users = require('./users')(sequelize, Sequelize.DataTypes);
db.Mahd = require('./mahd')(sequelize, Sequelize.DataTypes);

module.exports = db;
