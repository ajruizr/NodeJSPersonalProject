const express = require('express');
const path = require('path');

const view = express.Router();
const folder = path.join(__dirname, 'views');

view.use(express.static(folder));


module.exports = view;
