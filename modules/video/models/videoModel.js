const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    group: { type: String, enum: ['Conductores', 'Administrativos', 'Todos'], default: 'Todos' },
  });

module.exports = mongoose.model('Video', videoSchema);