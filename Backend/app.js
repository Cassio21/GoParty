const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

//** db conection */
const conn = require('./db/conn');
conn();

//**Routes */
const routes = require('./routes/router');
app.use('/api', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000 vai ouvir e não vai escutar');
});
