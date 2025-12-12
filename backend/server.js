const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./src/models');
const authRoutes = require('./src/routes/auth');
const studentRoutes = require('./src/routes/students');
const mahdRoutes = require('./src/routes/mahd');
const userRoutes = require('./src/routes/users');
const uploadRoutes = require('./src/routes/upload');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/mahd', mahdRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 4000;

sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error', err));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
