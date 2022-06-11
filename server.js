require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
  res.json({
    message: 'server is running'
  })
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is runnign at ${process.env.PORT || 8000}`)
})