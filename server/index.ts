import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yakavan_portfolio';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('⚡ [CYBER CORE] Successfully connected to MongoDB Vault.');
  })
  .catch((err) => {
    console.warn('⚠️ [CYBER CORE] MongoDB connection note:', err.message);
    console.log('💡 [CYBER CORE] Running with local memory vault mode enabled.');
  });

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 [CYBER CORE] Express Server active on http://localhost:${PORT}`);
});
