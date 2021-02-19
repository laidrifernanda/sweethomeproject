//Import dependencies
require("dotenv").config();

//Import server.js
const server = require("./src/server");

//Import dotenv
const { PORT, NODE_ENV } = process.env;

//Start server
server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT} and use ${NODE_ENV}`));
