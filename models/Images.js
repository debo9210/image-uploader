const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ImageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imgFileName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Image = mongoose.model('images', ImageSchema);
