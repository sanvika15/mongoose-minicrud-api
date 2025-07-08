const express = require('express');
const connectDB = require('./config/database');
const empRoutes = require('./routes/empRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();
app.use('/api', empRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
