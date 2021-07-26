const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../dist')));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});