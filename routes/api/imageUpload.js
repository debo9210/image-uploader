const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const validateImageUpload = require('../../validation/imageValidate');

// database configuration
const mongoURI = require('../../config/keys').mongoURI;

// load image model
const Image = require('../../models/Images');

// create mongoose connection
const CONNECTION = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Init GFS
let gfs;
let gridFSBucket;

CONNECTION.once('open', () => {
  // Init stream
  gfs = Grid(CONNECTION.db, mongoose.mongo);
  gridFSBucket = new mongoose.mongo.GridFSBucket(CONNECTION.db, {
    bucketName: 'uploads',
  });
  // gfs = Grid(CONNECTION.db, mongoose.mongo);
  // gfs.collection(image_bucket_name);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buff) => {
        if (err) {
          return reject(err);
        }
        const fileName = buff.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          fileName: fileName,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const maxSize = 3 * 1000 * 1000;
const upload = multer({ storage, limits: { fileSize: maxSize } });

// @ route GET api/images/upload
// @ description get all images
// @ access Public
router.get('/getAll', (req, res) => {
  Image.find()
    .then((images) => {
      res.json(images);
    })
    .catch((err) => res.status(404).json({ message: 'No Images Found' }));
});

// @ route GET api/images/upload
// @ description get image by filename upload route
// @ access Public
router.get('/:filename', (req, res) => {
  let errors = {};

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    //check if file exists
    if (!file || file.length === 0 || file === null) {
      errors.imageUpload = 'No file exists';
      return res.status(404).json(errors);
    }

    // check content type
    if (
      file.contentType === 'image/jpeg' ||
      file.contentType === 'image/jpg' ||
      file.contentType === 'image/png'
    ) {
      //read to browser
      // const readStream = gfs.createReadStream(file.filename);
      const readStream = gridFSBucket.openDownloadStream(file._id);
      readStream.pipe(res);
    } else {
      errors.imageUpload = 'Not an image';
      res.status(404).json(errors);
    }
  });
});

// @ route POST api/images/upload
// @ description  image upload route
// @ access Public
router.post('/upload', upload.single('imageUpload'), (req, res) => {
  const { errors, isValid } = validateImageUpload(req.body);

  if (!req.file) {
    errors.imageUpload =
      'An image is required, Only .png, .jpg and .jpeg format allowed! max 3mb.';
    return res.status(400).json(errors);
  }

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const url = req.protocol + '://' + req.get('host');

  //check if image already exists
  Image.findOne({ name: req.body.name }).then((image) => {
    if (image) {
      errors.imageUpload = 'This name already has an image attached to it';
      return res.status(400).json(errors);
    } else {
      const newImage = new Image({
        name: req.body.name,
        image: `${url}/api/images/${req.file.filename}`,
        imgFileName: req.file.filename,
      });
      newImage.save().then((image) => res.json(image));
    }
  });
});

// @ route Delete api/images/upload
// @ description delete image by id route
// @ access Public
router.delete('/remove/:id', (req, res) => {
  Image.findById(req.params.id)
    .then((image) => {
      if (!image) {
        return res
          .status(404)
          .json({ noImage: 'There is no image with the specified ID' });
      }
      image.remove().then(() => {
        res.json({ success: true });
      });
    })
    .catch((err) => res.json(err));
});

// @ route GET api/images/upload
// @ description get image by filename upload route
// @ access Public
router.get('/myImages/:id', (req, res) => {
  let errors = {};

  Image.findById({ _id: req.params.id })
    .then((image) => {
      if (!image) {
        errors.imageUpload = 'No Image for the specified ID';
        return res.status(404).json(errors);
      }

      gfs.files.findOne({ filename: image.imgFileName }, (err, file) => {
        //check if files exist
        if (!file || file.length === 0) {
          errors.imageUpload = 'No file exists';
          return res.status(404).json(errors);
        }

        //check content type
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/jpg' ||
          file.contentType === 'image.png'
        ) {
          // read to browser
          const readStream = gfs.createReadStream(image.imgFileName);
          // const readStream = gridFSBucket.openDownloadStream(image.imgFileName);
          readStream.pipe(res);
        } else {
          errors = 'Not an image';
          res.status(404).json(errors);
        }
      });
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
