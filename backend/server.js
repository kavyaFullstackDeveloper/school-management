import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';

import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// Database connection
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);

const PORT = config.port || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send('Welcome to the School Management System API!');
});


app.use(express.static('public'));
app.get('/', (req, res) => {
  res.redirect('/api');
});
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route doesn’t exist.');
});
