import multer from 'multer';

export const avatarStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/public/avatar');
  },
  filename: (req, file, callback) => {
    if (file.mimetype !== 'image/webp') {
      return callback(new Error('invalid mime type'), '');
    }
    callback(null, file.originalname);
  }
});

