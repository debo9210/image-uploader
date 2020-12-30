const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

//connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to database'))
  .catch((err) => console.log(err));

// USE Routes
app.get('/', (req, res) => res.send('Welcome here!!!'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running @ port ${port}`));
