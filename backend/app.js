const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

/* Routes */
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/machines', require('./routes/machines.routes'));
app.use('/api/devices', require('./routes/devices.routes'));
app.use('/api/device', require('./routes/devices.routes')); // location

module.exports = app;
