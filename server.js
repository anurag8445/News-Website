require('dotenv').config(); // 👈 this line must come first
require('./config/db');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
const cors = require('cors');
app.use(cors());

const UserRouter = require('./api/User');
app.use('/user', UserRouter);

app.listen(port, () => {
    console.log('Server running on port', port);
});