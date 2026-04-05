const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConfig');

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  }),
);
app.use(express.json());

app.get('/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;

  if (mongoStatus === 1) {
    return res.json({
      status: 'ok',
      database: 'connected',
    });
  }

  return res.status(500).json({
    status: 'error',
    database: 'disconnected',
  });
});

app.use('/api/v1', require('./routes/apiRoutes'));

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error',
  });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
