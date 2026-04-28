const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ msg: 'Not found' });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
