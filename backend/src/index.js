const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const employeesTableRoutes = require('./routes/employeesTableRoutes');

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(bodyParser.json());
app.use('/cms', authRoutes);
app.use('/cms', employeesTableRoutes);

//app.options('/cms/login', cors());

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Serwer dostępny pod: http://localhost:${port}`);
  });
});
