const Video = require('../models/videoModel');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  keyFilename: 'optimal-mender-387018-cce30f9c109f.json'
});

const uploadVideoToGCS = async (file) => {
  const bucketName = 'prueba_educacion';
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(file.originalname);
  const blobStream = blob.createWriteStream();

  return new Promise((resolve, reject) => {
    blobStream.on('error', reject);
    blobStream.on('finish', async () => {
      // Hacer el objeto público
      await blob.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
    blobStream.end(file.buffer);
  });
};



// Obtener todos los videos
exports.getAllVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({}); // Buscar todos los videos en la base de datos
    res.status(200).json(videos); // Enviar respuesta con los videos encontrados
  } catch (err) {
    next(err); // Pasa el error al middleware de manejo de errores
  }
};

// Obtener un video por su ID
exports.getVideoById = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id); // Buscar el video por ID
    if (!video) return res.status(404).send('Video not found'); // Si no se encuentra, enviar respuesta de no encontrado
    res.status(200).json(video); // Enviar respuesta con el video encontrado
  } catch (err) {
    next(err);
  }
};

// Crear un nuevo video
exports.createVideo = async (req, res, next) => {
  try {
    const videoFile = req.file; // Asegúrate de que el archivo se encuentre en req.file

    // Subir el archivo a Google Cloud Storage
    const videoUrl = await uploadVideoToGCS(videoFile);

    // Crear una nueva instancia del modelo de video con los datos enviados y la URL del video
    const newVideo = new Video({
      ...req.body,
      url: videoUrl
    });

    const video = await newVideo.save(); // Guardar el video en la base de datos
    res.status(201).json(video); // Enviar respuesta con el video creado
  } catch (err) {
    next(err);
  }
};


// Actualizar un video por su ID
exports.updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Actualizar el video por ID y devolver la nueva versión
    if (!video) return res.status(404).send('Video not found'); // Si no se encuentra, enviar respuesta de no encontrado
    res.status(200).json(video); // Enviar respuesta con el video actualizado
  } catch (err) {
    next(err);
  }
};

// Eliminar un video por su ID
exports.deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id); // Eliminar el video por ID
    if (!video) return res.status(404).send('Video not found'); // Si no se encuentra, enviar respuesta de no encontrado
    res.status(204).send(); // Enviar respuesta sin contenido, indicando que el video fue eliminado
  } catch (err) {
    next(err);
  }
};
