const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');
const managerRoutes = require('./routes/manager');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/employee', employeeRoutes);
app.use('/manager', managerRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(3000, () => 
  console.log('Server running on http://localhost:3000')
);
