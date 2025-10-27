require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const { sequelize } = require("./models");

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});