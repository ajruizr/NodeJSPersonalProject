const express = require('express');
const cors = require('cors')
const v1 = require('./controllers/v1');

const server = express();
const port = 9001;

// Adding CORS
server.use(cors(require('./cors.config.json')));

// Routes
server.use('/v1', v1);


// Middlewares
server.use(express.json());


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
