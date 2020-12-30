const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const imageUpload = require('./routes/api/imageUpload');

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
app.use('/api/images', imageUpload);

//server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running @ port ${port}`));
