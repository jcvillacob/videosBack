const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    imgUrl: { type: String, required: true },
    group: { type: String, enum: ['Conductores', 'Administrativos', 'Todos'], default: 'Todos', required: true },
    type: { type: String, enum: ['Video', 'PDF'], default: 'Video', required: true },
    test: { type: String, required: true },
  });

module.exports = mongoose.model('Video', videoSchema);