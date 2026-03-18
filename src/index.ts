import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import os from 'os';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nexus API is running' });
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nexus';
mongoose.connect(MONGO_URI)
  .then(() => console.log('\x1b[32m📦 Connected to MongoDB successfully\x1b[0m'))
  .catch((err) => console.error('\x1b[31m❌ MongoDB connection error:\x1b[0m', err));

app.listen(port, () => {
  const interfaces = os.networkInterfaces();
  let localIp = 'localhost';
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]!) {
      if (iface.family === 'IPv4' && !iface.internal) {
        localIp = iface.address;
      }
    }
  }

  console.log(`\n\x1b[1m\x1b[35m=== NEXUS API SERVER ===\x1b[0m`);
  console.log(`\x1b[36m🚀 Environment: \x1b[0m${process.env.NODE_ENV || 'development'}`);
  console.log(`\x1b[36m🔌 Port       : \x1b[0m${port}`);
  console.log(`\x1b[36m🔗 Local      : \x1b[0mhttp://localhost:${port}`);
  console.log(`\x1b[36m🌐 Network    : \x1b[0mhttp://${localIp}:${port}`);
  console.log(`\x1b[1m\x1b[35m========================\x1b[0m\n`);
});
