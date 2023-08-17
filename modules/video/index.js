const videoRoutes = require('./routes');
const videoController= require('./controllers/videoController');
const Video = require('./models/videoModel');

module.exports = {
  videoRoutes,
  videoController,
  Video
};