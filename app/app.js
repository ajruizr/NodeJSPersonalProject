const express = require('express');
const view = require('./view');

const app = express();
const port = 9000;

// Middlewares
app.use(express.json());

app.use('/', view);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})