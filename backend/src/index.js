const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const employeesTableRoutes = require('./routes/employeesTableRoutes');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use('/cms', authRoutes);
app.use('/cms', employeesTableRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Serwer dostępny pod: http://localhost:${port}`);
  });
});
