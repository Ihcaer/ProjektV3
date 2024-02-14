const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use('/cms', authRoutes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Serwer dostępny pod: http://localhost:${port}`);
  });
});
