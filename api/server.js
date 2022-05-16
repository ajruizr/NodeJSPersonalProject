const express = require('express');
const cors = require('cors');
const v1 = require('./controllers/v1');
//Adding Swagger requires
const swagger= require('swagger-ui-express');
const swaggerdoc=require('./swagger.json');


const server = express();
const port = 9001;

// Adding CORS
server.use(cors(require('./cors.config.json')));

// Routes
server.use('/v1', v1);

// Adding Swagger documentation
server.use('/swagger', swagger.serve);
server.use('/swagger', swagger.setup(swaggerdoc));


// Middlewares
server.use(express.json());


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
