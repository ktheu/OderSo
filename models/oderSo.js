const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const oderSoSchema = new Schema({
  spruch: {
    type: String,
    required: true
  },
  loesung: {
    type: String,
    required: true
  },
  comment: String
})

module.exports = mongoose.model('Oderso', oderSoSchema);
