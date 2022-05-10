const express = require('express');
const tasks = require('../v1/tasks');

const v1 = express.Router();

// Subroutes
v1.use('/tasks', tasks);

module.exports = v1;